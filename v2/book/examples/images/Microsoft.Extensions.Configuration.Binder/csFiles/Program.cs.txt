using ConfigBinderDemo;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
builder.Services.AddOptions<MyAppOptions>()
            .BindConfiguration(MyAppOptions.ConfigName);
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
