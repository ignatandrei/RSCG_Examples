using BunnyTail.MemberAccessor;

namespace DemoMember;
[GenerateAccessor]
internal class Person
{
    public string FirstName { get; set; }=string.Empty;
}
