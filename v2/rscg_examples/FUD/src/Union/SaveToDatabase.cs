﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Union;
internal class SaveToDatabase
{
    public static ResultSave Save(int i)
    {
        if (i == 0)
        {
            return new ResultSave.ValidationError(" cannot save 0");
        }
        return new ResultSave.Success(i);
    }
}
