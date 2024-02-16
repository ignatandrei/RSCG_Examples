using InjectDemo;
using Jab;
MyServiceProvider sc = new();
//var con = sc.GetService<DatabaseCon>();
var db = sc.GetService<IDatabase>();
db.Open();


[ServiceProvider]
//[Transient(typeof(DatabaseCon), typeof(DatabaseCon))]
[Transient(typeof(IDatabase), typeof(DatabaseCon))]
internal partial class MyServiceProvider { }