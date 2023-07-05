using System.Runtime.CompilerServices;

namespace Generator;

internal record FoundFile(string filePath, string csProjPath,string generatedPath)
{
    public int NrFile
    {
        get
        {
            return Math.Abs(NameGenerator.GetHashCode());
        }
    }
    public string NameFileGenerated
    {
        get
        {
            return Path.GetFileName(generatedPath);
        }
    }
    public static string sepShow = "=>";
    public string NameGenerator
    {
        get
        {
            var sep = Path.DirectorySeparatorChar;
            var found = sep + "GX" + sep;
            var whereGX= generatedPath.IndexOf(found);
             
            var endFile = generatedPath.IndexOf(NameFileGenerated);
            var data=generatedPath.Substring(whereGX+found.Length,endFile-whereGX-found.Length);
            
            data = string.Join(sepShow, data.Split(sep));
            if (data.EndsWith(sepShow))
                data = data.Substring(0, data.Length - sepShow.Length);
            return data;
            //var pathFolder=Path.GetDirectoryName(generatedPath);
            //ArgumentNullException.ThrowIfNullOrEmpty(pathFolder);
            //var dir=new DirectoryInfo(pathFolder);
            //if (dir.Exists)
            //{
            //    return dir.Name;
            //}
            //throw new DirectoryNotFoundException(pathFolder);
        }
    }
    public static FoundFile createFoundFile(string searchFolder,string filePath,string nameFileGenerated)//:this(a.filePath,"","")
    {
        
        var filesGenerated = Directory.GetFiles(searchFolder, nameFileGenerated, SearchOption.AllDirectories);
        if(filesGenerated.Length == 0)
        {
            throw new ArgumentException($"Because {filePath} cannot find {nameFileGenerated} on subfolders from {searchFolder}. ");
        }
        string csproj = "";
        var searchDir=Path.GetDirectoryName(filePath);
        ArgumentNullException.ThrowIfNullOrEmpty(searchDir);
        while (true)
        {
            var csprojs = Directory.GetFiles(searchDir, "*.csproj");
            if(csprojs.Length == 1)
            {
                csproj= csprojs[0];
                break;
            }
            searchDir = Path.GetDirectoryName(searchDir);
            ArgumentNullException.ThrowIfNullOrEmpty(searchDir);
        }
        if(csproj.Length == 0)
        {
            throw new ArgumentException($"Because {searchDir} cannot find csproj on upper dirs");

        }
        var ret= new FoundFile(filePath, csproj, filesGenerated[0]);
        
        return ret;
    }
}
internal class ByMicrosoft
{
    internal const string genString = "//Generator:";
    private readonly string searchFolder;

    public ByMicrosoft(string searchFolder)
    {
        this.searchFolder = searchFolder;
    }
    public async Task<FoundFile[]> Search()
    {
        var files=Directory.GetFiles(searchFolder,"*.cs",SearchOption.AllDirectories);
        
        var lstTasks =  files
            .Select(async it =>new {  name = it, lines= await File.ReadAllLinesAsync(it) })
            .ToArray();
        var dataFiles = await Task.WhenAll(lstTasks);
        var dataFilesWithNr1 = dataFiles
            .Select(it =>
            new { it.name, it.lines, line= it.lines.FirstOrDefault(it => it.Contains(genString),"") })            
            .Where(it=>it.line.Length>0)
            .ToArray();

        var dataFilesWithNr2 = dataFiles
            .Select(it =>
            new { it.name, it.lines, line = it.lines.LastOrDefault(it => it.Contains(genString), "") })
            .Where(it => it.line.Length > 0)
            .ToArray();
        var dataFilesWithNr = 
            dataFilesWithNr1.Union(dataFilesWithNr2).ToArray();
        var data = dataFilesWithNr
            .Select(it =>FoundFile.createFoundFile(searchFolder, it.name, it.line.Replace(genString,"").Trim()))
            .ToArray();
        //foreach (var item in data)
        //    Console.WriteLine(item);
        return data;
    }
}
