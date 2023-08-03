using ImmutypeDemo;

Person p = new("Andrei","Ignat");
var p2= p.WithFirstName("Test");
Console.WriteLine(p2.LastName);