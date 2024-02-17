using CopyToDemo;

Person p = new();
p.FirstName = "Andrei";
p.LastName = "Ignat";

Person p2 = new();
p.CopyTo(p2);
Console.WriteLine(p2.FullName); 