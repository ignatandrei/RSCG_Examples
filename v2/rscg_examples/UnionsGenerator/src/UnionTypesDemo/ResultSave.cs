﻿using RhoMicro.CodeAnalysis;
namespace UnionTypesDemo;
public record Success(int Value);
public record ValidationError(string Message);

[UnionType<Success>]
[UnionTypeAttribute<ValidationError>]
public partial class ResultSave
{
}


