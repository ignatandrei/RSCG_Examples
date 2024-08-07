﻿namespace AG;

internal class Person
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    [Metrics]
    public string FullName()
    {
        return $"{FirstName} {LastName}";
    }
}