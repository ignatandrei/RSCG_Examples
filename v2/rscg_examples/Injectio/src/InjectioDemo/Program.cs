using InjectioDemo;
using Microsoft.Extensions.DependencyInjection;

Console.WriteLine("Hello, World!");
ServiceCollection sc = new();
sc.AddInjectioDemo();
var b = sc.BuildServiceProvider();
var con = b.GetRequiredService<DatabaseCon>();
var db = b.GetRequiredService<IDatabase>();
db.Open();
