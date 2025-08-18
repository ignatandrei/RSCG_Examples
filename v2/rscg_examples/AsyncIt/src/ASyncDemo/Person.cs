using System.ComponentModel;
namespace AsyncDemo;

[AsyncIt.Async(Interface = AsyncIt.Interface.Sync)]
internal partial class Person
{   
    public async Task<bool> RunAsync()
    {
        await Task.Delay(1000);
        return true;
    }
}
