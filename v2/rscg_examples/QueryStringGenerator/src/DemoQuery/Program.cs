using DemoQuery;
Person p = new();
p.FirstName = "Andrei";
p.LastName = "Ignat";
p.Age = 55;
Console.WriteLine(p.ToQueryString());