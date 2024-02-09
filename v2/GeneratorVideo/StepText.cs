using Windows.Media.SpeechSynthesis;
using System.IO;
using System.Media;

namespace GeneratorVideo;
internal record StepText(string text, string value) : Step(text, value)
{
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
        using SpeechSynthesizer synth = new();

        var stream = await synth.SynthesizeTextToStreamAsync(value);

        
        using var audioStream = stream.AsStreamForRead();

        var player = new SoundPlayer(audioStream);
        player.PlaySync();

        return;
    }
}
