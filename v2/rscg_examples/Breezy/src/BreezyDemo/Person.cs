﻿namespace BreezyDemo;

[Table("person")]//this is Breezy.Table
public class Person
{
    public int ID { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
}
