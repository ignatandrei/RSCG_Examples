//using System;
//using System.Speech.Synthesis;
//using System.Speech.AudioFormat;

using Windows.Media.SpeechSynthesis;
using System.IO;
using System.Media;

using System;
namespace GeneratorVideo;
internal class Voices
{
    public async static Task DisplayVoices()
    {
        await SpeechSynthesizer.TrySetDefaultVoiceAsync(SpeechSynthesizer.AllVoices[0]);
        
        // Initialize a new instance of the SpeechSynthesizer.
        using SpeechSynthesizer synth = new();
        {
             
            // Output information about all of the installed voices.
            Console.WriteLine("Installed voices -");
            foreach (var voice in SpeechSynthesizer.AllVoices)
            {
                synth.Voice = voice;
                var stream = await synth.SynthesizeTextToStreamAsync($"Hello, this is the {voice.DisplayName} selected voice speaking!");

                // Play the audio stream
                using var audioStream = stream.AsStreamForRead();
                
                var player = new SoundPlayer(audioStream);
                player.PlaySync();
                Console.WriteLine(" - " + voice.DisplayName);
                Console.WriteLine();
            }
        }
        Console.WriteLine("Press any key to exit...");
        Console.ReadKey();
    }
}
