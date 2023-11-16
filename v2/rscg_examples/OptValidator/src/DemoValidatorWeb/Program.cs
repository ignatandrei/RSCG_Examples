//https://learn.microsoft.com/en-us/dotnet/core/extensions/options-validation-generator
using DemoValidatorObj;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddOptions<MyAppOptions>()
            .BindConfiguration(MyAppOptions.ConfigName)
            //.Validate(a=>
            //{
            //    var data= new MyAppValidator().Validate("",a);
            //    var failures = data?.Failures?.ToArray() ?? new string[0];
            //    if (failures.Length == 0)
            //        return true;
            //    foreach (var item in failures)
            //    {
            //        Console.WriteLine(item);
            //    }
            //    return false;
            //})            
            .ValidateDataAnnotations()
            //comment this line and see swagger
            .ValidateOnStart()
            ;

builder.Services.AddOptions<MyAppOptionsCustom>()
            .BindConfiguration(MyAppOptionsCustom.ConfigName)
            .ValidateDataAnnotations()
            //comment this line and see swagger
            .ValidateOnStart()
            ;

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/nameApp", (IOptions<MyAppOptions> opt) =>
{
    try
    {
        var val = opt.Value.AppDisplayName;
        return val;
    }
    catch (OptionsValidationException ex)
    {
        var problems = ex.Failures.ToArray();
        return string.Join(",", problems);
    }

})
.WithName("GetWeatherForecast")
.WithOpenApi();

app.Run();

internal record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
