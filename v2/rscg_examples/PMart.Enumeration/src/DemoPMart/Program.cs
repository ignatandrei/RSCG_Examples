using DemoPMart;

var personType= PersonType.GetFromValueOrDefault("test");
Console.WriteLine(personType?.Value??"null");
personType = PersonType.GetFromValueOrDefault("manager");
Console.WriteLine(personType!.Value);
Console.WriteLine(PersonType.Manager == personType);
