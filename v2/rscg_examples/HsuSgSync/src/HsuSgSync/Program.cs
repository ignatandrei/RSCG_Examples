﻿using HsuSgSync;

var p=new Person();
var result=await p.RunAsync();
Console.WriteLine(result);
result=p.Run();
