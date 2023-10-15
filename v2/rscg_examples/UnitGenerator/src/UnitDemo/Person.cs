
using UnitGenerator;

namespace StronglyDemo;


[UnitOf(typeof(int))]
public partial struct YearId { }

[UnitOf(typeof(int))]
public partial struct MonthId { }

[UnitOf(typeof(int))]
public partial struct DayId { }

internal class Person
{
    public DateTime BirthDate { get; internal set; }
    public void SetBirthDate(YearId yearId,MonthId monthId,DayId dayId)
    {
        BirthDate = new DateTime(yearId.AsPrimitive(), monthId.AsPrimitive(), dayId.AsPrimitive());
    }
}
