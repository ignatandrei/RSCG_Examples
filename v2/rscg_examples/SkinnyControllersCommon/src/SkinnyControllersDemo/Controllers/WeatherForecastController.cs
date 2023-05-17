using Microsoft.AspNetCore.Mvc;
using SkinnyControllersCommon;

namespace SkinnyControllersDemo.Controllers;
[AutoActions(template = TemplateIndicator.NoArgs_Is_Get_Else_Post, FieldsName = new[] { "*" }, ExcludeFields = new[] { "_logger" })]
[ApiController]
[Route("[controller]/[action]")]
public partial class WeatherForecastController : ControllerBase
{

    private readonly ILogger<WeatherForecastController> _logger;
    private readonly WeatherActions weather;

    public WeatherForecastController(ILogger<WeatherForecastController> logger, WeatherActions weather)
    {
        _logger = logger;
        this.weather = weather;
    }

    

}