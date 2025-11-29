using System;
using System.Collections.Generic;
using System.Text;

namespace DecoratorDemo;

internal class Person : IPerson
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string FullName()
    {
        return $"{FirstName} {LastName}";
    }
    public async Task<int> CalculateAgeAsync(DateTime birthDate)
    {
        await Task.Delay(100); // Simulate async work
        var today = DateTime.Today;
        var age = today.Year - birthDate.Year;
        if (birthDate.Date > today.AddYears(-age)) age--;
        return age;
    }

}