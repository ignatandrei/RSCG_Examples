using Cathei.LinqGen;
int[] a= [1,2,3];
var s = a
    .Select(x => x * x)
    .Where(it => it < 8)
    .Sum()
;

var result = a.Gen()
                  .Select(x => x * x)
                  .Where(it => it < 8)
                  .Sum();

Console.WriteLine(s == result);