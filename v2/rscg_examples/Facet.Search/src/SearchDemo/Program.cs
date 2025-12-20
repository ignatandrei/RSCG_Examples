using Microsoft.EntityFrameworkCore;
using SearchDemo;
using SearchDemo.Search;

var filter = new PersonSearchFilter
{
    DOBFrom = new DateTime(1970, 1, 1),
    DOBTo = new DateTime(1980, 12, 31),
    IsActive = true,
    MinSalary=1,
    MaxSalary= 10,
    SearchText= "Andrei"


};

MyAppContext cnt = new ();
var p= cnt.Person.ApplyFacetedSearch(filter);
var sql = p.ToQueryString();
Console.WriteLine(sql);