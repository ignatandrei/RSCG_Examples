﻿using EmbedDemo;
using StreamReader sr = EmbeddedResource.sql_createDB_sql.GetReader();
var data=sr.ReadToEnd();
Console.WriteLine(data);