using System;
using System.Collections.Generic;
using System.Text;

namespace DecoratorDemo;

internal class LogPerson : PersonDecorator
{
    public LogPerson(IPerson person) : base(person)
    {
    }
    public override string FirstName
    {
        get
        {
            Console.WriteLine($"FirstName getter called, returning {base.FirstName}");
            return base.FirstName;
        }
        set
        {
            Console.WriteLine($"FirstName setter called, setting value to {value}");
            base.FirstName = value;
        }
    }
    public override string FullName()
    {
        Console.WriteLine($"FullName() called for {FirstName} {LastName}" );
        return base.FullName();
    }
    public override async Task<int> CalculateAgeAsync(DateTime birthDate)
    {
        Console.WriteLine($"CalculateAgeAsync called with birthDate: {birthDate.ToShortDateString()}");
        return await base.CalculateAgeAsync(birthDate);
    }
}
