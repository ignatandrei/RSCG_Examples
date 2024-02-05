namespace GeneratorVideo;
[System.Runtime.Versioning.SupportedOSPlatform("windows")]

internal record StepExecuteProgram(string text, string value) : Step(text, value)
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
    public override Task Execute()
    {
        string program = "", args = "";
        var whereExe = value.IndexOf(".exe");
        if (whereExe > 0)
        {
            program = value.Substring(0, whereExe+4);
            args = value.Substring(whereExe + 1+4);
        }
        else
        {
            var data = value.Split(' ', StringSplitOptions.RemoveEmptyEntries);
            ArgumentNullException.ThrowIfNull(data);
            program = data[0];
            args = string.Join(' ', data.Where((_, i) => i > 0).ToArray());
        }
        Console.WriteLine($"start program {program} with args {args}");
        process=Process.Start(program, args);
        return Task.CompletedTask;
    }
}
