﻿using System.ComponentModel;
using Hsu.Sg.Sync;
namespace HsuSgSync;
[Sync]
internal partial class Person
{   
    public async Task<bool> RunAsync()
    {
        await Task.Delay(1000);
        return true;
    }
}
