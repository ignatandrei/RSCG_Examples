using SimpleTemplate;

Person person = new();
person.FirstName = "Andrei";
person.LastName = "Ignat";
Console.WriteLine(new Person.HelloClass().Format(person.FirstName,person.LastName));