using System.Diagnostics;
using System.Threading.Tasks;

namespace Meziantou.PolyfillDemo
{

    internal class StartProcess
    {
        static async Task StartNotepad()
        {
            await Task.Delay(1000);
            var process = Process.Start("notepad.exe");

#if NET6_0_OR_GREATER
           await process.WaitForExitAsync();
#else
            process.WaitForExit();
#endif
            
        }
        static async Task StartNotepadPolyFill()
        {
            await Task.Delay(1000);
            var process = Process.Start("notepad.exe");
            //do remove nuget Meziantou.Polyfill - this line will not be ok.
            await process.WaitForExitAsync();

        }

    }
}