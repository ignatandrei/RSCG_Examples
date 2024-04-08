using UnionTypesDemo;

Console.WriteLine("Save or not");
var data = SaveToDatabase.Save(0);
Console.WriteLine(data.IsNotFound);
data = SaveToDatabase.Save(1);
Console.WriteLine(data.IsResultOfInt32);

Console.WriteLine(data.AsResultOfInt32());
