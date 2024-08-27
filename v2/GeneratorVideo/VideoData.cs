namespace GeneratorVideo;
[System.Runtime.Versioning.SupportedOSPlatform("windows")]

internal class VideoData:IDisposable
{
    List<Step> _steps = new();
    private readonly string fileName;

    public VideoData(string fileName)
    {
        this.fileName = fileName;
    }
    public async Task<int> Analyze()
    {
        var data = await File.ReadAllTextAsync(fileName);
        var steps = JsonSerializer.Deserialize<Dictionary<string, string>>(data);
        ArgumentNullException.ThrowIfNull(steps);
        foreach (var step in steps)
        {
            Step newStep = Step.Parse(step.Key + Step.esc + step.Value, null);
            newStep.OriginalFileNameFromWhereTheStepIsComing = fileName;
            _steps.Add(newStep);
        }
        return _steps.Count;

    }
    public async Task<bool> Execute()
    {
        var execSteps=_steps.OrderBy(it=>it.Number).ToArray();
        var nr = execSteps.Length;
        foreach (var step in execSteps) {
            try
            {
                Console.WriteLine("executing " + step.Number + $"/{nr}");// + "=>" + step.value);
                if (step.Number < 12) continue;
                await step.Execute();
                await Task.Delay(2000);
                //Console.ReadLine();
            }
            catch(Exception ex) 
            {
                Console.WriteLine("Error :" + ex.Message);
                return false;
            }
        }
        return true;
    }

    public void Dispose()
    {
        foreach (var step in _steps)
        {
            try {
                Console.WriteLine("disposing " + step.Number);
                step.Dispose(); }
            catch
            {
                Console.WriteLine("Error in dispose");
            }
            
        }   
    }
}
