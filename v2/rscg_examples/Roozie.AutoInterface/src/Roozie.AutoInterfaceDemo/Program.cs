﻿using Roozie.AutoInterfaceDemo;

IPerson p = new Person();
p.FirstName = "Andrei";
p.LastName = "Ignat";
Console.WriteLine(p.FullName() );