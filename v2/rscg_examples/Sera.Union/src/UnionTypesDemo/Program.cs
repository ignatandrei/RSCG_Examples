using UnionTypesDemo;

Console.WriteLine("Save or not");
var data = SaveToDatabase.Save(0);
Console.WriteLine(data.IsNotFound);
data = SaveToDatabase.Save(1);
if(data.IsOk)
{
    Console.WriteLine(data.Tag);
    Console.WriteLine(data.Ok);
}
