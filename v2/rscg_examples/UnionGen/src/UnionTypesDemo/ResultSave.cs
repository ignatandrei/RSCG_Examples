﻿using UnionGen.Types;
using UnionGen;
namespace UnionTypesDemo;

[Union<Result<int>, NotFound>]
public partial struct ResultSave
{
}


