using CloneData;

Console.WriteLine("Hello, World!");
Person p = new ();
p.FirstName = "Andrei";
p.LastName = "Ignat";
p.Age = 54;
var p1=p.Clone();
Console.WriteLine(p1.Name());