Person person = new ();
person.FirstName= "Andrei";
person.LastName = "Ignat";
IPerson duck = DuckGenerator<IPerson, Person>.Activate(Tuple.Create(person));
Console.WriteLine(duck.FullName());