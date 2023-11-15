using FromInterface;

Console.WriteLine("Hello, World!");
Person p = new();
p.FirstName = "Andrei";
p.LastName = "Ignat";
Console.WriteLine(p.FullName());