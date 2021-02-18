# RSGC Name: data-builder-generator

Nuget :
    https://www.nuget.org/packages/DasMulli.DataBuilderGenerator/


link : https://github.com/dasMulli/data-builder-generator 


author :Martin Andreas Ulrich


## What can do

Implements the Builder Design pattern for any class. Useful , at least, for test projects 

## The code that you start with is 

```

    [GenerateDataBuilder]                               

    public class Person

    {

         public string FirstName { get; set; }

         public string? MiddleNames { get; set; }

         public string LastName { get; set; }

         

    }
```

The code that you will use is

```csharp


    var pOld = new Person();                                                                              

    pOld.FirstName = "Andrei";

    pOld.LastName = "Ignat";

    pOld.MiddleNames = "G";

    var build = new PersonBuilder(pOld).WithoutMiddleNames().WithFirstName("Florin");

    var pNew = build.Build();

    Console.WriteLine(pNew.FirstName);

```

The code that is generated is
```csharp


    public partial class PersonBuilder                                         

         {

              private string? _firstName;

              private string? _middleNames;

              private string? _lastName;

              public PersonBuilder()

              {

              }

    

              public PersonBuilder(PersonBuilder otherBuilder)

              {

                   _firstName = otherBuilder._firstName;

                   _middleNames = otherBuilder._middleNames;

                   _lastName = otherBuilder._lastName;

              }

    

              public PersonBuilder(Person existingInstance)

              {

                   _firstName = existingInstance.FirstName;

                   _middleNames = existingInstance.MiddleNames;

                   _lastName = existingInstance.LastName;

              }

    

              public PersonBuilder WithFirstName(string firstName)

              {

                   var mutatedBuilder = new PersonBuilder(this);

                   mutatedBuilder._firstName = firstName;

                   return mutatedBuilder;

              }

    

              public PersonBuilder WithMiddleNames(string? middleNames)

              {

                   var mutatedBuilder = new PersonBuilder(this);

                   mutatedBuilder._middleNames = middleNames;

                   return mutatedBuilder;

              }

    

              public PersonBuilder WithoutMiddleNames()

              {

                   var mutatedBuilder = new PersonBuilder(this);

                   mutatedBuilder._middleNames = null;

                   return mutatedBuilder;

              }

    

              public PersonBuilder WithLastName(string lastName)

              {

                   var mutatedBuilder = new PersonBuilder(this);

                   mutatedBuilder._lastName = lastName;

                   return mutatedBuilder;

              }

    

              public Person Build()

              {

                   var instance = new Person();

                   if (!(_firstName is null))

                        instance.FirstName = _firstName;

                   if (!(_middleNames is null))

                        instance.MiddleNames = _middleNames;

                   if (!(_lastName is null))

                        instance.LastName = _lastName;

                   return instance;

              }

         }

```


Example Code: <a href="https://github.com/ignatandrei/RSCG_Examples/tree/main/DP_Builder" rel="noopener" target="_blank">https://github.com/ignatandrei/RSCG_Examples/tree/main/DP_Builder</a>

All Generators: <a href="https://github.com/ignatandrei/RSCG_Examples/">https://github.com/ignatandrei/RSCG_Examples/</a>