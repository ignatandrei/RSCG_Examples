using rscg_queryablesCommon;

namespace SortAndWhere;
[MakeSortable]
[MakeWhere]
public class Student
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;

    public int StartYear { get; set; }

}
