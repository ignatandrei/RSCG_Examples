
string originalFolder = @"C:\ignatandrei\rscg_Examples";
if (!Directory.Exists(originalFolder))
{
    originalFolder = @"D:\gth\RSCG_Examples";
}
originalFolder = Path.Combine(originalFolder, "v2", "rscg_examples");

string[] folders = new string[] { "ThisAssembly" };

foreach (string folder in folders)
{
    var video=Path.Combine(originalFolder, folder);
    var file = Path.Combine(video, "video.json");
    
    try
    {
        using var v = new VideoData(file);
        Console.WriteLine("nr steps :" + await v.Analyze());
        Console.WriteLine(await v.Execute());

    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error in {file} : {ex.Message}");
        //break;
    }
    
    break;

}

[System.Runtime.Versioning.SupportedOSPlatform("windows")]
public partial class Program
{
      
}