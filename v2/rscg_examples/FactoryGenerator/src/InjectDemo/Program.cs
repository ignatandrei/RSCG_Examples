using InjectDemo;

InjectDemo.Generated.DependencyInjectionContainer sc = new();
var db = sc.Resolve<IDatabase>();
db.Open();

