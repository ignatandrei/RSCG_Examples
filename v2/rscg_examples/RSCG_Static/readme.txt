# RSCG_Static

Roslyn Source Code Generator - transform static classes into instances and interfaces 

More, there is a MakeNew static method created to can have DI.

Just put a function like this ( example for System.DateTime)
```csharp
        public Type GenerateInterfaceFromDate()=>typeof(DateTime);
```


and the properties of the classes will be generated into interfaces and you can write:

```csharp
//for DI, register
//ISystem_DateTime  with transient for new clsSystem_DateTime()
Console.WriteLine("Hello World!");
ISystem_DateTime dateStatic = recSystem_DateTime.MakeNew();//static
ISystem_DateTime dateVar = new clsSystem_DateTime(); //variable = real 

Console.WriteLine(dateStatic.Now.Second);
Console.WriteLine(dateVar.Now.Second);
await Task.Delay(10 * 1000);
Console.WriteLine(dateStatic.Now.Second);
Console.WriteLine(dateVar.Now.Second);
```


# More Roslyn Source Code Generators

You can find more RSCG with examples at [Roslyn Source Code Generators](https://ignatandrei.github.io/RSCG_Examples/v2/)
