using SortAndWhere;


Console.WriteLine("Hello, World!");

var students = new Student[]
{
    new Student { FirstName = "John", LastName = "Doe", StartYear = 1935},
    new Student { FirstName = "Ignat", LastName = "Andrei", StartYear = 1989 },
};

var orderedExplicitly = students.OrderBy(p => p.FirstName).ToArray();
var orderedImplicitly = students.OrderBy("firStnaMe").ToArray();
var orderedImplicitly2 = students.AsQueryable().OrderBy("fIrsTnAme").ToArray();


//Search by property name

var search = students.AsQueryable().Where("firstName", rscg_queryablesCommon.WhereOperator.Equal, "John").ToArray();

Console.WriteLine("found : " + search.Length);

search = students.AsQueryable().Where(Student_.Where_Expr("firstName", rscg_queryablesCommon.WhereOperator.Equal, "John")).ToArray();
Console.WriteLine("found : " + search.Length);


