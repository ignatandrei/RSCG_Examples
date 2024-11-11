using PolyType;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1;
[GenerateShape]
public partial record Person(string name, int age)
{
    public Person[] Childs { get; set; } = [];

    public int ID;
}