﻿using System.Diagnostics;

namespace ConfigBinderDemo;

[DebuggerDisplay("{AppDisplayName}")]
public class MyAppOptions
{
    public const string ConfigName = "MyAppOptionsInConfig";
    public string AppDisplayName { get; set; } = string.Empty;

}