using UnionTypesDemo;

Console.WriteLine("Save or not");
var data = SaveToDatabase.Save(0);
Console.WriteLine(data.IsValidationError);
data = SaveToDatabase.Save(1);
Console.WriteLine(data.IsSuccess);
