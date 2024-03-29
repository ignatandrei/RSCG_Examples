﻿using Copycat;

namespace CCDemo;
[Decorate]
internal partial class CoffeeWithLogging: ICoffee
{
    [Template]
    private string[] AddLogging(Func<string[]> action)
    {
        try
        {
            Console.WriteLine($"start logging {nameof(action)}  ");
            return action();
        }
        catch (Exception e)
        {
            Console.WriteLine($"exception  {nameof(action)} ");
            throw;
        }
        finally
        {
               Console.WriteLine($"end logging {nameof(action)} ");
        }
    }


    [Template]
    public async Task<bool> AddLogging(Func<Task<bool>> action)       
    {
        try
        {
            Console.WriteLine($"start logging {nameof(action)} ");
            return await action();
        }
        catch (Exception e)
        {
            Console.WriteLine($"exception  {nameof(action)} ");
            throw;
        }
        finally
        {
            Console.WriteLine($"end logging {nameof(action)} ");
        }
    }
}
