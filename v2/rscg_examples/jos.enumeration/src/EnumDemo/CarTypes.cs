using JOS.Enumeration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EnumDemo;


partial  record CarTypes : IEnumeration<CarTypes>
{
    public static readonly CarTypes Dacia = new(1, "Dacia");
    public static readonly CarTypes Tesla = new(2, "Tesla");
    public static readonly CarTypes BMW = new(3, "BMW");
    public static readonly CarTypes Mercedes = new(4, "Mercedes");
}
