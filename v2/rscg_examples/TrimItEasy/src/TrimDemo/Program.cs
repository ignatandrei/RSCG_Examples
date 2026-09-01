using TrimDemo;

Person p = new();
p.FirstName = " Andrei ";
p.LastName = " Ignat ";
p.FastTrimStrings();
Console.WriteLine(p.FirstName + " " + p.LastName);