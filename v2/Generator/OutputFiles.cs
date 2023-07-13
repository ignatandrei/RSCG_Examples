

using System.Xml;

namespace Generator;

public class OutputFiles
{
    public string? fullPathToCsproj { get; set; }

    public string? ContentCsProj { get;internal set; }
    public string[]? csFiles { get; set; }
    public FileWithContent[]? contentFiles { get; set; }
    public FileWithContent[]? generatedFiles { get; set; }
    public int LineInCSproj;
    public string ScribanLineInCSproj
    {
        get
        {
            return "{" + (LineInCSproj + 1) + "}";
        }
    }

    public async Task GatherData(string nuget)
    {
        var excludedProjectsWithLine = new[]{
            "DemoRegex.csproj",
            "DemoSerializeJSON.csproj",
            "LibraryImportDemo.csproj"
        };
        ArgumentNullException.ThrowIfNull(fullPathToCsproj);
        ContentCsProj = await File.ReadAllTextAsync(fullPathToCsproj);
        if(!string.IsNullOrWhiteSpace(nuget))
        if (!excludedProjectsWithLine.Any(it => fullPathToCsproj.Contains(it)))
        {


            LineInCSproj = ContentCsProj
                .Split("\n")
                .Select((it, i) => new { it, i })
                .Where(it => it.it.Contains(nuget,StringComparison.InvariantCultureIgnoreCase))
                .Select(a => a.i)
                .FirstOrDefault();

            //DemoSerializeJSON has .net core inside
            if (LineInCSproj == 0)
            {
                throw new ArgumentException($"cannot find {nuget} nuget in {fullPathToCsproj}");
            }
        }
        var dir =Path.GetDirectoryName(fullPathToCsproj);
        ArgumentNullException.ThrowIfNull(dir);
        List <FileWithContent> contents = new();
        ArgumentNullException.ThrowIfNull(csFiles);
        foreach (var file in csFiles)
        {
            var fileFound = Directory.GetFiles(dir, file, SearchOption.AllDirectories);
            fileFound = fileFound.Where(it => !it.Contains("GX")).ToArray();
            if(fileFound.Length != 1)
            {
                throw new Exception($"must have 1, but {fileFound.Length}  files {file} in {dir}");
            }
            string nameFile = Path.GetFileName(fileFound[0]);
            FileWithContent f = new(fileFound[0],nameFile, await File.ReadAllTextAsync(fileFound[0]));
            contents.Add(f);
        }
        contentFiles = contents.ToArray();
        
        var outputGenFolder = Directory.GetDirectories(dir, "GX", SearchOption.AllDirectories);
        if (outputGenFolder.Length != 1)
        {
            throw new Exception($"{outputGenFolder.Length} output folders in {dir}");
        }
        string folder = outputGenFolder[0];
        //var generators = Directory.GetDirectories(folder);
        //if (generators.Length > 1)
        //{
        //    generators = generators.Where(it => it != "Microsoft.NET.Sdk.Razor.SourceGenerators").ToArray();
        //    if (generators.Length > 1) { 
        //        throw new ArgumentException($"more than 1 generated folder for {folder}");
        //    }
        //}
        var outputFiles = Directory.GetFiles(folder, "*.cs", SearchOption.AllDirectories);
        
        contents = new();
        var nr = 0;
        foreach (var file in outputFiles)
        {
            var nameFile = Path.GetFileName(file);
            string id = nameFile + (++nr).ToString("00#");
            FileWithContent f = new(file, nameFile, await File.ReadAllTextAsync(file));
            contents.Add(f);

        }
        generatedFiles = contents.ToArray();

    }
}
