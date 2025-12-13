using System;
using System.Collections.Generic;
using System.Text;

namespace PrimitiveDemo;

[Monify.Monify<int>]
public partial struct Age;
internal class Person
{
    public Age Age { get; set; }
    public bool IsAdult => Age >= 18;
}
