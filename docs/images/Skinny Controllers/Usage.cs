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