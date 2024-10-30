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
        var opt = new JsonSerializerOptions(JsonSerializerOptions.Default);
        opt.AllowTrailingCommas = true;
        var steps = JsonSerializer.Deserialize<Dictionary<string, string>>
            (data,opt);
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
        InputSimulator inputSimulator = new InputSimulator();

        for (var iStep=0;iStep<nr;iStep++) {
            try
            {
                var step = execSteps[iStep];
                Console.WriteLine($"executing {step.GetType().Name} {step.Number} /{nr}");// + "=>" + step.value);
                //if (step.Number < 12) continue;
                await step.Execute();
                if(iStep <= nr - 1)
                {
                    Console.WriteLine("========>next step" + execSteps[iStep + 1].Description);
                }
                else
                {
                    Console.WriteLine("no next step");
                }
                Console.ReadLine();
                await Task.Delay(2000);

            }
            catch (Exception ex) 
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
