<h2 align="center">
StaticReflection
</h2>

<h3 align="center">
A fast, easy, scalable static reflection.
</h3>


## Fast use

* Install from nuget `FastStaticReflection`, `FastStaticReflection.CodeGen`

* Write assembly class

```csharp
[StaticReflectionAssembly]//for generate assembly code
public partial class C
{
}
```

* Tag static type reflection

```csharp
//You can Tag at assembly
[assembly: StaticReflection(Type = typeof(StaticReflection.Sample.A))]

//Or Property
[StaticReflection]
[StaticReflection(Type =typeof(B))]
public A a { get; set; }

//Or class
[StaticReflection]
public class A
{
    //....
}
```

* For use

```csharp
internal class Program
{
    static void Main(string[] args)
    {
        var b=new Student();
        var @class=C.Default.Types.First(x => x.Name == "Student");
        @class.SetProperty(b, "Id", 1);//Reflection get property value
        Console.WriteLine("Id: "+@class.GetProperty(b, "Id"));//Reflection set property value
        var @event = (IEventTransfer)@class.Events.First(x => x.Name == "AlreadyGoSchool");
        using (var eventScope = @event.CreateScope(b))
        {
            eventScope.Start();
            eventScope.EventTransfed += Instance_EventTransfed;//Reflection listen event
            var method = @class.Methods.First(x => x.Name == "GoToSchool");
            Console.WriteLine("GoToSchool:" + method.InvokeUsualMethod(b));//Reflection call method
        }
        var obj = @class.Constructors.First(x => x.ArgumentTypes.Count == 0);
        var inst = obj.InvokeUsualMethod(null);//Reflection create object
        Console.WriteLine(inst);
    }

    private static void Instance_EventTransfed(object? sender, EventTransferEventArgs e)
    {
        Console.WriteLine("EventRaise: " + e.Args[0]);
    }
}
[StaticReflection]
public record class Student
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public event EventHandler<Student>? AlreadyGoSchool;

    public int GoToSchool()
    {
        AlreadyGoSchool?.Invoke(this, this);
        return Id;
    }
}
[StaticReflectionAssembly]
public partial class C
{
}

```

## Benchmarks

[Benchmarks](./test/Benchmarks.md)