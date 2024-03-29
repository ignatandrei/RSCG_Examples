﻿
using Lombok.NET;

namespace Lombok.NETDemo;

[ToString(AccessTypes=AccessTypes.Public,  MemberType=MemberType.Property)]
//[AllArgsConstructor(AccessTypes=AccessTypes.Public,MemberType = MemberType.Property)]
public partial class Person
{
    public Person()
    {
        
    }
    public string? FirstName{ get; set; }
    public string? LastName { get; set; }
    public string FullName
    {
        get
        {
            return FirstName + " " + LastName;
        }
    }
}
