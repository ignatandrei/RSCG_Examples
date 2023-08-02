// See https://aka.ms/new-console-template for more information
using AutoRegisterInjectDemo;
using Microsoft.Extensions.DependencyInjection;

Console.WriteLine("Hello, World!");
ServiceCollection sc = new();
sc.AutoRegisterFromAutoRegisterInjectDemo();
var b=sc.BuildServiceProvider();
var con = b.GetRequiredService<DatabaseCon>();
var db=b.GetRequiredService<IDatabase>();
db.Open();
