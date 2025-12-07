// See https://aka.ms/new-console-template for more information
using MCPDemo;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using OpenAPISwaggerUI;
using Serilog;
using Serilog.Events;

Console.WriteLine("Hello, World!");
var    builderApp = Host.CreateApplicationBuilder(args);

var    builderWeb = WebApplication.CreateBuilder();

// Configure all logs to go to stderr (stdout is used for the MCP protocol messages).
//builder.Logging.AddConsole(o => o.LogToStandardErrorThreshold = LogLevel.Trace);

var serverApp = builderApp.Services
    .AddMcpServer();
serverApp = serverApp.WithStdioServerTransport();
serverApp.WithTools<MyTools>();


var serverWeb = builderWeb.Services.AddMcpServer();
serverWeb = serverWeb.WithHttpTransport();
serverWeb.WithTools<MyTools>();



builderWeb.Services.AddOpenApi();
builderWeb.Services.AddTransient<MyTools>();
    
var app = builderApp.Build();
var web = builderWeb.Build();
    web.MapOpenApi();
    web.MapOpenApi("/openapi/{documentName}.yaml");
    web.MapMcp();
    web.UseOpenAPISwaggerUI();
    
    


var t1 = web.RunAsync();
var t2 = app.RunAsync();

await Task.WhenAll(t1, t2);
