using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Generator;
public static class Extensions
{
    public static TaskWithData<TData, TResult> GetAwaiter<TData, TResult>(this Task<TResult> taskToExecute, TData tag)
    {
        return new TaskWithData<TData, TResult>(tag, taskToExecute);
    }
}
//https://devblogs.microsoft.com/pfxteam/await-anything/
public class TaskWithData<TData, TResult>: INotifyCompletion
{
    private readonly TData data;
    private TaskAwaiter<TResult> m_awaiter;

    public TaskWithData(TData data,Task<TResult> taskToExecute)
    {
        ArgumentNullException.ThrowIfNull(taskToExecute);
        this.data = data;
        this.m_awaiter = taskToExecute.GetAwaiter();
    }
    public TaskWithData<TData,TResult> GetAwaiter() { return this; }
    public bool IsCompleted { get { return m_awaiter.IsCompleted; } }
    public (TResult res,TData data) GetResult()
    {
        var res=m_awaiter.GetResult();
        return (res, data);

    }


    public void OnCompleted(Action continuation)
    {
        m_awaiter.OnCompleted(continuation);
    }
}
