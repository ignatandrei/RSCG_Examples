# RSCG number 3 : JsonByExampleGenerator

Nuget :
    https://www.nuget.org/packages/JsonByExampleGenerator/


link : https://github.com/hermanussen/JsonByExampleGenerator/ 


author :Robin Hermanussen


## What can do

This will generate C# classes from json files.

## The code that you start with is 

```

    {

    "FirstName": "Andrei",

    "LastName": "Ignat",

    "Blog": "http://msprogrammer.serviciipeweb.ro/"
```

The code that you will use is

```csharp


    var p1 = new Person();

    p1.Blog = "http://msprogrammer.serviciipeweb.ro/";

    var config = new ConfigurationBuilder()

      .AddJsonFile("persons.json")

      .Build();

    

    var p = config.Get<Person>();

    var p2 = Person.FromConfig(config);

```

The code that is generated is
```csharp


    [DataContract(Name = "Person", Namespace = "JsonToClass.Json.Persons")]

    public partial class Person

    {

    [DataMember(Name = "FirstName", EmitDefaultValue = false, Order = 0)]

    public string FirstName { get; set; }

    [DataMember(Name = "LastName", EmitDefaultValue = false, Order = 1)]

    public string LastName { get; set; }

    [DataMember(Name = "Blog", EmitDefaultValue = false, Order = 2)]

    public string Blog { get; set; }

    

    public static Person FromConfig([System.Diagnostics.CodeAnalysis.NotNull] IConfiguration config)

    {

    return config.Get<Person>();

    }

    }

```


Example Code: <a href="https://github.com/ignatandrei/RSCG_Examples/tree/main/JsonToClass" rel="noopener" target="_blank">https://github.com/ignatandrei/RSCG_Examples/tree/main/JsonToClass</a>

All Generators: <a href="https://github.com/ignatandrei/RSCG_Examples/">https://github.com/ignatandrei/RSCG_Examples/</a>