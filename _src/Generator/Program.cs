using System;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
namespace Generator
{
    class Program
    {
        static async Task Main(string[] args)
        {
            
            
            var templatePost = await File.ReadAllTextAsync("post.txt");
            string rootPath = @"E:\ignatandrei\RSCG_Examples\";
            string rootFolder = "JsonToClass";// "Enum";
            var folder =Path.Combine(rootPath, rootFolder); 
            var text = await File.ReadAllTextAsync(Path.Combine(folder, "description.json"));
            var desc= JsonSerializer.Deserialize<Description>(text);
            desc.rootFolder = rootFolder;
            var templateScriban = Scriban.Template.Parse(templatePost);
            var output = templateScriban.Render(desc, member => member.Name);
            await File.WriteAllTextAsync("a.html", output);
            
        }
    }
}
