using RSCG_WhatIAmDoing_Common;

Console.WriteLine("Hello, World!");
var data = CachingData.Methods().ToArray();

foreach (var item in data)
{
    Console.WriteLine($"Method {item.typeAndMethodData.MethodName} from class {item.typeAndMethodData.TypeOfClass} Time: {item.StartedAtDate} state {item.State} ");
    Console.WriteLine($"  =>Arguments: {item.ArgumentsAsString()}");
    if ((item.State & AccumulatedStateMethod.HasResult) == AccumulatedStateMethod.HasResult)
    {
        Console.WriteLine($"  =>Result: {item.Result}");
    }

}
