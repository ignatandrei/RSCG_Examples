﻿using MagicMap;
namespace mapperlyDemo;

[TypeMapper(typeof(Person), typeof(PersonDTO))]
internal partial class PersonMapper { }
public class PersonDTO
{
    public int ID { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }

    public string FullName { 
        get
        {
            return FirstName + " " + LastName;
        }
    }
}
