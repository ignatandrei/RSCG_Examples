using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Generator;
public static class Extensions
{
    //to do: add this
    public static Value ValueOf<TKey, Value>(this Dictionary<TKey, Value> dict, TKey key, [CallerArgumentExpression("dict")] string? paramName = null)
       where TKey : notnull
    {
        ArgumentNullException.ThrowIfNull(dict, paramName);
        if (!dict.ContainsKey(key))
            throw new ArgumentException(paramName);
        return dict[key];
    }
    //public static TaskWithData<TData, TResult> GetAwaiter<TData, TResult>(this Task<TResult> taskToExecute, TData tag)
    //{
    //    return new TaskWithData<TData, TResult>(tag, taskToExecute);
    //}
    #region transform to task
    public static Task<( TData data, TResult res)> AddData<TData, TResult>(this Task<TResult> taskToExecute, TData data)
    {
        var td=new TaskWithData<TData, TResult>(data,taskToExecute);
        return td.GetTask();
    }
    public static Task<(TData data, TResult res)>[] SelectTaskWithData<TData, TResult>(this TData[] arr,Func<TData, Task<TResult>> func) {
        return arr.Select(it => func(it).AddData(it)).ToArray();
    }
    #endregion
}
//https://devblogs.microsoft.com/pfxteam/await-anything/
public struct TaskWithData<TData, TResult>//: INotifyCompletion
{
    private readonly TData data;
    private readonly Task<TResult> taskToExecute;
    //private TaskAwaiter<TResult> m_awaiter;

    public TaskWithData(TData data,Task<TResult> taskToExecute)
    {
        ArgumentNullException.ThrowIfNull(taskToExecute);
        this.data = data;
        this.taskToExecute = taskToExecute;
        //this.m_awaiter = taskToExecute.GetAwaiter();
    }
# region add this to have Task.WhenAll
    public async Task<( TData data, TResult res)> GetTask() {
        var res = await taskToExecute;
        return (data,res);
    }
    public static explicit operator Task<(TData data, TResult res)>(TaskWithData<TData,TResult> b) 
        => b.GetTask() ;

    #endregion
    //public TaskWithData<TData,TResult> GetAwaiter() { return this; }
    //public bool IsCompleted { get { return m_awaiter.IsCompleted; } }
    //public (TData data, TResult res) GetResult()
    //{
    //    var res=m_awaiter.GetResult();
    //    return ( data,res);

    //}


    //public void OnCompleted(Action continuation)
    //{
    //    m_awaiter.OnCompleted(continuation);
    //}
}
