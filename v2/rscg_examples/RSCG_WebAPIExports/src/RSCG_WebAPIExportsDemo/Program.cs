using RSCG_WebAPIExportsDemo;
using WebApiExportToFile;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddExport();
var app = builder.Build();
app.UseExport();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(ct =>
    {
        ct.DocumentTitle = "try /WeatherForecast.xlsx";
        ct.HeadContent = "try /WeatherForecast.xlsx";
    });
}

//app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
