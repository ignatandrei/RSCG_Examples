﻿
using var connection = new SqlConnection();
//in the order of the properties in Person.cs
var persons = await connection.QueryAsync<Person>("SELECT Id,firstname, lastname FROM person");
