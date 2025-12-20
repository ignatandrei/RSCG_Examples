using Builder;

var p = new PersonBuilder()
    .WithLastName("Ignat")
    .WithFirstName("Andrei")
    .Build();
    ;
  
Console.WriteLine(p.FullName());
