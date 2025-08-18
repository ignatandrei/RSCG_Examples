using Builder;

var pOld = new Person("Andrei", "G", "Ignat");
var build = new Person.Builder();
build.FirstName = pOld.FirstName;
build.MiddleName = "";
build.LastName = (pOld.LastName)    ;

var pNew = build.Build();
System.Console.WriteLine(pNew.FullName());
System.Console.WriteLine(pOld.FullName());
