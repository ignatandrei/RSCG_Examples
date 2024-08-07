﻿using TypeUtilities;
using static TypeUtilities.Abstractions.MemberDeclarationFormats;
using TypeUtilities.Abstractions;

namespace UtilDemo;
public class PersonFull
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public int Salary { get; set; }

}

[Map(typeof(PersonFull),
      MemberDeclarationFormat = $"{Tokens.Accessibility} string Mapped{Tokens.Name}{Tokens.Accessors}",
      MemberKindSelection = MemberKindFlags.AnyProperty
    )]
[Omit(typeof(PersonFull), nameof(PersonFull.Salary))]
public partial class Person2
{
    
}

[Pick(typeof(PersonFull), nameof(PersonFull.FirstName), nameof(PersonFull.LastName))]
public partial class Person1
{
    
}

