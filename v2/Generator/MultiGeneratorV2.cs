using System.Diagnostics;

namespace Generator;

public class MultiGeneratorV2
{

    string[] generators;
    private readonly string rootPath;
    private Description[] _AllDescriptions = null;
    public MultiGeneratorV2(string root)
    {
        this.rootPath=root;
        generators = new string[]
        {
            "ThisAssembly",

        };
    }

    public async Task GatherData()
    {
        string folderExamples = Path.Combine(rootPath, "rscg_examples");
        _AllDescriptions = await Task.WhenAll(generators.Select((it,nr) => GatherData(nr+1,it,folderExamples)));
      
    }

    private async Task<Description> GatherData(int nr,string generator, string rootFolder)
    {
        var folder = Path.Combine(rootFolder,generator);
        var text = await File.ReadAllTextAsync(Path.Combine(folder, "description.json"));
        var desc = JsonSerializer.Deserialize<Description>(text);
        desc.Nr=nr;
        desc.rootFolder = folder;        
        await BuildProject(Path.Combine(desc.rootFolder, "src"));
        return desc;
    }

    private async Task<bool> BuildProject(string path)
    {
        //Console.WriteLine("Starting in" + path);
        var psi = new ProcessStartInfo();
        psi.WorkingDirectory = path;
        psi.FileName = @"C:\Program Files\dotnet\dotnet.exe";
        psi.WindowStyle= ProcessWindowStyle.Hidden;
        psi.UseShellExecute = true;
        psi.CreateNoWindow = true;
        psi.Arguments = "build";
        var p = new Process();
        p.StartInfo = psi;
       
        p.Start();
        
        await p.WaitForExitAsync();
        return p.ExitCode == 0; 
    }

    internal async Task WroteDocusaurus()
    {
        await Task.WhenAll(_AllDescriptions.Select(it => WroteDocusaurus(it)));
    }

    private async Task<bool> WroteDocusaurus(Description it)
    {
        var template = await File.ReadAllTextAsync("DocusaurusExample.txt");
        var templateScriban = Scriban.Template.Parse(template);
        var output = templateScriban.Render(new {Description=it}, member => member.Name);

        Console.WriteLine(output);
        await Task.Delay(100);
        return true;
    }
}     