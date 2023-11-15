using PrimaryParameter.SG;
namespace QuickConstructorDemo;
internal partial class Person([Property]string FirstName,[Field(Name ="_LastName",Scope ="public")]string? LastName=null)
{
    //private readonly string FirstName;
    //private readonly string? LastName;
    
    public string FullName() => $"{FirstName} {_LastName}";
    
}
