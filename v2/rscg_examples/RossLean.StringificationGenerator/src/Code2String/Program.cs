﻿using Code2String;
using RossLean.StringificationGenerator.Generated;
Person person = new Person("Andrei", "Ignat");
string personString = ConstructionCodeGeneration.ForPerson(person);
Console.WriteLine(personString);