﻿
using Matryoshki.Abstractions;
Decorate<IPerson> // you can use Decorate<> alias if you prefer
    .With<AddLog>()
    .Name<PersonMatryoshka>();

var services = new ServiceCollection();

services.AddTransient<IPerson, Person>();
services.AddTransient<PersonMatryoshka, PersonMatryoshka>();
var serviceProvider = services.BuildServiceProvider();
var sp=serviceProvider.GetRequiredService<PersonMatryoshka>();
sp.FirstName = "Andrei";
sp.LastName = "Ignat";
Console.WriteLine(sp.FullName());
