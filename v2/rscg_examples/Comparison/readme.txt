# ReflectionIT.ComparisonOperatorsGenerator

A Source Generator package that generates the `>`, `>=`, `<`, `<=` operators for a `partial` type (`class`, `struct` or `record`) which implements
`IComparable<T>`.

Generating these additional operators is as simple as adding the `ComparisonOperators` attribute to your type. Make sure this type is `partial` and implements `System.IComparable<T>`

# NuGet packages

| Package | Version |
| ------ | ------ |
| ReflectionIT.ComparisonOperatorsGenerator | [![NuGet](https://img.shields.io/nuget/v/ReflectionIT.ComparisonOperatorsGenerator)](https://www.nuget.org/packages/ReflectionIT.ComparisonOperatorsGenerator/) |         

## Example

Add the NuGet package and write the following code:

```cs
using ReflectionIT.ComparisonOperatorsGenerator.Attributes;

[ComparisonOperators]
partial class Point : IComparable<Point> {

    public double X { get; }
    public double Y { get; }

    public Point(double x, double y) {
        this.X = x;
        this.Y = y;
    }

    public void Swap() => new Point(this.Y, this.X);

    public double Dist => Math.Sqrt((X * X) + (Y * Y));

    public override string ToString() => $"({X},{Y})";

    public int CompareTo(Point? other) {
        return Comparer<double?>.Default.Compare(this.Dist, other?.Dist);
    }
}
```

This will generate the following partial class with the 4 comparison operators.

```cs
partial class Point : System.Numerics.IComparisonOperators<Point,Point,bool> 
{
    public static bool operator <(Point left, Point right) => left.CompareTo(right) < 0;
        
    public static bool operator <=(Point left, Point right) => left.CompareTo(right) <= 0;
        
    public static bool operator >(Point left, Point right) => left.CompareTo(right) > 0;
        
    public static bool operator >=(Point left, Point right) => left.CompareTo(right) >= 0;       
}
```

## Implement IComparisonOperators<TSelf,TOther,TResult> interface

You can automatically implement the `IComparisonOperators<TSelf,TOther,TResult>` interface using the `ImplementIComparisonOperatorsInterface` property of the `ComparisonOperators` attribute.


```cs
using ReflectionIT.ComparisonOperatorsGenerator.Attributes;

[ComparisonOperators(ImplementIComparisonOperatorsInterface = true)]
readonly partial record struct Time : IComparable<Time> {

    public readonly int TotalMinutes; 

    public int Hours => TotalMinutes / 60;
    public int Minutes => TotalMinutes % 60;
    public Time(int totalMinutes) {
        ArgumentOutOfRangeException.ThrowIfNegative(totalMinutes);
        TotalMinutes = totalMinutes;
    }

    public Time(int hours, int minutes) : this(hours * 60 + minutes) {
    }

    public override string ToString() => $"{this.Hours}:{this.Minutes:00}";

    public int CompareTo(Time other) => this.TotalMinutes.CompareTo(other.TotalMinutes);
}
```

This will generate the following partial record struct with the 4 comparison operators and the `IComparisonOperators<TSelf,TOther,TResult>` interface implementation

```cs
partial record struct Time : global::System.Numerics.IComparisonOperators<Time,Time,bool> 
{
    public static bool operator <(Time left, Time right) => left.CompareTo(right) < 0;
        
    public static bool operator <=(Time left, Time right) => left.CompareTo(right) <= 0;
        
    public static bool operator >(Time left, Time right) => left.CompareTo(right) > 0;
        
    public static bool operator >=(Time left, Time right) => left.CompareTo(right) >= 0;
        
}
```



