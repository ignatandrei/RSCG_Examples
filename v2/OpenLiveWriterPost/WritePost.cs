using OpenLiveWriter.Extensibility.BlogClient;
using OpenLiveWriter.Extensibility.ImageEditing;

namespace OpenLiveWriterPost;
public static class WritePost
{
    public static void GeneratePostFromHtml(string name, string html)
    {
        var draftsFolder1 = GetOpenLiveWriterDraftsFolder();
        var post1 = new BlogPost
        {
            Id = Guid.NewGuid().ToString("D"),
            Title = name,
            DatePublished = DateTime.Now.AddDays(10),
            DatePublishedOverride = DateTime.Now.AddDays(10),
            Contents = html,
            //Categories = [ "Programming", "C#", "Blogging" ],
        };
        // Save the post
        var safeTitle = SanitizeFileName(post1.Title);
        var fileName1 = $"{safeTitle}.wpost";
        var filePath1 = Path.Combine(draftsFolder1, fileName1);
        
        if(File.Exists(filePath1)) File.Delete(filePath1);

        Console.WriteLine($"Creating hardcoded blog post {filePath1}");
        
        OpenLiveWriterPostGenerator.SavePost(post1, filePath1);

    }
    static string SanitizeFileName(string? name)
    {
        var sanitizedName = (name ?? string.Empty).Trim();
        foreach (var invalidChar in Path.GetInvalidFileNameChars())
        {
            sanitizedName = sanitizedName.Replace(invalidChar, '_');
        }

        return string.IsNullOrWhiteSpace(sanitizedName) ? "untitled" : sanitizedName;
    }
    static string GetOpenLiveWriterDraftsFolder()
    {
        // OpenLive Writer drafts are typically stored in:
        // %USERPROFILE%\Documents\My Weblog Posts\Drafts
        // or
        // %LOCALAPPDATA%\OpenLiveWriter\Drafts

        var userProfile = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
        var documentsPath = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
        var localAppData = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);

        // Try different possible locations for OpenLive Writer drafts
        var possiblePaths = new[]
        {
            Path.Combine(documentsPath, "My Weblog Posts", "Drafts"),
            Path.Combine(localAppData, "OpenLiveWriter", "Drafts"),
            Path.Combine(userProfile, "Documents", "My Weblog Posts", "Drafts"),
            Path.Combine(localAppData, "Open Live Writer", "Drafts")
        };

        foreach (var path in possiblePaths)
        {
            if (Directory.Exists(path))
            {
                Console.WriteLine($"Using existing OpenLive Writer drafts folder: {path}");
                return path;
            }
        }

        // If none exist, create the default one
        var defaultPath = Path.Combine(documentsPath, "My Weblog Posts", "Drafts");
        Console.WriteLine($"Creating OpenLive Writer drafts folder: {defaultPath}");
        Directory.CreateDirectory(defaultPath);
        return defaultPath;
    }
}
