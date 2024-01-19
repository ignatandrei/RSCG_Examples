# MakeInterface
Creates an interface of a class using source generator

[![.NET](https://github.com/Frederik91/MakeInterface/actions/workflows/dotnet.yml/badge.svg)](https://github.com/Frederik91/MakeInterface/actions/workflows/dotnet.yml)

## Usage
Add the attribute to the class you want to generate the interface for
```csharp
[GenerateInterface]
public class MyClass
{
	public string MyProperty { get; set; }
	public void MyMethod() { }
}
```

The generated interface will then be generated as IMyClass.g.cs
```csharp
public interface IMyClass
{
	string MyProperty { get; set; }
	void MyMethod();
}
```

You can then implement the interface in your class
```csharp
public class MyClass : IMyClass
{
	public string MyProperty { get; set; }
	public void MyMethod() { }
}
```

## Installation
Install the NuGet package [MakeInterface](https://www.nuget.org/packages/MakeInterface.Generator/)

You can either create the attribute yourself or use the one provided in the package [MakeInterface.Contracts](https://www.nuget.org/packages/MakeInterface.Contracts/)


## License
MIT