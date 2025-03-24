using StepwiseBuilderGenerator;
using System;

namespace Builder;
[StepwiseBuilder]
public partial class Person
{
    public Person()
    {
        new GenerateStepwiseBuilder()
           .AddStep<string>("SetFirstNameBld", "FirstName")
           .AddStep<string>("SetLastNameBuilder", "LastName")
           .AddStep<int>("Age")  
           .CreateBuilderFor<Person>();
    }
    //public Person(string firstName, string lastName)
    //{
    //    FirstName = firstName;
    //    LastName = lastName;
    //}
    //public string FirstName { get; set; }
    public string? MiddleName { get; set; }
    //public string LastName { get; set; }

    public string FullName()
    {
        return FirstName + " " + MiddleName + " "+LastName;
    }
    
}
