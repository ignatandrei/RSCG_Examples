using System.ComponentModel;
using System.Diagnostics;

namespace GV.Steps;

internal record StepVSCode(string text, string value) : newStep(text, value)
{
    private Process? process;

    string location = String.Empty;
    public override void Dispose()
    {
        if (process != null)
        {
            process.Dispose();
            process = null;
        }
    }

    public override Task Execute()
    {
        try
        {
            process = Process.Start(location, value);
        }
        catch(Win32Exception) {
            location = location + ".cmd";
            try
            {
                process = Process.Start(location, value);
                return Task.CompletedTask;
            }
            catch { }
            throw;
        }
        return Task.CompletedTask;

    }

    public override async Task<bool> InitDefaults()
    {
        //C:\\Users\\ignat\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe
        location = (await Where("code"))??"";
        return !string.IsNullOrWhiteSpace(location);
    }
    public static async Task<string?> Where(string exe)
    {
        var psi = new ProcessStartInfo();
        psi.FileName = "where";
        psi.WindowStyle = ProcessWindowStyle.Hidden;
        psi.UseShellExecute = false;
        psi.CreateNoWindow = true;
        psi.Arguments = exe;
        psi.RedirectStandardOutput = true;
        var p = new Process();
        p.StartInfo = psi;
        
        p.Start();

        await p.WaitForExitAsync();
        var data = p.StandardOutput.ReadToEnd();
        if (data == null) return null;
        if (string.IsNullOrWhiteSpace(data)) return null;
        var lines = data
                .Split(Environment.NewLine, StringSplitOptions.RemoveEmptyEntries)
                ;
        if (lines.Length == 0) return null;
        return lines[0];
    }
}

