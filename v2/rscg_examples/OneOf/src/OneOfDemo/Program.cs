﻿using OneOfDemo;

Console.WriteLine("Please enter data - string or number");

var data= Console.ReadLine();
//you can experiment with
StringOrNumber nr1 = 5;
var nr = new StringOrNumber(data);
var dataNumber = nr.TryGetNumber();
Console.WriteLine($"{dataNumber.isNumber} {dataNumber.number}");