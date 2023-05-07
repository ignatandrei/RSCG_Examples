using System.Collections.Generic;
using System.Diagnostics;
using System.Reflection.Emit;

namespace Generator;

public class MultiGeneratorV2
{

    Dictionary<string, bool> generators;
    private readonly string rootPath;
    private Description[] _AllDescriptions = null;
    public MultiGeneratorV2(string root)
    {
        this.rootPath=root;
        generators = new() 
        {
            { "ThisAssembly",true }

        };
    }

    public async Task GatherData()
    {
        string folderExamples = Path.Combine(rootPath, "rscg_examples");
        var tasks = generators
            .Where(it=> it.Value)
            .Select(it=>it.Key)
            .Select((it, nr) => GatherData(nr + 1, it, folderExamples));
        _AllDescriptions = await Task.WhenAll(tasks);
      
    }

    private async Task<Description> GatherData(int nr,string generator, string rootFolder)
    {
        var folder = Path.Combine(rootFolder,generator);
        var text = await File.ReadAllTextAsync(Path.Combine(folder, "description.json"));
        var desc = JsonSerializer.Deserialize<Description>(text);
        desc.Nr=nr;
        desc.rootFolder = folder;
        string sources = Path.Combine(desc.rootFolder, "src");
        await BuildProject(sources);
        var csprojItems = Directory.GetFiles(sources, desc.Data.CSProj,SearchOption.AllDirectories);
        if(csprojItems.Length != 1)
        {
            throw new Exception($"cannot find {desc.Data.CSProj}");
        }
        var gen = desc.Data.outputFiles;
        gen.fullPathToCsproj = csprojItems[0];
        gen.csFiles = desc.Data.CsFiles;
        await gen.GatherData();
        //Console.WriteLine(desc.Data.outputFiles.ContentCsProj);
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
        var pathDocusaurus = Path.Combine(this.rootPath, "rscg_examples_site");
        await ModifyDocusaurusTotalExamples(pathDocusaurus,generators.Count);
        await Task.WhenAll(_AllDescriptions.Select(it => WroteDocusaurus(it,pathDocusaurus )));
    }

    private async Task ModifyDocusaurusTotalExamples(string pathDocusaurus, int nr)
    {
        var index = Path.Combine(pathDocusaurus, "src", "components", "HomepageFeatures", "index.tsx");
        var content = await File.ReadAllLinesAsync(index);
        string newContent = "";
        foreach(var line in content)
        {
            if (line.Contains("title:") && line.Contains("examples",StringComparison.InvariantCultureIgnoreCase))
            {
                newContent += $"title: '{nr} Examples',";

            }
            else
            {
                newContent += line;

            }
            newContent += Environment.NewLine;
        }
        await File.WriteAllTextAsync(index,newContent);

    }

    private async Task<bool> WroteDocusaurus(Description it, string pathDocusaurus)
    {
        var template = await File.ReadAllTextAsync("DocusaurusExample.txt");
        var templateScriban = Scriban.Template.Parse(template);
        var output = templateScriban.Render(new {Description=it}, member => member.Name);

        string folderToWrite = Path.Combine(pathDocusaurus, "docs", "RSCG-Examples");
        string file = it.Nr.ToString("00#") + it.Generator.Name+ ".md";
        file=Path.Combine(folderToWrite,file);
        await File.WriteAllTextAsync(file, output);
        //Console.WriteLine(output);
        await Task.Delay(100);
        return true;
    }
}     