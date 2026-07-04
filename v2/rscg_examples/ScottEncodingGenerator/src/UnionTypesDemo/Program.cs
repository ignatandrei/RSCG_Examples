using UnionTypesDemo;

Console.WriteLine("Save or not");
ResultSave<int> data = SaveToDatabase.Save(0);
var message= data switch
{
    ResultSave<int>.Ok ok => $"Saved {ok.Value}",
    ResultSave<int>.None => "Not found", 
};
Console.WriteLine(message);
data = SaveToDatabase.Save(1);
message = data.Match(

    ok => $"Saved {ok.Value}",
    none => "Not found"   
 );
Console.WriteLine(message);
