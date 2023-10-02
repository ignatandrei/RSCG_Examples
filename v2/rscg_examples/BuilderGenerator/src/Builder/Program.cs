using Builder;

var pOld = new Person();
pOld.FirstName = "Andrei";
pOld.LastName = "Ignat";
pOld.MiddleName = "G";
var build = new PersonBuilder()
    .WithFirstName(pOld.FirstName)
    .WithMiddleName("")
    .WithLastName(pOld.LastName)
    ;
    
var pNew = build.Build();
System.Console.WriteLine(pNew.FullName());
System.Console.WriteLine(pOld.FullName());
