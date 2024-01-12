// See https://aka.ms/new-console-template for more information
using DomainPrimitives;

var year = new YearDate(1970);
var month = new MonthDate(4);
var day = new DayDate(16);
year += 1;
var p=new Person(year,month,day);

Console.WriteLine(p.DOB);