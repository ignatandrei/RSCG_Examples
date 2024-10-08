﻿
using Strongly;

namespace StronglyDemo;


[Strongly(backingType: StronglyType.Int)]
public partial struct YearId { }

[Strongly(backingType: StronglyType.Int)]
public partial struct MonthId { }

[Strongly(backingType: StronglyType.Int)]
public partial struct DayId { }

internal class Person
{
    public DateTime BirthDate { get; internal set; }
    public void SetBirthDate(YearId yearId,MonthId monthId,DayId dayId)
    {
        BirthDate = new DateTime(yearId.Value, monthId.Value, dayId.Value);
    }
}
