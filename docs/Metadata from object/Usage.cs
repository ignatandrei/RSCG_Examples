var p = new Person();                                      
p.FirstName = "Andrei";
p.LastName = "Ignat";
var last = p.ValueProperty(Person_EnumProps.LastName);
var first = p.ValueProperty("FirstName");

Console.WriteLine(last + " "+first);