﻿using CommonCodeGenerator;

namespace ToStringData;
[GenerateToString]
internal partial class Person
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }

    [IgnoreToString]
    public int Age { get; set; }
}
