using System;
using System.Collections.Generic;
using System.Text;

namespace LogDemo;

[ClassLoggerLazy]
partial class Person
{
    public string FirstName { get; set; }= string.Empty;
    public string LastName { get; set; } = string.Empty;

    public string Name()
    {
        Logger.Error("This is an error message from the Name method.");
        return $"{FirstName} {LastName}";
    }

}
