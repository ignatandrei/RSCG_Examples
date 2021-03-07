var p1 = new Person();
p1.Blog = "http://msprogrammer.serviciipeweb.ro/";
var config = new ConfigurationBuilder()
  .AddJsonFile("persons.json")
  .Build();

var p = config.Get<Person>();
var p2 = Person.FromConfig(config);