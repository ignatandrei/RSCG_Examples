﻿using UtilDemo;

var p=new PersonFull();
p.FirstName="Andrei";
p.LastName="Ignat";
//Person1 p1=(Person1)p ;
//Person2 p2=(Person2)p ;
Person1 p1 = new();
p1.FirstName = p.FirstName;

Person2 p2=new();
p2.LastName = p.LastName;


Console.WriteLine(p1.FirstName);
Console.WriteLine(p2.LastName);