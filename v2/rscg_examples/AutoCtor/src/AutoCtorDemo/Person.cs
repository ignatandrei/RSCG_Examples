﻿using AutoCtor;

namespace AutoCtorDemo;

[AutoConstruct]
internal partial class Person
{
    private readonly string FirstName;
    private readonly string? LastName;

}
