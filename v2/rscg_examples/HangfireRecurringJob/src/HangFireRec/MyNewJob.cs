﻿using IeuanWalker.Hangfire.RecurringJob.Attributes;

namespace HangFireRec;
[RecurringJob("*/1 * * * *")]
public class MyNewJob
{
    public async Task Execute()
    {
       await Task.Delay(1000);
        Console.WriteLine("Hello from recurring job hangfire");
    }
}