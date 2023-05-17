

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
            fileFound = fileFound.Where(it => !it.Contains("GX")).ToArray();
            if(fileFound.Length != 1)
            {
                throw new Exception($"must have 1, but {fileFound.Length}  files {file} in {dir}");
            }
            string nameFile = Path.GetFileName(fileFound[0]);
            FileWithContent f = new (nameFile,nameFile, await File.ReadAllTextAsync(fileFound[0]));
            contents.Add(f);
        }
        contentFiles = contents.ToArray();
        
        var outputGenFolder = Directory.GetDirectories(dir, "GX", SearchOption.AllDirectories);
        if (outputGenFolder.Length != 1)
        {
            throw new Exception($"{outputGenFolder.Length} output folders in {dir}");
        }
        string folder = outputGenFolder[0];
        var outputFiles = Directory.GetFiles(folder, "*.cs", SearchOption.AllDirectories);
        contents = new();
        var nr = 0;
        foreach (var file in outputFiles)
        {
            var nameFile = Path.GetFileName(file);
            string id = nameFile + (++nr).ToString("00#");
            FileWithContent f = new(id, nameFile, await File.ReadAllTextAsync(file));
            contents.Add(f);

        }
        generatedFiles = contents.ToArray();

    }
}
