﻿using DudNetDemo;

var p = new Person();
var p1= new PersonProxy(p);
p1.FirstName = "John";
p1.LastName = "Doe";
Console.WriteLine(p.FullName());
Console.WriteLine(p1.FullName());
