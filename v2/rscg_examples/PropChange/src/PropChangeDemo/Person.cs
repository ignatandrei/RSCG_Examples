using PropertyChanged.SourceGenerator;
namespace PropChangeDemo;

partial class Person
{
    [Notify]    
    private string? _FirstName;
}
