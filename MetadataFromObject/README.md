# RSGC Name: Metadata from object

Nuget :
    https://www.nuget.org/packages/AOPMethodsCommon/
    https://www.nuget.org/packages/AOPMethodsGenerator/


link : http://msprogrammer.serviciipeweb.ro/category/roslyn/ 


author :Andrei Ignat


## What can do

This will generate code to retrieve the values of properties directly, not by reflection

## The code that you start with is 

```

    [AutoMethods(template = TemplateMethod.CustomTemplateFile, CustomTemplateFileName = "GenerateFromPOCO.txt")]

    public partial class Person

    {

        public string FirstName { get; set; }

        public string LastName { get; set; }

    }
```

The code that you will use is

```csharp


    var p = new Person();                                      

    p.FirstName = "Andrei";

    p.LastName = "Ignat";

    var last = p.ValueProperty(Person_EnumProps.LastName);

    var first = p.ValueProperty("FirstName");

    

    Console.WriteLine(last + " "+first);

```

The code that is generated is
```csharp


    public enum Person_EnumProps{                                                                  

        None

        ,FirstName // Public 

        ,LastName // Public 

    }

    partial class Person{

        public object ValueProperty(Person_EnumProps val){

            if(val == Person_EnumProps.FirstName) {

                return this.FirstName;

            }

            if(val == Person_EnumProps.LastName) {

                return this.LastName;

            }

        throw new ArgumentException("cannot find "+ val);

        }

        public object ValueProperty(string val){

            if(string.Compare("FirstName",val,StringComparison.CurrentCultureIgnoreCase)==0) {

                return this.FirstName;

            }

            if(string.Compare("LastName",val,StringComparison.CurrentCultureIgnoreCase)==0) {

                return this.LastName;

            }

        throw new ArgumentException("cannot find "+ val);

        }

    }

```


Example Code: <a href="https://github.com/ignatandrei/RSCG_Examples/tree/main/MetadataFromObject" rel="noopener" target="_blank">https://github.com/ignatandrei/RSCG_Examples/tree/main/MetadataFromObject</a>

All Generators: <a href="https://github.com/ignatandrei/RSCG_Examples/">https://github.com/ignatandrei/RSCG_Examples/</a>