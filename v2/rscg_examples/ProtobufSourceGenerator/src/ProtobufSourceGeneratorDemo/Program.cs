﻿using ProtoBuf;
using ProtobufSourceGeneratorDemo;

using var ms = new MemoryStream();
Serializer.Serialize(ms, new Person() { Name= "Andrei Ignat" });
ms.Seek(0, SeekOrigin.Begin);
var entity = Serializer.Deserialize<Person>(ms);
Console.WriteLine("name is "+entity.Name);