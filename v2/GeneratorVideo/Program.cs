//using Microsoft.Speech.Synthesis;
//https://www.microsoft.com/en-us/download/details.aspx?id=27226
//https://www.microsoft.com/en-us/download/details.aspx?id=27224
//using (SpeechSynthesizer synth = new SpeechSynthesizer())
//{
//    // Output information about all of the installed voices. 
//    Console.WriteLine("Installed voices -");
//    foreach (InstalledVoice voice in synth.GetInstalledVoices())
//    {
//        VoiceInfo info = voice.VoiceInfo;
//        Console.WriteLine(" Voice Name: " + info.Name);
//    }
//}
//await Voices.DisplayVoices();
#pragma warning disable CA1416 // Validate platform compatibility
Console.WriteLine(Windows.Media.SpeechSynthesis.SpeechSynthesizer.DefaultVoice.DisplayName);
#pragma warning restore CA1416 // Validate platform compatibility
//var x=1;
//if(x==1)
//{
//    Console.WriteLine("x is 1");
//    return;
//}
//else
//{
//    Console.WriteLine("x is not 1");
//}
string originalFolder = @"C:\ignatandrei\rscg_Examples";
if (!Directory.Exists(originalFolder))
{
    originalFolder = @"D:\gth\RSCG_Examples";
}
originalFolder = Path.Combine(originalFolder, "v2", "rscg_examples");

string[] folders = new string[] { "RSCG_NameGenerator" };

foreach (string folder in folders)
{
    var video=Path.Combine(originalFolder, folder);
    
    var file = Path.Combine(video, "video.json");

    try
    {
        Console.WriteLine($"executing {file}");
        using var v = new VideoData(file);
        var res=await v.Analyze();
        Console.WriteLine($"analysis successfull {res} , steps : {v.NrSteps()}");
        Console.WriteLine(await v.ExecuteToDetermineDuration());
        return; 
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error in {file} : {ex.Message} {ex.StackTrace}");
        //break;
    }
    
    break;

}

[System.Runtime.Versioning.SupportedOSPlatform("windows")]
public partial class Program
{
      
}