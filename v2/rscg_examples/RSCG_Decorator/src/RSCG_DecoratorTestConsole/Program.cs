﻿
var serviceCollection = new ServiceCollection()
          .AddLogging(builder =>
        builder.AddSimpleConsole(options =>
        {
            options.IncludeScopes = true;
            options.SingleLine = true;
            options.TimestampFormat = "HH:mm:ss ";
        }))
          .AddTransient<IPerson, Person>();

//register here the decorator
    serviceCollection = serviceCollection
        .AddTransient<Person, Person>()
        .AddTransient<IPerson, Person_Decorator>();

var serviceProvider=serviceCollection.BuildServiceProvider();

ArgumentNullException.ThrowIfNull(serviceProvider);

var logger = serviceProvider.GetRequiredService<ILoggerFactory>()
    .CreateLogger<Program>();


//using (logger.BeginScope("[scope is enabled]"))
//{
//    logger.LogInformation("Hello World!");
//}
logger.LogInformation("Starting app!");

var data = serviceProvider.GetRequiredService<IPerson>();
data.FirstName = "Andrei";
data.LastName = "Ignat";

Console.WriteLine(data.GetType().FullName);
Console.WriteLine( data.FullName("|"));

try
{
    await data.SaveId(-100);
}
catch(Exception ex)
{
    logger.LogError(ex, "in the main program");
}
//Console.ReadLine();

public partial class Program
{

}