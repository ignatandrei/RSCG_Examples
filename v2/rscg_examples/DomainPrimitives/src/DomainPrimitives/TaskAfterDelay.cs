﻿namespace DomainPrimitives;
internal class Person
{
    public Person(YearDate year,MonthDate month,DayDate day)
    {
        DOB = new DateOnly(year,month,day);
    }
    public DateOnly DOB { get; private set; }

    
}
