using OpenLiveWriter.CoreServices;
using OpenLiveWriter.Extensibility.BlogClient;
using OpenLiveWriter.PostEditor;
using System.Reflection;

namespace OpenLiveWriterPost;

internal class OpenLiveWriterPostGenerator
{


    public static void SavePost(BlogPost post, string filePath)
    {
        SavePostAsStructuredStorage(post, filePath);
    }

    private static void SavePostAsStructuredStorage(BlogPost post, string filePath)
    {
        ApplicationEnvironment.Initialize(Assembly.GetExecutingAssembly(),
                        Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles), @"\Windows Live\Writer\"));

        PostEditorFile.Initialize();

        PostEditorFile pef = PostEditorFile.CreateNew(new DirectoryInfo(Path.GetDirectoryName(filePath)));
        var bef = new BlogPostEditingContext(post.Id, post);
        pef.SaveBlogPost(bef);
    }



}
