using DemoExcel;

Console.WriteLine("Hello, World!");
var persons = MyExcelPersonFactory.Load("MyExcel.xlsx").ToArray();

foreach (var person in persons)
{
    Console.WriteLine(person.ID + person.FullName());
    
}