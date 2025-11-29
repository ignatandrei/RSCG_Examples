using DecoratorGenerator;
using System;
using System.Collections.Generic;
using System.Text;

namespace DecoratorDemo;

[Decorate]
public interface IPerson
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string FullName();

    public Task<int> CalculateAgeAsync(DateTime birthDate);
}
