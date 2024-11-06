namespace GV.Steps;
internal record StepText(string text, string value) : newStep(text, value)
{
    public override void InitDefaults()
    {
        this.SpeakTest = value;
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
