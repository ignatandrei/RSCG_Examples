# RSGC Name: Skinny Controllers

Nuget :
    https://www.nuget.org/packages/SkinnyControllersCommon/
    https://www.nuget.org/packages/SkinnyControllersGenerator/


link : http://msprogrammer.serviciipeweb.ro/category/roslyn/ 


author :Andrei Ignat


## What can do

This will generate code for WebAPI for each method of a field in the controller

## The code that you start with is 

```

    public class PersonRepository                          

    {

        public async Task<Person> Get(int id)

        {

            await Task.Delay(1000);

            return new Person()

            {

                ID = id,

                Name = "Andrei " + id

            };

        }

    

        //add more functions here to make the demo

    }
```

The code that you will use is

```csharp


    [AutoActions(template = TemplateIndicator.AllPostWithRecord,  FieldsName = new[] { "*" }, ExcludeFields = new[] { "_logger" })] 

    [ApiController]

    [Route("[controller]/[action]")]

    public partial class PersonController : ControllerBase

    {

        private readonly PersonRepository pr;

        private readonly ILogger<PersonController> _logger;

    

        public PersonController(PersonRepository pr, ILogger<PersonController> logger)

        {

            this.pr = pr;

            _logger = logger;

        }

    

    }

```

The code that is generated is
```csharp


    [HttpPost]                                                                                             

    public System.Threading.Tasks.Task<AOPSkinnyController.Classes.Person> Get( recGet_143266108 data ){

        

            return 

        

        pr.Get(data.id);

    

    }

```


Example Code: <a href="https://github.com/ignatandrei/RSCG_Examples/tree/main/SkinnyControllers" rel="noopener" target="_blank">https://github.com/ignatandrei/RSCG_Examples/tree/main/SkinnyControllers</a>

All Generators: <a href="https://github.com/ignatandrei/RSCG_Examples/">https://github.com/ignatandrei/RSCG_Examples/</a>