var pOld = new Person();                                                                              
pOld.FirstName = "Andrei";
pOld.LastName = "Ignat";
pOld.MiddleNames = "G";
var build = new PersonBuilder(pOld).WithoutMiddleNames().WithFirstName("Florin");
var pNew = build.Build();
Console.WriteLine(pNew.FirstName);