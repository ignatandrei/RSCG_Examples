# RxSourceGenerator
[![License](https://img.shields.io/badge/License-MIT-gree.svg)](https://github.com/Zalutskii/Reactive-Extations-Rx-event-generator/blob/master/LICENSE)
[![NuGet](https://img.shields.io/badge/NuGet-blue.svg)](https://www.nuget.org/packages/RxSourceGenerator)

# What is this?
	
This source code generator generates Reactive Extensions methods for class events.
For example, there is some class with an event:

```C#
public partial class Example
{
    public event Action<int, string, bool> ActionEvent;
}
```
If you enter the code:

```C#
Example example = new  Example();
example.RxActionEvent()
```
The generator will create a file with extension methods:
```C#
using System;
using System.Reactive.Linq;
namespace RxMethodGenerator{
    public static class RxGeneratedMethods{
        public static IObservable<(System.Int32 Item1Int32, System.String Item2String, System.Boolean Item3Boolean)> RxActionEvent(this TestConsoleApp.Example obj)
        {
            if (obj == null) throw new ArgumentNullException(nameof(obj));
            return Observable.FromEvent<System.Action<System.Int32, System.String, System.Boolean>, (System.Int32 Item1Int32, System.String Item2String, System.Boolean Item3Boolean)>(
            conversion => (obj0, obj1, obj2) => conversion((obj0, obj1, obj2)),
            h => obj.ActionEvent += h,
            h => obj.ActionEvent -= h);
        }
    }
}
```
# What does it look like in Visual Studio?
<img src="./Media/VSView.gif" />

