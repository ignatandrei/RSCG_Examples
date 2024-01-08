using System.Diagnostics;
using AspectGenerator;
namespace AG;

[Aspect(
       // Specify the name of the method used in the 'using' statement
       // that returns an IDisposable object.
       OnUsing = nameof(OnUsing)
       )]
[AttributeUsage(AttributeTargets.Method, Inherited = false, AllowMultiple = false)]
sealed class MetricsAttribute : Attribute
{
    //static readonly ActivitySource _activitySource = new("Sample.Aspect");

    public static Activity? OnUsing(InterceptInfo info)
    {
        Console.WriteLine($"Entering {info.MemberInfo.Name}");
        return null;
        //var data=_activitySource.StartActivity(info.MemberInfo.Name);
        //return data;
    }
}