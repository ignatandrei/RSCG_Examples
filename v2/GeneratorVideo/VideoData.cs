namespace GeneratorVideo;
[System.Runtime.Versioning.SupportedOSPlatform("windows")]

internal class VideoData
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
            _steps.Add(newStep);
        }
        return _steps.Count;

    }
    public async Task<bool> Execute()
    {
        var execSteps=_steps.OrderBy(it=>it.Number).ToArray();
        foreach (var step in execSteps) {
            try
            {
                Console.WriteLine("executing " + step.Number + "=>" + step.value);
                await step.Execute();
            }
            catch(Exception ex) 
            {
                Console.WriteLine("Error :" + ex.Message);
                return false;
            }
        }
        return true;
    }
}
