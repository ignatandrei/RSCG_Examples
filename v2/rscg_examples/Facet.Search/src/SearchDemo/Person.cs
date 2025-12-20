using Facet.Search;
using Microsoft.EntityFrameworkCore;

namespace SearchDemo;

[FacetedSearch]
public class Person
{
    public int Id { get; set; }
    [FullTextSearch]
    public string Name { get; set; }= string.Empty;
    
    [SearchFacet(Type = FacetType.DateRange, DisplayName = "Date Of Birth")]
    public DateTime DOB { get; set; }
    [SearchFacet(Type = FacetType.Range, DisplayName = "SalaryRange")]
    public int Salary { get; set; }
    [SearchFacet(Type = FacetType.Boolean, DisplayName = "IsEmployee")]
    public bool IsActive { get; set; }
}

public class MyAppContext : DbContext
{
    public MyAppContext()
    {
        this.Person =this.Set<Person>();
        //fake
        Person.Add(new Person() {  
            DOB= new DateTime(1970,4,16),
             Id=1,
                IsActive=true,
                Name="Andrei Ignat",
                Salary= 3
        });
    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Server=myServerAddress;Database=myDataBase;Trusted_Connection=True;");
        base.OnConfiguring(optionsBuilder);
    }
    public DbSet<Person> Person { get; set; }  
}