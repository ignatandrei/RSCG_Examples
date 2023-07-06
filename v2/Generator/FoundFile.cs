namespace Generator;

internal record FoundFile(string filePath, string csProjPath,string generatedPath)
{
    public int NrFile
    {
        get
        {
            var nr =NameGenerator.ToCharArray().Select(it => (int)it).Sum();
            return nr;
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
