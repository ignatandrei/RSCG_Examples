using CP_Console;

IDataValue provider = new DataValue_CP(new DataFromHttp(), new DataFromMemory());
var result = await provider.KeyFromValue("test", false);
Console.WriteLine(result);
DataValue_CP realClass = (DataValue_CP)provider ;
var lastInterface = realClass.lastUsedInterface ?? -1;
Console.WriteLine("value was obtained from " + realClass.Get(lastInterface).Name);