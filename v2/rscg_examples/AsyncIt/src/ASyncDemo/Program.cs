
using AsyncDemo;

var p=new Person();
var result=await p.RunAsync();
Console.WriteLine(result);
result=p.Run();
Console.WriteLine(result);
