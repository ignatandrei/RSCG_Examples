﻿using UnionGen.Types;

namespace UnionTypesDemo;

public class SaveToDatabase
{
    public static ResultSave Save(int i)
    {
        if(i ==0)
        {
            return new NotFound();
        }
        return new Result<int>(i);
    }
}


