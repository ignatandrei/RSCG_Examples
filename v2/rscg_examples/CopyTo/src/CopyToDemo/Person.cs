﻿namespace CopyToDemo;

[RhoMicro.CodeAnalysis.GenerateCopyTo]
internal partial class Person
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string FullName => $"{FirstName} {LastName}";
}
