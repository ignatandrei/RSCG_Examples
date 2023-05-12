using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.IO.Compression;
using System.Reflection.Emit;

namespace Generator;

public class MultiGeneratorV2
{

    Dictionary<string, bool> generators;
    private readonly string rootPath;
    private Description[] _AllDescriptions = null;
    public MultiGeneratorV2(string root)
    {
        this.rootPath = root;
        generators = new()
        {
            { "ThisAssembly",true },
            {"RSCG_TimeBombComment",true},
            {"System.Text.Json",true },
            {"System.Text.RegularExpressions",true },
            {"Microsoft.Extensions.Logging",true },
            //{ "PartiallyApplied",true},
            //{"Apparatus.AOT.Reflection",true }
            
        };
    }

    public async Task GatherData()
    {
        string folderExamples = Path.Combine(rootPath, "rscg_examples");
        var tasks = generators
            .Select(it => new { it.Key, it.Value })
            .Select((it, nr) =>
                it.Value ? GatherData(nr + 1, it.Key, folderExamples) : null)
            .Where(it => it != null)
            .ToArray();

        _AllDescriptions = await Task.WhenAll(tasks);

    }
    public async Task CreateZip()
    {
        var pathDocusaurus = Path.Combine(this.rootPath, "rscg_examples_site");
        await Task.WhenAll(_AllDescriptions.Select(it => CreateZipFiles(it, pathDocusaurus)));

    }
    private async Task<bool> CreateZipFiles(Description desc, string rootFolder)
    {
        string sources = Path.Combine(desc.rootFolder, "src");
        await CleanProject(sources);
        var zipFile = Path.Combine(rootFolder , "static", "sources", desc.Generator.Name + ".zip");
        //Console.WriteLine(zipFile);
        if (File.Exists(zipFile)) File.Delete(zipFile);
        ZipFile.CreateFromDirectory(sources, zipFile, CompressionLevel.SmallestSize, false);
        return true;
    }
    private async Task<Description> GatherData(int nr, string generator, string rootFolder)
    {
        var folder = Path.Combine(rootFolder, generator);
        var text = await File.ReadAllTextAsync(Path.Combine(folder, "description.json"));
        var desc = JsonSerializer.Deserialize<Description>(text);
        desc.Nr = nr;
        desc.rootFolder = folder;
        string sources = Path.Combine(desc.rootFolder, "src");
        await CleanProject(sources);
        //var zipFile = Path.Combine(rootFolder + "_site", "static", "sources", desc.Generator.Name + ".zip");
        ////Console.WriteLine(zipFile);
        //if (File.Exists(zipFile)) File.Delete(zipFile);
        //ZipFile.CreateFromDirectory(sources, zipFile,CompressionLevel.SmallestSize,false);
        await BuildProject(sources);
        var csprojItems = Directory.GetFiles(sources, desc.Data.CSProj, SearchOption.AllDirectories);
        if (csprojItems.Length != 1)
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
    private async Task<bool> CleanProject(string path)
    {
        //Console.WriteLine("Starting in" + path);
        var psi = new ProcessStartInfo();
        psi.WorkingDirectory = path;
        psi.FileName = @"C:\Program Files\dotnet\dotnet.exe";
        psi.WindowStyle = ProcessWindowStyle.Hidden;
        psi.UseShellExecute = true;
        psi.CreateNoWindow = true;
        psi.Arguments = "clean";
        var p = new Process();
        p.StartInfo = psi;

        p.Start();

        await p.WaitForExitAsync();
        return p.ExitCode == 0;
    }
    private async Task<bool> BuildProject(string path)
    {
        //Console.WriteLine("Starting in" + path);
        var psi = new ProcessStartInfo();
        psi.WorkingDirectory = path;
        psi.FileName = @"C:\Program Files\dotnet\dotnet.exe";
        psi.WindowStyle = ProcessWindowStyle.Hidden;
        psi.UseShellExecute = true;
        psi.CreateNoWindow = true;
        psi.Arguments = "build";
        var p = new Process();
        p.StartInfo = psi;

        p.Start();

        await p.WaitForExitAsync();
        return p.ExitCode == 0;
    }
    internal async Task WrotePDF()
    {
        var pathDocusaurus = Path.Combine(this.rootPath, "rscg_examples_site");
        await Task.WhenAll(_AllDescriptions.Select(it => WrotePDF(it, pathDocusaurus)));
    }

    internal async Task WroteDocusaurus()
    {
        var pathDocusaurus = Path.Combine(this.rootPath, "rscg_examples_site");
        await ModifyDocusaurusTotalExamples(pathDocusaurus, generators.Count);
        await Task.WhenAll(_AllDescriptions.Select(it => WroteDocusaurus(it, pathDocusaurus)));
    }
    internal async Task WrotePost()
    {
        var pathDocusaurus = Path.Combine(this.rootPath, "rscg_examples_site");
        await Task.WhenAll(_AllDescriptions.Select(it => WrotePost(it, pathDocusaurus)));
    }

    private async Task ModifyDocusaurusTotalExamples(string pathDocusaurus, int nr) {
        await ModifyDocusaurusIndex(pathDocusaurus, nr);
        await ModifyDocusaurusAbout(pathDocusaurus, nr);
    }

    private async Task ModifyDocusaurusAbout(string pathDocusaurus, int nr)
    {
        var index = Path.Combine(pathDocusaurus, "docs", "About-This", "about.md");
        var content = await File.ReadAllLinesAsync(index);
        string newContent = "";
        foreach (var line in content)
        {
            if (line.Contains("of ") && line.Contains("Roslyn Source Code Generator (RSCG)", StringComparison.InvariantCultureIgnoreCase))
            {
                newContent += $"of {nr} Roslyn Source Code Generator (RSCG)";

            }
            else
            {
                newContent += line;

            }
            newContent += Environment.NewLine;
        }
        await File.WriteAllTextAsync(index, newContent);



    }
    private async Task ModifyDocusaurusIndex(string pathDocusaurus, int nr)
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
    private async Task<bool> WrotePDF(Description it, string pathDocusaurus)
    {
        string folderToWrite = Path.Combine(pathDocusaurus, "static", "pdfs");
        string file =  it.Generator.Name + ".pdf";
        file = Path.Combine(folderToWrite, file);

        var psi = new ProcessStartInfo();
        psi.WorkingDirectory = @"C:\Program Files (x86)\Prince\engine\bin";
        //psi.FileName = "cmd.exe";
        psi.FileName = @"C:\Program Files (x86)\Prince\engine\bin\prince.exe";
        psi.WindowStyle = ProcessWindowStyle.Hidden;
        psi.UseShellExecute = false;
        psi.CreateNoWindow = true;
        psi.Arguments = $@"https://ignatandrei.github.io/RSCG_Examples/v2/docs/{it.Generator.Name} -o {file}";
        
        Console.WriteLine(psi.Arguments);
        //psi.ArgumentList.Add("/K ");
        //psi.ArgumentList.Add(@"C:\Program Files (x86)\Prince\engine\bin\prince.exe ");
        var p = new Process();
        p.StartInfo = psi;
        p.Start();
        await p.WaitForExitAsync();
        return (p.ExitCode == 0);

    }
    private async Task<bool> WrotePost(Description it, string pathDocusaurus)
    {
        var template = await File.ReadAllTextAsync("newPost.txt");
        var templateScriban = Scriban.Template.Parse(template);
        var output = templateScriban.Render(new { Description = it }, member => member.Name);
        string folderToWrite = Path.GetTempPath();
        string file = it.Nr.ToString("00#") + it.Generator.Name + ".md";
        file = Path.Combine(folderToWrite, file);
        await File.WriteAllTextAsync(file, output);
        Process.Start("notepad.exe", file);
        //Console.WriteLine(output);
        await Task.Delay(100);
        return true;
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