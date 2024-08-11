

namespace Generator;

public record FileWithContent(string fullPathFile, string file, string content)
{
    public string extension => Path.GetExtension(fullPathFile);
}
