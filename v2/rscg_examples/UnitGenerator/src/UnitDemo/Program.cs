﻿// See https://aka.ms/new-console-template for more information
using StronglyDemo;

Person p = new();
//p.SetBirthDate(1970, 4, 16);
p.SetBirthDate(new YearId(1970) , new MonthId(4),new DayId( 16));
Console.WriteLine(p.BirthDate);