using RazorBladeDemo;

Console.WriteLine("Hello, World!");
Person p = new();
p.FirstName= "Andrei";
p.LastName = "Ignat";


var template = new PersonDisplay(p);
var result = template.Render();
Console.WriteLine(result);
