using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RxDemo;
public partial class Person
{
    public event Action<int, string, bool>? ActionEvent;
    public void DoAction(int a, string b, bool c)
    {
        if(ActionEvent != null)
            ActionEvent.Invoke(a, b, c);
    }

}
