namespace GV.Steps;
internal record StepText(string text, string value) : newStep(text, value)
{
    public override Task<bool> InitDefaults()
    {
        this.SpeakTest = value;
        return Task.FromResult(true);
    }
    public override void Dispose()
    {
    }
    
    public override async Task Execute()
    {
        await Task.Delay(1000);
        Console.WriteLine(value);
        //return;
        //using SpeechSynthesizer speaker = new();
        //synth.SetOutputToDefaultAudioDevice();
        //var p = speaker.SpeakAsync(value);
        //while (!p.IsCompleted)
        //{
        //    await Task.Delay(5000);

        //}

        await Talk(false);        
        return;
    }
}
