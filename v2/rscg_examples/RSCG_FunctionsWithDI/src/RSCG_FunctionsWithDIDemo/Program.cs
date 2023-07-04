// See https://aka.ms/new-console-template for more information
using Microsoft.Extensions.DependencyInjection;
using RSCG_FunctionsWithDIDemo;
var services = new ServiceCollection();
services.AddSingleton<TestDIMyClass>();
services.AddSingleton<TestDI1>();
services.AddSingleton<TestDI2>();
var serviceProvider = services.BuildServiceProvider();
var test = serviceProvider.GetRequiredService<TestDIMyClass>();
Console.WriteLine("the TestMyFunc1 is not called with [FromServices] parameters " +test.TestMyFunc1(10, 3));
