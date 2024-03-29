﻿namespace Builder;
public class Person
{
    
    public Person(string firstName, string lastName)
    {
        FirstName = firstName;
        LastName = lastName;
    }
    public string FirstName { get; set; }
    public string? MiddleName { get; set; }
    public string LastName { get; set; }

    public string FullName()
    {
        return FirstName + " " + MiddleName + " "+LastName;
    }
    
}
