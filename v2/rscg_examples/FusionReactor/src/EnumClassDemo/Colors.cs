﻿using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace EnumClassDemo;

//[Flags]
[FusionReactor.SourceGenerators.EnumExtensions.GenerateEnumExtensions]
public enum Colors
{
    [Display(
         ShortName = "None",
         Name = "none - 0",
         Description = "Zero",
         Prompt = "ooF",
         GroupName = "Color1",
         Order = 0)]
    None =0,
    Red=1,
    Green=2,
    Blue=4,
}
