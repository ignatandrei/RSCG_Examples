﻿using ReadData;
Console.WriteLine("Hello, World!");

IReadPersonSpectreFactory factory = new ReadPersonSpectreFactory();
var person = factory.Get();
//Console.WriteLine($"Hello, {person.FirstName} {person.LastName}!");
person.SpectreDump();
