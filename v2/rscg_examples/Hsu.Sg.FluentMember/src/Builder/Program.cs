using Builder;

var pOld = new Person();
pOld= pOld.WithFirstName("Andrei").WithLastName("Ignat").WithMiddleName("G");

System.Console.WriteLine(pOld.FullName());
