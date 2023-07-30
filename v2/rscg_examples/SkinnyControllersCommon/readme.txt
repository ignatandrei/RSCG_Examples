# SkinnyControllersGenerator


SkinnyControllers generates controller action for each field of your controller 

How to install SkinnyControllers  in a .NET Core 5 WebAPI / MVC application
Step 1:

Install https://www.nuget.org/packages/SkinnyControllersGenerator/ 


Step 2:

Install https://www.nuget.org/packages/SkinnyControllersCommon/


Step 3:

Add a field to your action either via DI, either directly

    [ApiController]
    [Route("[controller]/[action]")]
    public partial class WeatherForecastController : ControllerBase
    {

        private readonly RepositoryWF repository;
        
        public WeatherForecastController(RepositoryWF repository)
        {
            this.repository = repository;            
            //or make
			//this.repository=new RepositoryWF();
        }

		

Step 4:

	Add partial declaration and decorate your controller with 

	[AutoActions(template = TemplateIndicator.AllPost,FieldsName =new[] { "*" }, ExcludeFields =new[]{"_logger"})]
    [ApiController]
    [Route("[controller]/[action]")]
    public partial class WeatherForecastController : ControllerBase

You can choose your template from 
1. All Post
2. Get - if not arguments, POST else
3. Rest action

You can add your template in 2 ways:
//if custom template , hte name must end in controller.txt
1. [AutoActions(template = TemplateIndicator.CustomTemplateFile, FieldsName = new[] { "*" } ,CustomTemplateFileName = "Controllers\\CustomTemplate1.controller.txt")]

2. For creating new generic templates, please PR to https://github.com/ignatandrei/SkinnyControllersGenerator

That's all!


Usual problems:

1.  error CS0260: Missing partial modifier on declaration of type 

Answer:

Did you put partial on the controller declaration ? 

public partial class 


# More Roslyn Source Code Generators

You can find more RSCG with examples at [Roslyn Source Code Generators](https://ignatandrei.github.io/RSCG_Examples/v2/)
