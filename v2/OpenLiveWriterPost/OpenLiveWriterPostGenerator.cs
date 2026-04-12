using OpenLiveWriter.CoreServices;
using OpenLiveWriter.Extensibility.BlogClient;
using OpenLiveWriter.PostEditor;
using System.Reflection;

namespace OpenLiveWriterPost;

internal class OpenLiveWriterPostGenerator
{

    static object LockObject = new object();
    public static void SavePost(BlogPost post, string filePath)
    {
        lock (LockObject)
        {
            SavePostAsStructuredStorage(post, filePath);
        }
    }

    private static void SavePostAsStructuredStorage(BlogPost post, string filePath)
    {
        ApplicationEnvironment.Initialize(Assembly.GetExecutingAssembly(),
                        Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles), @"Windows Live\Writer"));

        PostEditorFile.Initialize();

        string? directoryPath = Path.GetDirectoryName(filePath);
        if (string.IsNullOrEmpty(directoryPath))
        {
            directoryPath = Directory.GetCurrentDirectory();
        }

        DirectoryInfo targetDirectory = new DirectoryInfo(directoryPath);
        string[] existingDrafts = Directory.GetFiles(targetDirectory.FullName, "*.wpost");

        PostEditorFile pef = PostEditorFile.CreateNew(targetDirectory);
        var bef = new BlogPostEditingContext(post.Id, post);
        pef.SaveBlogPost(bef);

        string createdDraftPath = FindCreatedDraftPath(targetDirectory.FullName, existingDrafts);
        if (!string.Equals(createdDraftPath, filePath, StringComparison.OrdinalIgnoreCase))
        {
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }

            File.Move(createdDraftPath, filePath);
        }
    }

    private static string FindCreatedDraftPath(string directoryPath, string[] existingDrafts)
    {
        string[] currentDrafts = Directory.GetFiles(directoryPath, "*.wpost");

        foreach (string currentDraft in currentDrafts)
        {
            bool existedBefore = false;
            foreach (string existingDraft in existingDrafts)
            {
                if (string.Equals(currentDraft, existingDraft, StringComparison.OrdinalIgnoreCase))
                {
                    existedBefore = true;
                    break;
                }
            }

            if (!existedBefore)
            {
                return currentDraft;
            }
        }

        throw new IOException($"Unable to determine the draft file created in '{directoryPath}'.");
    }



}
