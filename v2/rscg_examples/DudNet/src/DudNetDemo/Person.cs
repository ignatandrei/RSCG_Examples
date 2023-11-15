using DudNet.Attributes;
using System.Runtime.CompilerServices;

namespace DudNetDemo;
[ProxyService]
public partial class Person : IPerson
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string FullName()
    {
        return FirstName + " " + LastName;
    }
}
