﻿// See https://aka.ms/new-console-template for more information
using FastGenericNew;
using FastGenericNewDemo;

Console.WriteLine("Hello, World!");
//private constructor
var p= FastNew.CreateInstance<Person>() ;
Console.WriteLine(p.FirstName);
//public constructor
p = FastNew.CreateInstance<Person,string>("test");
Console.WriteLine(p.FirstName);
