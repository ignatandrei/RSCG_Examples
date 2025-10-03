using System.ComponentModel;

namespace Generator;
public class MultiGeneratorV2 
{
    const string tooComplicated = "too complicated for me, need help";
    const string old = "old ISourceGenerator";
    const string archived = "archived";
    const string inspirational = "not having nuget, but having IIncrementalGenerator";
    const string noReadMe = "no readme";
    const string later = "later";
    const string WaitingForIssue = "issue opened";
    //const string lessNet7 = "less than net 7";
    NoExample[] rscgNoExamples = [];
    
     //there are more https://ignatandrei.github.io/RSCG_Examples/v2/docs/CommunityToolkit.Mvvm
     //https://github.com/search?q=repo%3ACommunityToolkit%2Fdotnet++IIncrementalGenerator&type=code
     Dictionary<string, GeneratorDataRec> generators;
    private readonly string rootPath;
    private Description[]? _AllDescriptions = null;
    private Description[]? MicrosoftRSCG= null;
    public MultiGeneratorV2(string root, NoExample[] noExamplesData, GeneratorDataRec[]  generatorDataRecs)
    {
        rscgNoExamples= noExamplesData;
        rscgNoExamples = rscgNoExamples.OrderBy(it => it.name).ToArray();

        this.rootPath = root;
        DateTime dtStart = new(2023, 04, 16);
        GeneratorDataRec before = new(true, dtStart);
        generators = generatorDataRecs.ToDictionary(it => it.ID);

        var noCategory = generators.Where(it=>it.Value.Category == Category.None).ToArray();
        if (noCategory.Length > 0)
        {
            throw new ArgumentException("please put category on " + noCategory[0].Key);
        }
        //foreach (var v in generators) 
        //{
        //    generators[v.Key] = (v.Key == "Microsoft.Interop.JavaScript.JSImportGenerator");
        //}
    }
    public async Task OpenFindIIncremental()
    {
        var data= rscgNoExamples.Where(it=>it.why== old).ToArray();
        foreach (var item in data)
        {
            string url = item.FindIIncremental();
            var ps = new ProcessStartInfo(url)
            {
                UseShellExecute = true,
                Verb = "open",
                
            };
            Process.Start(ps);
            await Task.Delay(1000 * Random.Shared.Next(1,5));
        }
    }
    public async Task<string[]?> GatherData()
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
        //_AllDescriptions= [_AllDescriptions.Last()];
        var l = _AllDescriptions.Length;
        foreach (var item in _AllDescriptions)
        {
            item.ReverseNr = l - item.Nr;
            
            item.GeneratorData = generators.ValueOf(item.GeneratorKey??"");
        }
        return _AllDescriptions!.Select(it => it.Generator!.Source!).ToArray();

    }
    public string[] SourceNoRSCG()
    {
        return rscgNoExamples.Select(it=>it.SiteRSCG).ToArray();
    }
    public async Task<string?> GrabReadMe()
    {
        ArgumentNullException.ThrowIfNull(_AllDescriptions);
        var t = _AllDescriptions
            .Select(it =>GrabReadMe(it).AddData(it))
            .ToArray();
        //t = _AllDescriptions.SelectTaskWithData(GrabReadMe).ToArray();
        var desc = await Task.WhenAll(t);
        foreach(var it in desc)
        {
            it.data.OriginalReadme = it.res;
        }
        //foreach(var it in _AllDescriptions!)
        //{
        //    var nameFile = Path.Combine(it.rootFolder!, "readme.txt");
        //    if (!File.Exists(nameFile))
        //        continue;
        //    it.OriginalReadme= await File.ReadAllTextAsync(nameFile);

        //}
        return "";
    }
    async Task<string?> GrabReadMe(Description d)
    {
        var source = d.Generator?.Source;
        if(string.IsNullOrWhiteSpace(source))
            return null;

        var nameFile = Path.Combine(d.rootFolder!, "readme.txt");
        if (File.Exists(nameFile))
        { 
            var text=await File.ReadAllTextAsync(nameFile);
            text = text.Replace("(docs/", $"({d.Generator!.Source}/docs/");
            text = text.Replace("(img/", $"({d.Generator!.Source}/img/");
            text=text.Replace("(README_IMAGE.png)", $"({d.Generator!.Source}/README_IMAGE.png)");
            text = text.Replace("(README", $"({d.Generator!.Source}/README");
            text = text.Replace("(integ-tests/", $"({d.Generator!.Source}/integ-tests/");
            text = text.Replace("(./samples", $"({d.Generator!.Source}/samples");
            text = text.Replace("(./tests", $"({d.Generator!.Source}/tests");
            text = text.Replace("(../../wiki/", $"({d.Generator!.Source}/wiki/");

            text = text.Replace("(Documentation/", $"({d.Generator!.Source}/Documentation/");
            text = text.Replace("(src/", $"({d.Generator!.Source}/src/");
            text = text.Replace("(readme/", $"({d.Generator!.Source}/readme/");
            text = text.Replace("(samples/", $"({d.Generator!.Source}/samples/");
            text = text.Replace("(/build", $"({d.Generator!.Source}/build");


            text = text.Replace("(readme/di.gif)", $"({d.Generator!.Source}/readme/di.gif)");
            text = text.Replace("(di.gif)", $"({d.Generator!.Source}/di.gif)");

            text = text.Replace("(doc/", $"({d.Generator!.Source}/doc/");
            text = text.Replace("(docs/rules/", $"({d.Generator!.Source}/docs/rules/");
            text = text.Replace("(CHANGELOG.md", $"({d.Generator!.Source}/CHANGELOG.md");
            text = text.Replace("(/.github/CONTRIBUTING.md)", $"({d.Generator!.Source}/.github/CONTRIBUTING.md)");

            text = text.Replace("(img/", $"({d.Generator!.Source}/img/");
            text = text.Replace("(RoseLynn.GenericsAnalyzer/)", $"({d.Generator!.Source}/RoseLynn.GenericsAnalyzer/)");
            text = text.Replace("(RossLean.", $"({d.Generator!.Source}/RossLean.");

            text = text.Replace("(MinimalApis.FluentValidation.md)", $"({d.Generator!.Source}/MinimalApis.FluentValidation.md)");
            text = text.Replace("(MinimalApis.Discovery.md)", $"({d.Generator!.Source}/MinimalApis.Discovery.md)");
            text = text.Replace("<details><summary>Full generated source code</summary>", "<details><summary>Full generated source code</summary></details>");
            text = text.Replace("(docs/Map.md)", $"({d.Generator!.Source}/docs/Map.md)");
            text = text.Replace("(/src/PlantUmlClassDiagramGenerator.SourceGenerator)", $"({d.Generator!.Source}/src/PlantUmlClassDiagramGenerator.SourceGenerator)");
            text = text.Replace("(./README.zh.md)", $"({d.Generator!.Source}/README.zh.md)");
            text = text.Replace("(./CONTRIBUTING.md)", $"({d.Generator!.Source}/CONTRIBUTING.md)");
            text = text.Replace("(./LICENSE)", $"({d.Generator!.Source}/LICENSE)");
            text = text.Replace("(CHANGELOG.md)", $"({d.Generator!.Source}/CHANGELOG.md)");
            text = text.Replace("(LICENSE)", $"({d.Generator!.Source}/LICENSE)");
            text = text.Replace("(LICENSE.md)", $"({d.Generator!.Source}/LICENSE.md)");
            text = text.Replace("(docs/README.md)", $"({d.Generator!.Source}/docs/README.md)");

            text = text.Replace("href=\"README.md\"", $"href=\"{d.Generator!.Source}/README.md\"");
            text = text.Replace("href=\"README.zh-CN.md\"", $"href=\"{d.Generator!.Source}/README.zh-CN.md\"");
            text = text.Replace("(uml/TypeDeclaration.png)", $"({d.Generator!.Source}/uml/TypeDeclaration.png)");
            text = text.Replace("(uml/MemberDeclaration.png)", $"({d.Generator!.Source}/uml/MemberDeclaration.png)");
            text = text.Replace("(uml/Initializer.png)", $"({d.Generator!.Source}/uml/Initializer.png)");
            text = text.Replace("(uml/NestedClass.png)", $"({d.Generator!.Source}/uml/NestedClass.png)");
            text = text.Replace("(uml/GenericsTypeDeclaration.png)", $"({d.Generator!.Source}/uml/GenericsTypeDeclaration.png)");
            text = text.Replace("(uml/InheritanceRelationsips.png)", $"({d.Generator!.Source}/uml/InheritanceRelationsips.png)");
            text = text.Replace("(uml/IgnoreAssociation.png)", $"({d.Generator!.Source}/uml/IgnoreAssociation.png)");
            text = text.Replace("(uml/Associations.png)", $"({d.Generator!.Source}/uml/Associations.png)");
            text = text.Replace("(uml/CustomAssociation.png)", $"({d.Generator!.Source}/uml/CustomAssociation.png)");
            text = text.Replace("(uml/RecordParameterList.png)", $"({d.Generator!.Source}/uml/RecordParameterList.png)");
            text = text.Replace("(UnionsGenerator)", $"({d.Generator!.Source}/UnionsGenerator");
            text = text.Replace("(UtilityGenerators)", $"({d.Generator!.Source}/UtilityGenerators");
            text = text.Replace("(CopyTo)", $"({d.Generator!.Source}/CopyTo");
            text=text.Replace("(./docs/BenchmarksResults)", $"({d.Generator!.Source}/docs/BenchmarksResults");
            text = text.Replace("(sg_example.png", $"({d.Generator!.Source}/sg_example.png");
            text = text.Replace("(Readme_md/", $"({d.Generator!.Source}Readme_md/");
            text = text.Replace("(README.md)", $"({d.Generator!.Source}README.md");
            text = text.Replace("(src/samples/ConsoleSample)", $"({d.Generator!.Source}src/samples/ConsoleSample");
            text = text.Replace("(src/Jab.Performance/)", $"({d.Generator!.Source}src/Jab.Performance/");
            text = text.Replace("(README.md#Unity-installation)", $"({d.Generator!.Source}/README.md#Unity-installation");
            text = text.Replace("(license.md)", $"({d.Generator!.Source}/license.md)");
            text = text.Replace("(LICENSE)", $"({d.Generator!.Source}/LICENSE)");
            text = text.Replace("(./LICENSE", $"({d.Generator!.Source}/LICENSE");
            text = text.Replace("./src/Hsu", $"{d.Generator!.Source}/src/Hsu");
            text = text.Replace("(src/Ling.Cache)", $"({d.Generator!.Source}src/Ling.Cache)");
            text = text.Replace("(src/Ling.Audit)", $"({d.Generator!.Source}src/Ling.Audit)");
            text = text.Replace("(src/Ling.EntityFrameworkCore)", $"({d.Generator!.Source}src/Ling.EntityFrameworkCore)");
            text = text.Replace("(src/Ling.EntityFrameworkCore.Audit)", $"({d.Generator!.Source}src/Ling.EntityFrameworkCore.Audit)");
            text = text.Replace("(src/Ling.Blazor)", $"({d.Generator!.Source}src/Ling.Blazor)");
            text = text.Replace("(src/Ling.Blazor.Authentication)", $"({d.Generator!.Source}src/Ling.Blazor.Authentication)");
            text = text.Replace("(LICENSE)", $"({d.Generator!.Source}/LICENSE)");
            text = text.Replace("(LICENSE.md)", $"({d.Generator!.Source}/LICENSE.md)");
            text = text.Replace("(LICENSE.txt)", $"({d.Generator!.Source}/LICENSE.md)");
            text = text.Replace("(CHANGELOG.md)", $"({d.Generator!.Source}/CHANGELOG.md)");
            text = text.Replace("(./test/Benchmarks.md)", $"({d.Generator!.Source}/blob/main/test/Benchmarks.md)");
            text = text.Replace("(./docs/", $"({d.Generator!.Source}/docs/");
            text = text.Replace("(CONTRIBUTING.md)", $"({d.Generator!.Source}/CONTRIBUTING.md)");
            text = text.Replace("(./CODE-OF-CONDUCT.md)", $"({d.Generator!.Source}/CODE-OF-CONDUCT.md)");
            text = text.Replace("(docs/project/dogfooding.md)", $"({d.Generator!.Source}/docs/project/dogfooding.md)");
            text = text.Replace("(docs/workflow/README.md)", $"({d.Generator!.Source}/docs/workflow/README.md)");
            text = text.Replace("(SECURITY.md)", $"({d.Generator!.Source}/SECURITY.md)");
            text = text.Replace("(LICENSE.TXT)", $"({d.Generator!.Source}/LICENSE.TXT)");
            text = text.Replace("(docs/building.md)", $"({d.Generator!.Source}/docs/building.md)");
            text = text.Replace("(./", $"({d.Generator!.Source}/");


            text = text.Replace("Access them as a ReadOnlySpan<byte>", "Access them as a ReadOnlySpan\\<byte\\>");
            return text;
        }
            ;

        var data = await tryToGetReadme(source);
        if (data == null) return null;
        await File.WriteAllTextAsync(nameFile, data);
        return data;
    }
    async Task<string?> tryToGetMasterOrMain(HttpClient httpClient,string FullUrl)
    {
        var response = await httpClient.GetAsync(FullUrl);
        if(response.StatusCode == HttpStatusCode.OK) return await response.Content.ReadAsStringAsync();
        FullUrl = FullUrl.Replace("/main/", "/master/");
        response = await httpClient.GetAsync(FullUrl);
        if (response.StatusCode == HttpStatusCode.OK) return await response.Content.ReadAsStringAsync();
        return null;
    }
    async Task<string?> tryToGetReadme(string source)
    {
        if(!source.StartsWith("https://github.com/"))
            return null;
        var url = source.Replace("https://github.com/", "https://raw.githubusercontent.com/");
        url += "/main/";
        HttpClientHandler handler = new ()
        {
            AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate
        };
        using HttpClient httpClient = new (handler);
        
        var response = await tryToGetMasterOrMain(httpClient,url+"README.md");
        if (!string.IsNullOrWhiteSpace(response)) return response;

        response    = await tryToGetMasterOrMain(httpClient,(url + "readme.md"));
        if (!string.IsNullOrWhiteSpace(response)) return response;

        response =  await tryToGetMasterOrMain(httpClient,(url + "Readme.md"));
        if (!string.IsNullOrWhiteSpace(response)) return response;

        response = await tryToGetMasterOrMain(httpClient, url + "README.MD");
        if (!string.IsNullOrWhiteSpace(response)) return response;

        response = await tryToGetMasterOrMain(httpClient, url + "docs/README.md");
        if (!string.IsNullOrWhiteSpace(response)) return response;

        response = await tryToGetMasterOrMain(httpClient, url + "ReadMe.md");
        if (!string.IsNullOrWhiteSpace(response)) return response;

        Console.WriteLine("!!! not grab readme.md from "+source + " with url "+ url);
        return null;

    }
    public async Task<long> GrabDescriptionFromNuget()
    {
        ArgumentNullException.ThrowIfNull(_AllDescriptions);

        var t = _AllDescriptions.Select(
            it => new TaskWithData<Description, string?>(it, GrabDescriptionFromNuget(it))
            )
            .Select(td=>td.GetTask())            
            .ToArray();

        var desc = await Task.WhenAll(t);
        foreach (var item in desc)
        {
            item.data.DescriptionNuget = item.res;
        }
        return t.Length;



        //var t = _AllDescriptions!
        //    .Select(it => GrabDescriptionFromNuget(it))
        //    .ToArray();
        //var desc = await Task.WhenAll(t);
        //foreach (var item in _AllDescriptions!)
        //{
        //    var nameFile = Path.Combine(item.rootFolder!, "nuget.txt");
        //    if (File.Exists(nameFile))
        //        item.DescriptionNuget = await File.ReadAllTextAsync(nameFile);
        //}
        //return desc.Length;
    }
    async Task<string?> GrabDescriptionFromNuget(Description d)
    {
        var nameFile = Path.Combine(d.rootFolder!, "nuget.txt");
        if(File.Exists(nameFile))
            return await File.ReadAllTextAsync(nameFile);

        if (d.Generator!.NugetFirst.Length == 0)
            return "";

        var namePackage = d.Generator!.NameNugetFirst().ToLower();
     
        var url = $"https://api.nuget.org/v3/registration5-gz-semver2/{namePackage}/index.json";
        var handler = new HttpClientHandler
        {
            AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate
        };
        HttpClient _client = new(handler);
        Console.WriteLine($"grab data from {url}");
        var response = await _client.GetAsync(url);
        var data=await response.Content.ReadAsStringAsync();
        var answer= JsonDocument.Parse(data);
        var items = answer.RootElement.GetProperty("items");
        foreach (var item in items.EnumerateArray())
        {
            try
            {
                var newItems = item.GetProperty("items");
                foreach (var newItem in newItems.EnumerateArray())
                {
                    var cat = newItem.GetProperty("catalogEntry");
                    var desc = cat.GetProperty("description").GetString();
                    if (!string.IsNullOrEmpty(desc))
                    {
                        await File.WriteAllTextAsync(nameFile, desc);
                        return desc;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        return "";
    }

    public async Task CreateZip()
    {
        ArgumentNullException.ThrowIfNull(_AllDescriptions);
        //var pathDocusaurus = Path.Combine(this.rootPath, "rscg_examples_site");
        await Task.WhenAll(_AllDescriptions.Select(it => CreateZipFiles(it, pathDocusaurus)));

        //create the microsoft zip 
        Description d = new ();
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
        desc.GeneratorKey = generator;
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
            throw new Exception($"cannot find {desc.Data.CSProj} on {sources}"); 
        }
        var output = desc.Data.outputFiles;
        output.fullPathToCsproj = csprojItems[0];
        var dirCsproj = Path.GetDirectoryName(output.fullPathToCsproj);
        ArgumentNullException.ThrowIfNull(dirCsproj);
        var dirParent = Directory.GetParent(dirCsproj);
        while(dirParent != null)
        {
            var files = Directory.GetFiles(dirParent.FullName, "*.sln");
            if (files.Length == 1)
            {
                output.fullPathToSln = files[0];
                break;
            }
            dirParent = Directory.GetParent(dirParent.FullName);
        }

        ArgumentNullException.ThrowIfNull(desc.Data);
        ArgumentNullException.ThrowIfNull(desc.Data.CsFiles);
        output.csFiles = desc.Data.CsFiles;
        output.excludeDirectoryGenerated = desc.Data.ExcludeDirectoryGenerated;
        output.includeAdditionalFiles = desc.Data.IncludeAdditionalFiles;
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
        await Task.Delay(1000);
        return; 
        //await Task.WhenAll(_AllDescriptions.Select(it => WrotePDF(it, pathDocusaurus,pathBook)));
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
        var x = 1;
        if(x<2)
        {
            //do not generate
            return false;
        }
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
        psi.Arguments = $"{imageFile} --save-to {Path.GetDirectoryName(destination)} --save-as {Path.GetFileName(destination)}";

        Console.WriteLine(psi.Arguments);
        var p = new Process();
        p.StartInfo = psi;
        p.Start();
        await p.WaitForExitAsync();
        return (p.ExitCode == 0);

    }
    internal async Task<bool> WroteDocusaurusAll(string lastGenerator)
    {
        VerifyLastGenerator(lastGenerator);
        var latest = generators[lastGenerator];

        //var pathDocusaurus = Path.Combine(this.rootPath, "rscg_examples_site");
        await ModifyDocusaurusTotalExamples(pathDocusaurus, generators.Count);
        await ModifyDocusaurusWithoutExamples(pathDocusaurus);
        ArgumentNullException.ThrowIfNull(_AllDescriptions);
        await Task.WhenAll(_AllDescriptions
            .Where(it=>it.generatedDate > latest.dtStart)
            .Select(it => WroteDocusaurus(it, pathDocusaurus)));
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
        ArgumentNullException.ThrowIfNull(MicrosoftRSCG);
        var output = templateScriban.Render(
            new {nr= _AllDescriptions.Length, all = _AllDescriptions, 
                nrMSFT=MicrosoftRSCG.Length, 
                MSFT=MicrosoftRSCG },
            member => member.Name);
        await File.WriteAllTextAsync(pathIndex, output);
        //now the mermaid 
        
        var templateMermaidText = await File.ReadAllTextAsync("RSCGListMermaid.txt");
        var templateMermaid = Scriban.Template.Parse(templateMermaidText)  ;
        var categs = _AllDescriptions
            .Select(it=>it.GeneratorData?.Category??Category.None)
            .Distinct()
            .Select(it=>it.ToString())
            .OrderBy(it=>it).ToArray();
        var all = _AllDescriptions.OrderBy(it => (it.GeneratorData?.Category ?? Category.None).ToString());
        var categDict=all
            .GroupBy(it=> (it.GeneratorData?.Category ?? Category.None).ToString())
            .ToDictionary(it=>it.Key,it=>it.ToArray());
        //this.MicrosoftRSCG
        foreach (var item in categDict)
        {
            var category = await new CategoryDisplay(item).RenderAsync();
            var inTheSameCategory = await new InTheSameCategory(item).RenderAsync();
            var folder = Path.Combine(pathDocusaurus, "docs", "Categories");
            if(!Directory.Exists(folder))
                Directory.CreateDirectory(folder);
            var pathCategory = Path.Combine(folder, item.Key + ".md");
            await File.WriteAllTextAsync(pathCategory, category);
            pathCategory = Path.Combine(folder, "_Primitive"+item.Key + ".mdx");

            await File.WriteAllTextAsync(pathCategory, inTheSameCategory);

        }
        var outputMermaid = templateMermaid.Render(new { nr = _AllDescriptions.Length,  categs,all,categDict}, 
            memberRenamer:(MemberInfo mi)=> mi.Name);
        var pathIndexMermaid = Path.Combine(pathDocusaurus, "docs", "RSCG-Examples", "index.md");
        await File.WriteAllTextAsync(pathIndexMermaid, outputMermaid);
        var allRSCG = _AllDescriptions.Select(it =>
            new {
                Name = it.Generator?.Name ?? "",
                Link = "https://ignatandrei.github.io/RSCG_Examples/v2/docs/" + it.GeneratorKey,
                NuGet = it.Generator?.NugetFirst ?? "",
                Source = it.Generator?.Source ?? "",
                Category = (it.GeneratorData?.Category ?? Category.None).ToString(),
                AddedOn = (it.generatedDate.ToString("s"))
            }).ToArray();
        var jsonObj = new
        {
            CodeSource = "https://github.com/ignatandrei/RSCG_Examples",
            Site= "https://ignatandrei.github.io/RSCG_Examples/v2/docs/List-of-RSCG",
            All= allRSCG,
        };

        var textJson =JsonSerializer.Serialize(jsonObj,new JsonSerializerOptions()
        {
            WriteIndented = true,
        });
        var jsonPath = Path.Combine(pathDocusaurus, "static","exports");
        await File.WriteAllTextAsync(Path.Combine(jsonPath, "RSCG.json"), textJson);
        var excel = allRSCG.ToExcel(a =>
        {
            a.SheetName("RSCG");
            a.ColumnFilter(x => true);
        });
        await File.WriteAllBytesAsync(Path.Combine(jsonPath,"RSCG.xlsx"), excel);

        return true;
    }
    private void VerifyLastGenerator(string lastGenerator)
    {
        if (string.IsNullOrWhiteSpace(lastGenerator))
        {
            throw new ArgumentException("lastGenerator cannot be null or empty");
        }
        if (generators.Count == 0)
        {
            throw new Exception("no generators found");
        }
        if (!generators.ContainsKey(lastGenerator))
        {
            var generatorsKey = string.Join(",", generators
                .Where(it => it.Value.show)
                .Select(it => it.Key));
            throw new Exception($"cannot find {lastGenerator} in  {generatorsKey}");
        }
    }
    internal async Task WrotePost(string lastGenerator)
    {
        await Task.Delay(1000);
        //var pathDocusaurus = Path.Combine(this.rootPath, "rscg_examples_site");
        ArgumentNullException.ThrowIfNull(_AllDescriptions);
        //var x = 0;
        //x++;
        //if(x>2)
        
        VerifyLastGenerator(lastGenerator);
        var latest = generators[lastGenerator];
        await Task.WhenAll(_AllDescriptions
            .OrderByDescending(it => it.generatedDate)
            .Where(it => it.generatedDate > latest.dtStart)
            //.Take(10)  
            .Select(it => WrotePost(it, pathDocusaurus))
            .ToArray());
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
        var index = Path.Combine(pathDocusaurus, "src", "components", "HomepageFeatures", "index.js");
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
        ArgumentNullException.ThrowIfNull(it.GeneratorData);

        var category = it.GeneratorData.Category;
        var otherDesc  = _AllDescriptions!
            .Where(it=>it.GeneratorData?.Category == category)
            .Where(loop=>loop.Generator?.Name != it.Generator?.Name)
            .OrderBy(it=>it.Generator?.Name)
            .ToArray();
        bool HasFilesGenerated = it?.Data?.outputFiles?.HasFilesGenerated() ?? false;
        var template = await File.ReadAllTextAsync("DocusaurusExample.txt");
        var templateScriban = Scriban.Template.Parse(template);
        var output = templateScriban.Render(new {Description=it,HasFilesGenerated, otherDesc, category}, member => member.Name);
        output = output
            .Replace("[IParsable<TSelf>.TryParse]", "[IParsable&lt;TSelf&gt;.TryParse]")
            .Replace("[ISpanParsable<TSelf>.TryParse]", "[ISpanParsable&lt;TSelf&gt;.TryParse]")
            .Replace("```\r\n</details>\r\n","\r\n\r\n```")
            .Replace("a Result<TTarget> type", "a Result&lt;TTarget&gt; type")
            .Replace("(e.g., Converter<T>)", "(e.g., Converter&lt;T&gt;)")
            .Replace("width=\"400\">", "width=\"400\" />")
            .Replace("<br>","<br />")
            .Replace(" { ", " \\{ ")
            .Replace(" } ", " \\} ")
            .Replace("<column_index>", "&lt;column_index&gt;")
            .Replace("Action<>", "Action&lt;&gt;")
            .Replace("Func<>", "Func&lt;&gt;")
            .Replace("{Type}", "\\{Type}\\}")
            .Replace("{Name}", "\\{Name}\\}")
            .Replace("{PropertyName}", "\\{PropertyName}\\}")
            .Replace("{TypeName}", "\\{TypeName}\\}")
            .Replace("{NameOfProperty}", "\\{NameOfProperty}\\}")
            .Replace("{SingularName}", "\\{SingularName}\\}")
            .Replace("{get}", "\\{get}\\}")

            ;
        string folderToWrite = Path.Combine(pathDocusaurus, "docs", "RSCG-Examples");
        ArgumentNullException.ThrowIfNull(it.Generator);
        string file = it.Generator.Name+ ".md";
        file=Path.Combine(folderToWrite,file);
        bool WriteFile = true;
        if (File.Exists(file))
        {           
            var text = await File.ReadAllTextAsync(file);
            text= text.Replace("\r","").Replace("\n", "");
            var newText = output.Replace("\r", "").Replace("\n", "");
            if(newText == text)
            {
                WriteFile = false;
            }
        }
        if(WriteFile)
            await File.WriteAllTextAsync(file, output);
        //await File.WriteAllTextAsync(Path.Combine(folderToWrite, it.Generator.Name + "_readme.md"), it.OriginalReadme);
         //Console.WriteLine(output);
        await Task.Delay(100);
        return true;
    }

    internal async Task WriteFrontReadMe(DescriptionOld?[] oldDesc)
    {
        oldDesc = oldDesc.Where(ut => ut != null).ToArray();
        var readMe = Path.Combine(rootPath, "..", "README.md");
        var later = Path.Combine(rootPath, "..", "later.md");
        var template = await File.ReadAllTextAsync("frontReadmeNew.txt");
        var templateScriban = Scriban.Template.Parse(template);
        ArgumentNullException.ThrowIfNull(_AllDescriptions);
        ArgumentNullException.ThrowIfNull(MicrosoftRSCG);
        string[] notShow =new[] { old, archived, inspirational, noReadMe };
        var categories = _AllDescriptions
            .Select(it => it.GeneratorData?.Category ?? Category.None)
            .Where(it => it != Category.None)
            .Select(it => it.ToString().ToLower())
            .Distinct()
            .OrderBy(it => it)
            .ToArray();
        var output = templateScriban.Render(
            new {
                nrNoExamples = rscgNoExamples.Length,
                rscgNoExamples = rscgNoExamples.Where(it => !notShow.Contains(it.why)).ToArray(),
                nrOld = rscgNoExamples.Where(it => notShow.Contains(it.why)).Count(),
                rscgNoExamplesOld = rscgNoExamples.Where(it => notShow.Contains(it.why)).ToArray(),
                oldDesc,
                nr = _AllDescriptions.Length,
                all = _AllDescriptions,
                MSFT_RSCG = MicrosoftRSCG,
                MSFT_RSCG_NR = MicrosoftRSCG.Length,
                LatestUpdate = _AllDescriptions.Max(it=>it!.GeneratorData!.dtStart),
                categories,
            },
            member => member.Name); 
        await File.WriteAllTextAsync(readMe, output);

        var templateLater = await File.ReadAllTextAsync("later.txt");
        var templateLaterScriban = Scriban.Template.Parse(templateLater);
        var outputLater = templateLaterScriban.Render(
            new
            {
                nrNoExamples = rscgNoExamples.Length,
                rscgNoExamples = rscgNoExamples.Where(it => !notShow.Contains(it.why)).ToArray(),
                nrOld = rscgNoExamples.Where(it => notShow.Contains(it.why)).Count(),
                rscgNoExamplesOld = rscgNoExamples.Where(it => it.why == "later").ToArray(),
                oldDesc,
                nr = _AllDescriptions.Length,
                all = _AllDescriptions,
                MSFT_RSCG = MicrosoftRSCG,
                MSFT_RSCG_NR = MicrosoftRSCG.Length,
                LatestUpdate = _AllDescriptions.Max(it => it!.GeneratorData!.dtStart),
                categories,
            },
            member => member.Name);
        await File.WriteAllTextAsync(later, outputLater);


    }


    internal async Task<long> GenerateMSFT()
    {
        string folderMSFT = Path.Combine(rootPath, "rscg_examples","Microsoft");
        await BuildProject(Path.Combine(folderMSFT, "src"));
        ByMicrosoft msft = new(folderMSFT);
        ArgumentNullException.ThrowIfNull(_AllDescriptions);
        this.MicrosoftRSCG = await msft.Search(this._AllDescriptions);
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

    internal async Task WriteAllIntoFile(string fileName)
    {
        ArgumentNullException.ThrowIfNull(_AllDescriptions);
        
        StringBuilder sb = new ();
        sb.AppendLine("Nr,Key,Source,Category"); 
        foreach (var it in _AllDescriptions)
        {
            ArgumentNullException.ThrowIfNull(it);
            ArgumentNullException.ThrowIfNull(it.Generator);
            ArgumentNullException.ThrowIfNull(it.GeneratorData);
            sb.AppendLine($"{it.Nr},{it.GeneratorKey}, {it.Generator.Source},{it.GeneratorData.Category}");
        }
        await File.WriteAllTextAsync(fileName,sb.ToString());
    }

    internal async Task WriteVideo()
    {
        ArgumentNullException.ThrowIfNull(_AllDescriptions);
        await Task.WhenAll(_AllDescriptions.Select(it => WriteVideo(it)));


    }
    internal async Task WriteCodeTour()
    {
        ArgumentNullException.ThrowIfNull(_AllDescriptions);
        await Task.WhenAll(_AllDescriptions.Select(it => WriteCodeTour(it)));


    }

    private async Task WriteVideo(Description it)
    {
        VideoScenario vid = new VideoScenario(it);
        try
        {
            var data = await vid.RenderAsync();
            var nameFile = Path.Combine(it.rootFolder!, "video.json");
            await File.WriteAllTextAsync(nameFile, data);
        }
        catch(Exception ex)
        {
            Console.WriteLine("2.error for " + it.Generator?.Name??"" + " " + ex.Message);
        }
    }

    private async Task WriteCodeTour(Description it)
    {
        TourScenario tour = new TourScenario(it);
        try
        {
            var data = await tour.RenderAsync();
            var toursFolder = Path.Combine(it.Data!.outputFiles!.FolderWithSln!,".tours");
            if(!Directory.Exists(toursFolder))
                Directory.CreateDirectory(toursFolder); 

            var nameFile = Path.Combine(toursFolder, it.Generator!.Name + ".tour");
            await File.WriteAllTextAsync(nameFile, data);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"1.error {ex.Message} for " + (it.Generator?.Name ?? "") + "-->" + ex.StackTrace);
        }
    }
}     