﻿using AltaSoft.DomainPrimitives.Abstractions;

namespace DomainPrimitives;

public readonly partial record struct YearDate : IDomainValue<int>
{
    public static void Validate(int value)
    {
        if (value <= 0)
            throw new InvalidDomainValueException("year must be positive");
    }
    public static int Default => 1;
}
public readonly partial record struct MonthDate : IDomainValue<int>
{
    public static void Validate(int value)
    {
        if (value <= 0)
            throw new InvalidDomainValueException("year must be positive");
    }
    public static int Default => 1;
}

public readonly partial record struct DayDate : IDomainValue<int>
{
    public static void Validate(int value)
    {
        if (value <= 0)
            throw new InvalidDomainValueException("year must be positive");
    }
    public static int Default => 1;
}
