using Microsoft.Extensions.Logging;
using System.Text;

namespace RSCG_DecoratorTestConsole;

public partial  class Person : IPerson 
{
    internal readonly ILogger<Person> logger;    
    public Person(ILogger<Person> logger)
    {
        this.logger = logger;
    }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string FullName(string separator=" ")
    {
        logger.LogInformation("from original method");
        return FirstName+separator+LastName;
    }
    public void DisplayNameOnConsole()
    {
        Console.WriteLine(FullName());
    }
    public async Task<string> GetName()
    {
        await Task.Delay(1000);
        return FirstName??"";
    }
    public Task<string> GetFullName()
    {
        return Task.FromResult( FullName());
    }
    public Task SaveId(int id)
    {
        if (id < 0)
        {
            throw new ArgumentException("this is an error because is <0 ");
        }
        return Task.CompletedTask;
    }
}
