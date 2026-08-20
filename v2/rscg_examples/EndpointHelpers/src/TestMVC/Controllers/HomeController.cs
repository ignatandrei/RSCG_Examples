using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using TestMVC.Models;
using EndpointHelpers;

namespace TestMVC.Controllers;

[GenerateUrlHelper]
[GenerateLinkGenerator]
[GenerateRedirectToAction]
[GenerateViewHelpers]
public partial class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
