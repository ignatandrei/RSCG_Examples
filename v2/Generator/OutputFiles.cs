

namespace Generator;

public class OutputFiles
{
    public string fullPathToCsproj { get; set; }

    public string ContentCsProj { get;internal set; }
    public string[] csFiles { get; set; }
    public FileWithContent[] contentFiles { get; set; }
    public FileWithContent[] generatedFiles { get; set; }
    public async Task GatherData()
    {
        ContentCsProj = await File.ReadAllTextAsync(fullPathToCsproj);
        var dir=Path.GetDirectoryName(fullPathToCsproj);
        List<FileWithContent> contents = new();
        foreach (var file in csFiles)
        {
            var fileFound = Directory.GetFiles(dir, file, SearchOption.AllDirectories);
            if(fileFound.Length != 1)
            {
                throw new Exception($"multiple files {file} in {dir}");
            }
            FileWithContent f = new (Path.GetFileName(fileFound[0]), await File.ReadAllTextAsync(fileFound[0]));
            contents.Add(f);
        }
        contentFiles = contents.ToArray();
        
        var outputGenFolder = Directory.GetDirectories(dir, "GeneratedX", SearchOption.AllDirectories);
        if (outputGenFolder.Length != 1)
        {
            throw new Exception($"{outputGenFolder.Length} output folders in {dir}");
        }
        var outputFiles = Directory.GetFiles(outputGenFolder[0], "*.cs", SearchOption.AllDirectories);
        contents = new();
        foreach (var file in outputFiles)
        {
            FileWithContent f = new(Path.GetFileName(file), await File.ReadAllTextAsync(file));
            contents.Add(f);

        }
        generatedFiles = contents.ToArray();

    }
}
