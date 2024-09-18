using UnionTypesDemo;

Console.WriteLine("Save or not");
var data = SaveToDatabase.Save(0);
data.Match(
    ok => Console.WriteLine(ok),
    ()=> Console.WriteLine("Not found")
);

data = SaveToDatabase.Save(1);
data.Match(
    ok => Console.WriteLine(ok),
    () => Console.WriteLine("Not found")
);
