﻿using RSCG_FunctionsWithDI_Base;

namespace RSCG_FunctionsWithDIDemo;
public partial class TestDIMyClass
{

    public bool TestMyFunc1([FromServices] TestDI1 t1, [FromServices] TestDI2 t2, int x, int y)
    {
        return true;
    }
}