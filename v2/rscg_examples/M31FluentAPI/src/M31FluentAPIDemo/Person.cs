﻿using M31.FluentApi.Attributes;

namespace M31FluentAPIDemo;
[FluentApi]
internal class Person
{
    [FluentMember(0, "Named", 0)]
    public string FirstName { get; set; } = string.Empty;
    [FluentMember(0, "Named", 1)]
    public string? LastName { get; set; }

    [FluentMember(1, "HasDOB")]
    public DateTime? DOB { get; set; }
}
