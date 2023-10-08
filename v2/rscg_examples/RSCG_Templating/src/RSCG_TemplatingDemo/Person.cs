using RSCG_TemplatingCommon;

namespace RSCG_TemplatingDemo;

[IGenerateDataFromClass("ClassTypeName")]
[IGenerateDataFromClass("ClassPropByName")]
public partial class Person
{
    public string Name { get { return FullName(" "); } }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string FullName(string separator = " ")
    {
        return FirstName + separator + LastName;
    }
    public void DisplayNameOnConsole()
    {
        Console.WriteLine(FullName());
    }
    public async Task<string> GetName()
    {
        await Task.Delay(1000);
        return FirstName ?? "";
    }
    public Task<string> GetFullName()
    {
        return Task.FromResult(FullName());
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
