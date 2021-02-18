using AOPSkinnyController.Classes;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AOPSkinnyController.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class PersonController : ControllerBase
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
