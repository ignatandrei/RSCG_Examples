using ZLinq;
// https://github.com/Cysharp/ZLinq
Console.WriteLine("Hello, World!");
var x = Enumerable.Range(1, 10)
    .Select(x => x * 2)
    ;


var y = x.ToArray();
foreach (var item in x)
{
    Console.WriteLine(item);
}