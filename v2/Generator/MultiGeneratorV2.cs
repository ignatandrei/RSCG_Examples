using System.Net.NetworkInformation;

namespace Generator;
public class MultiGeneratorV2
{
    string[] rscgNoExamples = new[] {
       
"AutoEmbed https://github.com/chsienki/AutoEmbed                           "
,"Cloneable https://github.com/mostmand/Cloneable                           "
,"fonderie https://github.com/jeromelaban/fonderie                          "
,"Generators.Blazor https://github.com/excubo-ag/Generators.Blazor          "
,"Generators.Grouping https://github.com/excubo-ag/Generators.Grouping      "
,"JsonMergePatch https://github.com/ladeak/JsonMergePatch                   "
,"MemoizeSourceGenerator https://github.com/Zoxive/MemoizeSourceGenerator   "
,"MiniRazor https://github.com/Tyrrrz/MiniRazor/                            "
,"MockGen https://github.com/thomas-girotto/MockGen                         "
,"ProxyGen https://github.com/Sholtee/ProxyGen                             "
,"RoslynWeave https://github.com/Jishun/RoslynWeave                        "
,"SmallSharp https://github.com/devlooped/SmallSharp                       "
,"StaticProxyGenerator https://github.com/robertturner/StaticProxyGenerator" 
,"ValueChangedGenerator https://github.com/ufcpp/ValueChangedGenerator"
,"Web-Anchor https://github.com/mattiasnordqvist/Web-Anchor"
,"WrapperValueObject https://github.com/martinothamar/WrapperValueObject"
,"ApiClientGenerator https://github.com/surgicalcoder/ApiClientGenerator",
"TypealizR https://github.com/earloc/TypealizR",
"DeeDee https://github.com/joh-pot/DeeDee",
"StrongInject https://github.com/YairHalberstadt/stronginject/",
"MemoryPack https://github.com/Cysharp/MemoryPack",
"DependencyPropertyGenerator https://github.com/HavenDV/DependencyPropertyGenerator",
"Matryoshki https://github.com/krasin-ga/matryoshki",
"Intellenum https://github.com/SteveDunn/Intellenum",
"Mediator https://github.com/martinothamar/Mediator",
"Tinyhand https://github.com/archi-Doc/Tinyhand",
"Morris.Moxy https://github.com/mrpmorris/Morris.Moxy",
"Architect.DomainModeling https://github.com/TheArchitectDev/Architect.DomainModeling",
"Maui.BindableProperty.Generator https://github.com/rrmanzano/maui-bindableproperty-generator",
"Refit https://github.com/reactiveui/refit",


    };
    //there are more https://ignatandrei.github.io/RSCG_Examples/v2/docs/CommunityToolkit.Mvvm
    //https://github.com/search?q=repo%3ACommunityToolkit%2Fdotnet++IIncrementalGenerator&type=code
    Dictionary<string, GeneratorData> generators;
    private readonly string rootPath;
    private Description[]? _AllDescriptions = null;
    private FoundFile[]? MicrosoftRSCG= null;
    public MultiGeneratorV2(string root)
    {
        this.rootPath = root;
        DateTime dtStart = new(2023, 04, 16);
        GeneratorData before = new(true, dtStart);
        generators = new()
        {
            { "ThisAssembly",before },
            {"RSCG_TimeBombComment",before},
            {"System.Text.Json",before },
            {"RSCG_Utils",before },
            {"System.Text.RegularExpressions",before },
            {"SkinnyControllersCommon",before },
            {"Microsoft.Extensions.Logging",before },
            {"RSCG_Static",before },
            {"CommunityToolkit.Mvvm",before },
            {"RSCG_AMS",before },
            {"AutoDeconstruct",before },
            {"System.Runtime.InteropServices",before },
            {"QuickConstructor",before },
            {"AutoCtor",before },
            { "dunet",before },
            {"Vogen",before },
            {"RazorBlade",before },
            { "PartiallyApplied",new(true,dtStart)},
            {"Apparatus.AOT.Reflection",before },
            {"NetEscapades.EnumGenerators",before },
            {"Microsoft.Interop.JavaScript.JSImportGenerator",before },
            {"RSCG_FunctionsWithDI",before },
            {"Microsoft.NET.Sdk.Razor.SourceGenerators",before },
            {"Rocks" ,before},
            {"mapperly",before },
            {"Podimo.ConstEmbed",before },
            {"EmbeddingResourceCSharp",before },
            {"Lombok.NET",before },
            //{"ad",new(true,new(2023,16,4))
        };

        //foreach (var v in generators)
        //{
        //    generators[v.Key] = (v.Key == "Microsoft.Interop.JavaScript.JSImportGenerator");
        //}
    }

    public async Task GatherData()
    {
        string folderExamples = Path.Combine(rootPath, "rscg_examples");
        var tasks = generators
            .Select(it => new { it.Key, it.Value })
            .Select((it, nr) =>
                it.Value.show ? GatherData(nr + 1, it.Key, folderExamples,it.Value.dtStart) : null)
            .Where(it => it != null)
            .ToArray();
        ArgumentNullException.ThrowIfNull(tasks);
        var data=await Task.WhenAll(tasks!);
        ArgumentNullException.ThrowIfNull(data);
        _AllDescriptions  = data
            .Where(it=>it !=null)
            .Select(it=>it!)
            .ToArray();

    }
    public async Task CreateZip()
    {
        ArgumentNullException.ThrowIfNull(_AllDescriptions);
        //var pathDocusaurus = Path.Combine(this.rootPath, "rscg_examples_site");
        await Task.WhenAll(_AllDescriptions.Select(it => CreateZipFiles(it, pathDocusaurus)));

        //create the microsoft zip
        Description d = new Description();
        var strRoot = _AllDescriptions.First().rootFolder;
        ArgumentException.ThrowIfNullOrEmpty(strRoot);
        var dirInfo = new DirectoryInfo(strRoot);
        ArgumentNullException.ThrowIfNull(dirInfo);
        ArgumentNullException.ThrowIfNull(dirInfo.Parent);
        ArgumentException.ThrowIfNullOrEmpty(dirInfo.Parent.FullName);
        d.rootFolder = Path.Combine(dirInfo.Parent.FullName,"Microsoft");
        d.Generator = new();
        d.Generator.Name = "Microsoft";
        await CreateZipFiles(d, pathDocusaurus);

    }
    bool Write(string zipFileOrPdf)
    {
        //return false;
        if (File.Exists(zipFileOrPdf))
        {
            if (new FileInfo(zipFileOrPdf).Length < 3)
            {
                File.Delete(zipFileOrPdf);
                return true;
            }
            else
                return false;
        }
        return true;
    }
    private async Task<bool> CreateZipFiles(Description desc, string rootFolder)
    {
        ArgumentNullException.ThrowIfNull(desc.rootFolder);
        string sources = Path.Combine(desc.rootFolder, "src");
        await CleanProject(sources);
        ArgumentNullException.ThrowIfNull(desc.Generator);
        var zipFile = Path.Combine(rootFolder, "static", "sources", desc.Generator.Name + ".zip");
        //Console.WriteLine(zipFile);
        if (!Write(zipFile)) return false;
        ZipFile.CreateFromDirectory(sources, zipFile, CompressionLevel.SmallestSize, false);
        return true;
    }
    private async Task<Description> GatherData(int nr, string generator, string rootFolder,DateTime generatedDate)
    {
        var folder = Path.Combine(rootFolder, generator);
        var text = await File.ReadAllTextAsync(Path.Combine(folder, "description.json"));
        var desc = JsonSerializer.Deserialize<Description>(text);
        ArgumentNullException.ThrowIfNull(desc);
        desc.Nr = nr;
        desc.rootFolder = folder;
        desc.generatedDate = generatedDate;
        string sources = Path.Combine(desc.rootFolder, "src");
        //await CleanProject(sources);
        //var zipFile = Path.Combine(rootFolder + "_site", "static", "sources", desc.Generator.Name + ".zip");
        ////Console.WriteLine(zipFile);
        //if (File.Exists(zipFile)) File.Delete(zipFile);
        //ZipFile.CreateFromDirectory(sources, zipFile,CompressionLevel.SmallestSize,false);
        //await BuildProject(sources);
        ArgumentNullException.ThrowIfNull(desc.Data);
        ArgumentNullException.ThrowIfNull(desc.Data.CSProj);
        var csprojItems = Directory.GetFiles(sources, desc.Data.CSProj, SearchOption.AllDirectories);
        if (csprojItems.Length != 1)
        {
            throw new Exception($"cannot find {desc.Data.CSProj}");
        }
        var output = desc.Data.outputFiles;
        output.fullPathToCsproj = csprojItems[0];
        ArgumentNullException.ThrowIfNull(desc.Data);
        ArgumentNullException.ThrowIfNull(desc.Data.CsFiles);
        output.csFiles = desc.Data.CsFiles;
        ArgumentNullException.ThrowIfNull(desc.Generator);
        var nugetName = desc.Generator.NugetFirst;
        if(!string.IsNullOrWhiteSpace(nugetName))
        nugetName = nugetName
            .Split("/")
            .Where(it=>!string.IsNullOrWhiteSpace(it))
            .Last();
        await output.GatherData(nugetName);
        
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
        p.PriorityClass = ProcessPriorityClass.RealTime;
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
        p.PriorityClass = ProcessPriorityClass.RealTime;
        await p.WaitForExitAsync();
        return p.ExitCode == 0;
    }
    private string pathDocusaurus
    {
        get
        {
            return Path.Combine(this.rootPath, "rscg_examples_site");
        }
    }
    private string pathBook
    {
        get
        {
            return Path.Combine(this.rootPath, "book");
        }
    }
    internal async Task WrotePDFs()
    {
        ArgumentNullException.ThrowIfNull(_AllDescriptions);
        await Task.WhenAll(_AllDescriptions.Select(it => WrotePDF(it, pathDocusaurus,pathBook)));
    }
    internal async Task CreateHTMLBook()
    {
        ArgumentNullException.ThrowIfNull(_AllDescriptions);
        await Task.WhenAll(_AllDescriptions.Select(it => CreateHTMLBook(it, Path.Combine(pathBook, "examples"))));
        var list = new RSCG_List(_AllDescriptions);
        var data = list.Render();
        await File.WriteAllTextAsync(Path.Combine(pathBook, "list.html"), data);

        var pandocYML = new pandocHTML(_AllDescriptions);
        var pandoc = pandocYML.Render();
        await File.WriteAllTextAsync(Path.Combine(pathBook, "pandocHTML.yaml"), pandoc);
        //pandoc.exe -d pandocHTML.yaml -o index.docx
        //pandoc.exe -d pandocHTML.yaml -o index.html
        //await WroteIndex(pathBook);
    }
    private async Task<bool> WroteIndex(string pathOfBook)
    {
        var psi = new ProcessStartInfo();
        psi.WorkingDirectory = pathOfBook;
        //psi.FileName = "cmd.exe";
        psi.FileName = Path.Combine(pathOfBook, "pandoc.exe");
        psi.WindowStyle = ProcessWindowStyle.Hidden;
        psi.UseShellExecute = false;
        psi.CreateNoWindow = true;
        psi.Arguments = $@"-d  pandocHTML.yaml  -o index.html";

        Console.WriteLine(psi.Arguments);
        //psi.ArgumentList.Add("/K ");
        //psi.ArgumentList.Add(@"C:\Program Files (x86)\Prince\engine\bin\prince.exe ");
        var p = new Process();
        p.StartInfo = psi;
        p.Start();
        await p.WaitForExitAsync();
        return (p.ExitCode == 0);

    }


    private async Task CreateHTMLBook(Description it, string pathBook)
    {
        ArgumentNullException.ThrowIfNull(it.Generator);
        var item = new RSCG_Item(it);
        var data = item.Render();
        await File.WriteAllTextAsync(Path.Combine(pathBook, it.Generator.Name + ".html"), data);
    }
    
    internal async Task CreateImageFiles()
    {
        try
        {
            Ping p = new();
            var pr = p.Send("www.yahoo.com");
            if (pr.Status != IPStatus.Success)
            {
                Console.WriteLine("no internet");
                return;
            }
        }
        catch(Exception ex)
        {
            Console.WriteLine("no internet" + ex.Message);
            return;
        }

        var pathImages = Path.Combine(pathBook, "examples", "images");
        ArgumentNullException.ThrowIfNull(_AllDescriptions);
        foreach (var item in _AllDescriptions)
        {
            await CreateImageFile(item, pathImages);
        }
        var textNoImages = Directory.GetFiles(pathImages, "*.txt",SearchOption.AllDirectories);
        foreach(var txt in textNoImages)
        {
            if(!File.Exists(txt.Substring(0,txt.Length-4)+".png"))
            {
                Console.WriteLine($"PLEASE MAKE IMAGE FOR {txt}");
            }
        }
    }

    private async Task CreateImageFile(Description it, string pathImages)
    {
        ArgumentNullException.ThrowIfNull(it.Generator);
        var name = it.Generator.Name;
        ArgumentNullException.ThrowIfNull(name);
        var folderToGenerate = Path.Combine(pathImages, name);
        if (!Directory.Exists(name))
            Directory.CreateDirectory(name);
        ArgumentNullException.ThrowIfNull(it.Data);
        var csproj = it.Data.outputFiles.fullPathToCsproj;
        ArgumentNullException.ThrowIfNull(it.Data.CSProj);
        ArgumentNullException.ThrowIfNull(csproj);
        await CreateCarbonFile(csproj, Path.Combine(folderToGenerate, it.Data.CSProj));
        string csFiles = Path.Combine(folderToGenerate, "csFiles");
        if (!Directory.Exists(csFiles))
            Directory.CreateDirectory(csFiles);
        ArgumentNullException.ThrowIfNull(it.Data);
        ArgumentNullException.ThrowIfNull(it.Data.outputFiles);
        ArgumentNullException.ThrowIfNull(it.Data.outputFiles.contentFiles);
        foreach (var item in it.Data.outputFiles.contentFiles)
        {
            await CreateCarbonFile(item.fullPathFile, Path.Combine(csFiles, Path.GetFileName(item.fullPathFile)));
        }

        string generated = Path.Combine(folderToGenerate, "generated");
        if (!Directory.Exists(generated))
            Directory.CreateDirectory(generated);
        ArgumentNullException.ThrowIfNull(it.Data);
        ArgumentNullException.ThrowIfNull(it.Data.outputFiles);
        ArgumentNullException.ThrowIfNull(it.Data.outputFiles.generatedFiles);
        foreach (var gen in it.Data.outputFiles.generatedFiles)
        {
            await CreateCarbonFile(gen.fullPathFile, Path.Combine(generated, Path.GetFileName(gen.fullPathFile)));
        }



    }
    private async Task<bool> CreateCarbonFile(string imageFile, string destination)
    {
        var nameFileImg = Path.GetFileName(destination);
            
        if (File.Exists(destination) || File.Exists(destination + ".png"))
            return false;
        if (!File.Exists(destination + ".txt"))
        {
            await File.WriteAllTextAsync(destination + ".txt", File.ReadAllText(imageFile));
        }

        //if (destination.Contains("RazorTemplate.g.cs")) return true;
        ProcessStartInfo psi = new ();
        //psi.WorkingDirectory = @"carbon-now.cmd";
        //psi.FileName = "cmd.exe";
        psi.FileName = @"carbon-now.cmd";
        psi.WindowStyle = ProcessWindowStyle.Hidden;
        psi.UseShellExecute = false;
        psi.CreateNoWindow = true;
        psi.Arguments = $"{imageFile} -l {Path.GetDirectoryName(destination)} -t {Path.GetFileName(destination)}";

        Console.WriteLine(psi.Arguments);
        var p = new Process();
        p.StartInfo = psi;
        p.Start();
        await p.WaitForExitAsync();
        return (p.ExitCode == 0);

    }
    internal async Task<bool> WroteDocusaurusAll()
    {
        //var pathDocusaurus = Path.Combine(this.rootPath, "rscg_examples_site");
        await ModifyDocusaurusTotalExamples(pathDocusaurus, generators.Count);
        await ModifyDocusaurusWithoutExamples(pathDocusaurus);
        ArgumentNullException.ThrowIfNull(_AllDescriptions);
        await Task.WhenAll(_AllDescriptions.Select(it => WroteDocusaurus(it, pathDocusaurus)));
        if(!await WroteIndexListOfRSCG(this.rootPath))
        {
            Console.WriteLine(" please make true to all to write index");
        }
        return true;
    }

    private async Task<bool> WroteIndexListOfRSCG(string rootPath)
    {
        if (generators.Any(it => !it.Value.show))
            return false;
        //var pathDocusaurus = Path.Combine(this.rootPath, "rscg_examples_site");
        var pathIndex = Path.Combine(pathDocusaurus,"docs", "indexRSCG.md");
        var template = await File.ReadAllTextAsync("RSCGList.txt");
        var templateScriban = Scriban.Template.Parse(template);
        ArgumentNullException.ThrowIfNull(_AllDescriptions);
        var output = templateScriban.Render(new {nr= _AllDescriptions.Length, all = _AllDescriptions, nrMSFT=MicrosoftRSCG?.Length, MSFT=MicrosoftRSCG }, member => member.Name);
        await File.WriteAllTextAsync(pathIndex, output);
        
        return true;
    }

    internal async Task WrotePost()
    {
        //var pathDocusaurus = Path.Combine(this.rootPath, "rscg_examples_site");
        ArgumentNullException.ThrowIfNull(_AllDescriptions);
        await Task.WhenAll(_AllDescriptions.Select(it => WrotePost(it, pathDocusaurus)));
    }

    private async Task ModifyDocusaurusTotalExamples(string pathDocusaurus, int nr) {
        await ModifyDocusaurusIndex(pathDocusaurus, nr);
        await ModifyDocusaurusAbout(pathDocusaurus, nr);
    }
    private async Task ModifyDocusaurusWithoutExamples(string pathDocusaurus)
    {
        var noEx = new NoExamples(rscgNoExamples);
        var text = noEx.Render();
        var index = Path.Combine(pathDocusaurus, "docs", "NoExamples.md");
        await File.WriteAllTextAsync(index,text);
    }
    private async Task ModifyDocusaurusAbout(string pathDocusaurus, int nr)
    {
        var index = Path.Combine(pathDocusaurus, "docs",  "about.md");
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
                newContent += $"title: '{nr} Examples ({MicrosoftRSCG?.Length} from MSFT)',";

            }
            else
            {
                newContent += line;

            }
            newContent += Environment.NewLine;
        }
        await File.WriteAllTextAsync(index,newContent);



    }
    private async Task<bool> WrotePDF(Description it, string pathOfDocusaurus,string pathOfBook)
    {
        string folderToWrite = Path.Combine(pathOfDocusaurus, "static", "pdfs");
        ArgumentNullException.ThrowIfNull(it.Generator);
        string file = it.Generator.Name + ".pdf";
        file = Path.Combine(folderToWrite, file);
        if (!Write(file)) return false;
        var psi = new ProcessStartInfo();
        psi.WorkingDirectory = Path.Combine(pathOfBook, "examples");
        //psi.FileName = "cmd.exe";
        psi.FileName = Path.Combine(pathOfBook, "pandoc.exe");
        psi.WindowStyle = ProcessWindowStyle.Hidden;
        psi.UseShellExecute = false;
        psi.CreateNoWindow = true;
        string output = Path.Combine(pathOfDocusaurus, "static", "pdfs", it.Generator.Name+".pdf");
        Console.WriteLine($"writing {output} ");


        psi.Arguments = $@"{it.Generator.Name}.html -f html -t pdf -o {output}";

        Console.WriteLine(psi.Arguments);
        //psi.ArgumentList.Add("/K ");
        //psi.ArgumentList.Add(@"C:\Program Files (x86)\Prince\engine\bin\prince.exe ");
        var p = new Process();
        p.StartInfo = psi;
        p.Start();
        await p.WaitForExitAsync();
        return (p.ExitCode == 0);

    }
    //private async Task<bool> WrotePDF(Description it, string pathDocusaurus)
    //{
    //    string folderToWrite = Path.Combine(pathDocusaurus, "static", "pdfs");
    //    string file =  it.Generator.Name + ".pdf";
    //    file = Path.Combine(folderToWrite, file);
    //    if (!Write(file)) return false;
    //    var psi = new ProcessStartInfo();
    //    psi.WorkingDirectory = @"C:\Program Files (x86)\Prince\engine\bin";
    //    //psi.FileName = "cmd.exe";
    //    psi.FileName = @"C:\Program Files (x86)\Prince\engine\bin\prince.exe";
    //    psi.WindowStyle = ProcessWindowStyle.Hidden;
    //    psi.UseShellExecute = false;
    //    psi.CreateNoWindow = true;
    //    psi.Arguments = $@"https://ignatandrei.github.io/RSCG_Examples/v2/docs/{it.Generator.Name} -o {file}";

    //    Console.WriteLine(psi.Arguments);
    //    //psi.ArgumentList.Add("/K ");
    //    //psi.ArgumentList.Add(@"C:\Program Files (x86)\Prince\engine\bin\prince.exe ");
    //    var p = new Process();
    //    p.StartInfo = psi;
    //    p.Start();
    //    await p.WaitForExitAsync();
    //    return (p.ExitCode == 0);

    //}
    private async Task<bool> WrotePost(Description it, string pathDocusaurus)
    {
        var template = await File.ReadAllTextAsync("newPost.txt");
        var templateScriban = Scriban.Template.Parse(template);
        var output = templateScriban.Render(new { Description = it }, member => member.Name);
        string folderToWrite = Path.GetTempPath();
        ArgumentNullException.ThrowIfNull(it.Generator);
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
        ArgumentNullException.ThrowIfNull(it.Generator);
        string file = it.Generator.Name+ ".md";
        file=Path.Combine(folderToWrite,file);
        await File.WriteAllTextAsync(file, output);
        //Console.WriteLine(output);
        await Task.Delay(100);
        return true;
    }

    internal async Task WriteFrontReadMe(DescriptionOld?[] oldDesc)
    {
        oldDesc = oldDesc.Where(ut => ut != null).ToArray();
        var readMe = Path.Combine(rootPath, "..", "README.md");
        var template = await File.ReadAllTextAsync("frontReadmeNew.txt");
        var templateScriban = Scriban.Template.Parse(template);
        ArgumentNullException.ThrowIfNull(_AllDescriptions);
        ArgumentNullException.ThrowIfNull(MicrosoftRSCG);
        var output = templateScriban.Render(
            new {
                nrNoExamples = rscgNoExamples.Length,
                rscgNoExamples,
                oldDesc, 
                nr = _AllDescriptions.Length, 
                all = _AllDescriptions ,
                MSFT_RSCG= MicrosoftRSCG,
                MSFT_RSCG_NR= MicrosoftRSCG.Length
            }, 
            member => member.Name);
        await File.WriteAllTextAsync(readMe, output);
    }

    internal async Task<long> GenerateMSFT()
    {
        string folderMSFT = Path.Combine(rootPath, "rscg_examples","Microsoft");

        ByMicrosoft msft = new(folderMSFT);
        this.MicrosoftRSCG = await msft.Search();
        var nr = await msft.WriteFiles(Path.Combine(rootPath, "rscg_examples_site"));
        return nr;
        //var data= (await msft.Search()).ToList();
        //data.Sort((a,b) => a.NameGenerator.CompareTo(b.NameGenerator));
        
        //string folderWithDocs = Path.Combine(rootPath, "rscg_examples_site","docs", "Microsoft");
        //foreach (var ff in data)
        //{
        //    var item = new ItemMSFT(ff);
        //    var fileContents = await item.RenderAsync();
        //    var nameFile = Path.Combine(folderWithDocs, ff.NameGenerator.Replace(FoundFile.sepShow,"_"));
        //    nameFile += ".md";
        //    //Console.WriteLine(nameFile);
        //    await File.WriteAllTextAsync(nameFile, fileContents);
        //}
        ////var item = new MicrosoftItem(it);t
        ////var data = item.Render();
        //return data.Count;
    }
}     