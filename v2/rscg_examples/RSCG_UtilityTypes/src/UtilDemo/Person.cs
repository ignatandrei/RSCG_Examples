﻿using RSCG_UtilityTypesCommon;

namespace UtilDemo;
[Pick("Person1",nameof(FirstName),nameof(LastName))]
[Omit("Person2", nameof(Salary))]
public class PersonFull
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int Salary { get; set; }

}
