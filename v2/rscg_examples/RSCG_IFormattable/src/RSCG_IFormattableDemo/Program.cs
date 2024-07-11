using RSCG_IFormattableDemo;

Person person = new();
person.FirstName = "Andrei";
person.LastName = "Ignat";

Console.WriteLine(person.ToString("The person name is {FirstName} {LastName}"));
