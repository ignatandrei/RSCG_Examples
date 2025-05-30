﻿using System.Globalization;

var name = "Andrei ";

CultureInfo newCulture = new CultureInfo("en");
Thread.CurrentThread.CurrentUICulture = newCulture;

Console.WriteLine(LingoGen.Lingo.Hello_(name));

newCulture = new CultureInfo("fr");
Thread.CurrentThread.CurrentUICulture = newCulture;

Console.WriteLine(LingoGen.Lingo.Hello_(name));

newCulture = new CultureInfo("it");
Thread.CurrentThread.CurrentUICulture = newCulture;

Console.WriteLine(LingoGen.Lingo.Hello_(name));
