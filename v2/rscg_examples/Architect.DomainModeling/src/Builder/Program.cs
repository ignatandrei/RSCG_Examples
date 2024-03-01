using Builder;

var pOld = new Person("Andrei", "Ignat");
pOld.MiddleName = "G";
var build = new PersonBuilder()
    .WithFirstName(pOld.FirstName)
    //.WithMiddleName("") // it is not into the constructor
    .WithLastName(pOld.LastName)
    ;
    
var pNew = build.Build();
System.Console.WriteLine(pNew.FullName());
System.Console.WriteLine(pOld.FullName());
