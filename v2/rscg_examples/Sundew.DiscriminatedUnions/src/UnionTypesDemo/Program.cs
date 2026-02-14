using UnionTypesDemo;

Console.WriteLine("Save or not");
ResultSave data = SaveToDatabase.Save(0);
var message= data switch
{
    ResultSave.Ok ok => $"Saved {ok.i}",
    ResultSave.NotFound => "Not found", 
};
Console.WriteLine(message);
data = SaveToDatabase.Save(1);
message = data switch
{
    ResultSave.Ok ok => $"Saved {ok.i}",
    ResultSave.NotFound => "Not found",
};
Console.WriteLine(message);
