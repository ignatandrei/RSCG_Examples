﻿
namespace MatryoshkiDemo;

internal class AddLog : IAdornment
{
    public TResult MethodTemplate<TResult>(Call<TResult> call)
    {        
        Console.WriteLine($"start Calling {call.MemberName}  !");
        var data    =call.Forward();
        Console.WriteLine($"end calling {call.MemberName} !");
        return data;

    }
}