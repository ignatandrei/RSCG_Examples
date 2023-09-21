using GeneratorVideo;
using System.Text.Json;
using System.Text.Json.Serialization;

string originalFolder = @"C:\test\RSCG_Examples";
if (!Directory.Exists(originalFolder))
{
    originalFolder = @"C:\gth\RSCG_Examples";
}
originalFolder = Path.Combine(originalFolder, "v2", "rscg_examples");

string[] folders = new string[] { "ThisAssembly" };

foreach (string folder in folders)
{
    var video=Path.Combine(originalFolder, folder);
    var file = Path.Combine(video, "video.md");
    var v=new VideoData(file);
    Console.WriteLine("nr steps :"+await v.Analyze());
    Console.WriteLine(await v.Execute());

}

[System.Runtime.Versioning.SupportedOSPlatform("windows")]
public partial class Program
{
      
}