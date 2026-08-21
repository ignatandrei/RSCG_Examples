using Builder;

Console.WriteLine("create person builder");

var p = new PersonBuilder()
    .WithFirstName("Andrei")
    .WithLastName("Ignat")
    .Build();
    


Console.WriteLine(p.FullName());
