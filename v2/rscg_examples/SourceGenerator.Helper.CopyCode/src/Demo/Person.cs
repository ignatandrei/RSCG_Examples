﻿
namespace SourceGenerator_Helper_CopyCodeDemo;
[SourceGenerator.Helper.CopyCode.Copy]
[System.AttributeUsage(AttributeTargets.All, Inherited = false, AllowMultiple = false)]
internal sealed class NumberAttribute : Attribute
{
    public int ID;
}

[SourceGenerator.Helper.CopyCode.Copy]
internal class Person
{
    public int Id { get; set; }
}
