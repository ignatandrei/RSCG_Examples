﻿using NetEscapades.EnumGenerators;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

[EnumExtensions]
internal enum InstallType
{
    [Display(Name = $"Please use one of the flags of {nameof(InstallType)}")]
    None= 0,
    
    ShowGUI,
    ShowNoGui,
}
