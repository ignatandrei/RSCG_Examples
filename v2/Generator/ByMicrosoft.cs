using System.Runtime.CompilerServices;

namespace Generator;
internal class ByMicrosoft
{
    internal const string genString = "//Generator:";
    private readonly string searchFolder;
    private FoundFile[]? cache=null;

    public ByMicrosoft(string searchFolder)
    {
        this.searchFolder = searchFolder;
    }
    public async Task<long> WriteFiles(string folderExamples)
    {
        var data = (await Search()).ToList();
        data.Sort((a, b) => a.NameGenerator.CompareTo(b.NameGenerator));

        string folderWithDocs = Path.Combine(folderExamples,  "docs", "Microsoft");
        foreach (var ff in data)
        {
            var item = new ItemMSFT(ff);
            var fileContents = await item.RenderAsync();
            var nameFile = Path.Combine(folderWithDocs, ff.NameGenerator.Replace(FoundFile.sepShow, "_"));
            nameFile += ".md";
            //Console.WriteLine(nameFile);
            await File.WriteAllTextAsync(nameFile, fileContents);
        }
        return data.Count;
    }
    private async Task<FoundFile[]> fromFiles(string[] files)
    {
        var lstTasks = files
            .Select(async it => new { name = it, lines = await File.ReadAllLinesAsync(it) })
            .ToArray();
        var dataFiles = await Task.WhenAll(lstTasks);
        var dataFilesWithNr1 = dataFiles
            .Select(it =>
            new { it.name, it.lines, line = it.lines.FirstOrDefault(it => it.Contains(genString), "") })
            .Where(it => it.line.Length > 0)
            .ToArray();

        var dataFilesWithNr2 = dataFiles
            .Select(it =>
            new { it.name, it.lines, line = it.lines.LastOrDefault(it => it.Contains(genString), "") })
            .Where(it => it.line.Length > 0)
            .ToArray();
        var dataFilesWithNr =
            dataFilesWithNr1.Union(dataFilesWithNr2).ToArray();
        var data = dataFilesWithNr
            .Select(it => FoundFile.createFoundFile(searchFolder, it.name, it.line.Replace(genString, "").Trim()))
            .ToArray();

        return data;
    }
    public async Task<FoundFile[]> Search()
    {
        if (cache != null)
            return cache;

        var files=Directory.GetFiles(searchFolder,"*.cs",SearchOption.AllDirectories);
        var data1 = await fromFiles(files);

        files = Directory.GetFiles(searchFolder, "*.razor", SearchOption.AllDirectories);
        var data2 = await fromFiles(files);

        cache = data1.Union(data2).ToArray();
        return cache;
    }
}
