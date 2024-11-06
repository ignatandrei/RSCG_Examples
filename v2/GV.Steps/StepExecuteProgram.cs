using System.Diagnostics;

namespace  GV.Steps;
[System.Runtime.Versioning.SupportedOSPlatform("windows")]

internal record StepExecuteProgram(string text, string value) : newStep(text, value)
{
    private Process? process;
    public override void Dispose()
    {
        if (process != null)
        {
            Console.WriteLine("disposing " + process.Id);
            process.Kill();
            process.Dispose();
        }

    }
    string program = "", args = "";
    public override void InitDefaults()
    {

        var whereExe = value.IndexOf(".exe");
        if (whereExe > 0)
        {
            program = value.Substring(0, whereExe + 4);
            args = value.Substring(whereExe + 1 + 4);
        }
        else
        {
            var data = value.Split(' ', StringSplitOptions.RemoveEmptyEntries);
            ArgumentNullException.ThrowIfNull(data);
            program = data[0];
            args = string.Join(' ', data.Where((_, i) => i > 0).ToArray());
        }

        this.SpeakTest = "I am starting " + program;
    }
    public override Task Execute()
    {
        Console.WriteLine($"start program {program} with args {args}");
        process=Process.Start(program, args);
        return Task.CompletedTask;
    }
}
