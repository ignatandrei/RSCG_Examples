# RSCG number 10 : Method decorator

Nuget :
    https://www.nuget.org/packages/AOPMethodsCommon/
    https://www.nuget.org/packages/AOPMethodsGenerator/


link : http://msprogrammer.serviciipeweb.ro/category/roslyn/ 


author :Andrei Ignat


## What can do

This will generate code to decorate methods with anything you want ( stopwatch, logging , authorization...)

## The code that you start with is 


<img src='http://ignatandrei.github.io/RSCG_Examples/images/Method decorator/ExistingCode.cs.png' />

<a href='http://ignatandrei.github.io/RSCG_Examples/images/Method decorator/ExistingCode.cs' target='_blank'>code</a>


```

    [AutoMethods(template =TemplateMethod.CustomTemplateFile,MethodPrefix ="prv" ,CustomTemplateFileName ="MethodDecorator.txt")]

    public partial class Person

    {

         public string FirstName{ get; set; }

         public string LastName { get; set; }

    

         private string prvFullName()

         {

              return FirstName + " " + LastName;

         }

    }
```

The code that you will use is

```csharp


    var p = new Person();                 

    p.FirstName = "Andrei";

    p.LastName = "Ignat";

    Console.WriteLine(p.FullName());

```

The code that is generated is
```csharp


    [GeneratedCode("AOPMethods", "2021.2.22.1125")]                                                                 

    [CompilerGenerated]

    public partial class Person{

              

         public  string FullName (

                   

         [CallerMemberName] string memberName = "",

         [CallerFilePath] string sourceFilePath = "",

         [CallerLineNumber] int sourceLineNumber = 0){

              var sw=Stopwatch.StartNew();

              try{

                   Console.WriteLine("--prvFullName start ");

                   Console.WriteLine("called from class :"+memberName );

                   Console.WriteLine("called from file :"+sourceFilePath );

                   Console.WriteLine("called from line :"+sourceLineNumber );

                        prvFullName();

              }

              catch(Exception ex){

                   Console.WriteLine("error in prvFullName:" + ex.Message);

                   throw;

              }

              finally{

                   Console.WriteLine($"--------prvFullName end in {sw.Elapsed.TotalMilliseconds}");

              }

    

    

         }//end FullName

         

         

    }

```


Example Code: <a href="https://github.com/ignatandrei/RSCG_Examples/tree/main/MethodDecorator" rel="noopener" target="_blank">https://github.com/ignatandrei/RSCG_Examples/tree/main/MethodDecorator</a>

All Generators: <a href="https://github.com/ignatandrei/RSCG_Examples/">https://github.com/ignatandrei/RSCG_Examples/</a>