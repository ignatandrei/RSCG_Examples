﻿var v = new Person { Age = 53, Name = "Andrei Ignat" };

var bin = MemoryPackSerializer.Serialize(v);
var val = MemoryPackSerializer.Deserialize<Person>(bin);
Console.WriteLine(val.Name);