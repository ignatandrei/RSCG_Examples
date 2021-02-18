using AOPSkinnyController.Classes;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SkinnyControllersCommon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AOPSkinnyController.Controllers
{
    [AutoActions(template = TemplateIndicator.AllPost, CustomTemplateFileName = "Controller.txt", FieldsName = new[] { "*" }, ExcludeFields = new[] { "_logger" })]
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
}
