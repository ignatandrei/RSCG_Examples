Console.WriteLine("Run the autoci file");
var underTest = new UnderTest();
int i = await underTest.Method1();
Console.WriteLine($"result:{i}");