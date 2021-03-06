# RSCG number 4 : CopyConstructor + Deconstructor

Nuget :
    https://www.nuget.org/packages/AOPMethodsCommon/
    https://www.nuget.org/packages/AOPMethodsGenerator/


link : http://msprogrammer.serviciipeweb.ro/category/roslyn/ 


author :Andrei Ignat


## What can do

This will generate code for a POCO to generate copy constructor and deconstructor

## The code that you start with is 

```

    [AutoMethods(template = TemplateMethod.CustomTemplateFile, CustomTemplateFileName = "CopyConstructorDestructor.txt")]

    partial class Person

    {

       public string FirstName { get; set; }

       public string LastName { get; set; }

    }
```

The code that you will use is

```csharp


    var pOldPerson = new Person();

    pOldPerson.FirstName = "Andrei";

    pOldPerson.LastName = "Ignat";

    var newPerson = new Person(pOldPerson);

    Console.WriteLine(newPerson.FirstName);

    var (_, last) = newPerson;

    Console.WriteLine(last);

```

The code that is generated is
```csharp


    public Person (){                                                          

       OnConstructor();

    }

    public Person(IPerson other):base(){ 

         BeforeCopyConstructor(other);

         CopyPropertiesFrom(other);

         AfterCopyConstructor(other);

              

    }

    public void CopyPropertiesFrom(IPerson other){

    

         this.FirstName = other.FirstName;            

         this.LastName = other.LastName;            

    }    

    

    

    

     public void Deconstruct( out string FirstName, out string LastName)

     {

         FirstName = this.FirstName;            

         LastName = this.LastName;            

     }

```


Example Code: <a href="https://github.com/ignatandrei/RSCG_Examples/tree/main/CopyConstructor" rel="noopener" target="_blank">https://github.com/ignatandrei/RSCG_Examples/tree/main/CopyConstructor</a>

All Generators: <a href="https://github.com/ignatandrei/RSCG_Examples/">https://github.com/ignatandrei/RSCG_Examples/</a>