﻿using Union;

Console.WriteLine("Save or not");
var data = SaveToDatabase.Save(0);

Console.WriteLine(data.Match(
    ok => true,
    error => false));
data = SaveToDatabase.Save(1);
Console.WriteLine(data.Match(ok => true, error => false));
