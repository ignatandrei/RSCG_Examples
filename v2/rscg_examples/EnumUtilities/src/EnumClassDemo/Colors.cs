﻿using Raiqub.Generators.EnumUtilities;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace EnumClassDemo;
[EnumGenerator]
[Flags]
//[JsonConverterGenerator]
//[JsonConverter(typeof(ColorJsonConverter))]
public enum Colors
{
    //[Display(ShortName = "This should be never seen")]
    [EnumMember(Value = "This should be never seen")]
    None =0,
    Red=1,
    Green=2,
    Blue=4,
}