
using PropSwitch;

Person p=new() { Id = 1, Name = "Andrei" };
College c = new() { Id = 1, Name = "Mathematics" };
Console.WriteLine(NameResolver.GetName(p));
Console.WriteLine(NameResolver.GetName(c));