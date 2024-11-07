namespace GV.Steps;
internal record StepText(string text, string value) : newStep(text, value)
{
    public override Task<bool> InitDefaults()
    {
        this.SpeakTest ??= value;
        return Task.FromResult(true);
    }
    public override void Dispose()
    {
    }
    
    internal override async Task Execute()
    {
        await Task.Delay(1000);
        Console.WriteLine(value);
        //await Talk(true);        
        return;
    }
}
