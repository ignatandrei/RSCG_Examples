﻿
namespace ProxyGenDemo;

public class Person 
{
    public int ID { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string FullName()
    {
        return $"{FirstName} {LastName}";
    }
}
