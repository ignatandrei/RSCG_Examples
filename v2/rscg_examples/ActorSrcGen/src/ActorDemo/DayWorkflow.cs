using ActorSrcGen;
using System.Diagnostics.Metrics;

namespace ActorDemo;
[Actor]
partial class DayWorkflow
{
    [FirstStep("StartDay")]
    //[Receiver]
    [NextStep(nameof(WashFace))]
    [NextStep(nameof(LogMessage))]
    public async Task<Person> StartDay(Person p)
    {
        await Task.Delay(1000 );
        return p;
    }

    

    [Step]
    [NextStep(nameof(LogMessage))]
    [NextStep(nameof(Eat))]
    public async Task<Person> WashFace(Person p)
    {
        await Task.Delay(1000);
        return p;
    }
    


    [Step]
    [NextStep(nameof(LogMessage))]
    [NextStep(nameof(Sleep))]
    public async Task<Person> Eat(Person p)
    {
        await Task.Delay(1000);
        return p;
    }
    

    [NextStep(nameof(LogMessage))]
    public async Task<int> Sleep(Person p)
    {
        await Task.Delay(1000);
        return p.Name.Length;
    }

    [LastStep]
    public void LogMessage(Person x)
    {
        Console.WriteLine("Incoming Message: " + x?.Name);
    }


}
