// See https://learn.microsoft.com/en-us/aspnet/core/fundamentals/configuration/options?view=aspnetcore-8.0
//     https://learn.microsoft.com/en-us/dotnet/core/extensions/options-validation-generator
using DemoValidatorObj;

Console.WriteLine("Hello, World!");
MyAppOptions model = new();
model.AppDisplayName = "@!";
ValidatorForMyApp f = new();
var data = f.Validate(null, model);

var problems = data?.Failures?.ToArray();
Console.WriteLine(problems?.Length ?? 0);
Console.WriteLine(problems?[0]);

