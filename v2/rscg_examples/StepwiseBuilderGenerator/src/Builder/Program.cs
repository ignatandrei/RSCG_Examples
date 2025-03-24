using Builder;

var pOld = new Person();
pOld.MiddleName = "G";
var pNew= pOld
    .SetFirstNameBld("Andrei")
    .SetLastNameBuilder("Ignat")
    .Age(55)
    .Build(it=>it)
    ;
  
//var build = new PersonBuilder()
//    .WithFirstName(pOld.FirstName)
//    //.WithMiddleName("") // it is not into the constructor
//    .WithLastName(pOld.LastName)
//    ;
    
//var pNew = build.Build();
System.Console.WriteLine(pNew.FullName());
System.Console.WriteLine(pOld.FullName());
