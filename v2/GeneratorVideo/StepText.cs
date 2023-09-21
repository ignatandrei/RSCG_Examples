
namespace GeneratorVideo;
[System.Runtime.Versioning.SupportedOSPlatform("windows")]
internal record StepText(string text, string value) : Step(text, value)
{

    public override async Task Execute()
    {
        await Task.Delay(1000);
        Console.WriteLine(value);
        //return;
        //using SpeechSynthesizer speaker = new();
        //var p = speaker.SpeakAsync(value);
        //while (!p.IsCompleted)
        //{
        //    await Task.Delay(5000);

        //}
        return;
    }
}
