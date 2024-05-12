// See https://aka.ms/new-console-template for more information
using ActorDemo;
using Gridsum.DataflowEx;

Person person = new Person { Name = "Andrei Ignat" };

DayWorkflow dayAndreiIgnat = new ();
var input = dayAndreiIgnat.InputBlock;
//async
await dayAndreiIgnat.SendAsync(person);
//sync
while (dayAndreiIgnat.Call(person))
{
    await Task.Delay(100);
}

Console.WriteLine("Done");
Console.ReadLine();