using System;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
namespace Generator
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var generators = new string[]
            {
                "ApplicationVersion",
                "Enum",
                "JsonToClass",

            };
            var gen =await Task.WhenAll( generators.Select(async it => await Generate(it)).ToArray());

            var posts = gen.Select(async it => await GeneratePost(it)).ToArray();

            await Task.WhenAll(posts);
        }
        private static async Task GeneratePost(Description desc)
        {
            var templatePost = await File.ReadAllTextAsync("post.txt");
            var templateScriban = Scriban.Template.Parse(templatePost);
            var output = templateScriban.Render(desc, member => member.Name);
            await File.WriteAllTextAsync($"{desc.rootFolder}.html", output);

        }
        private static async Task<Description> Generate(string rootFolder)
        {
            
            string rootPath = @"E:\ignatandrei\RSCG_Examples\";

            var folder = Path.Combine(rootPath, rootFolder);
            var text = await File.ReadAllTextAsync(Path.Combine(folder, "description.json"));
            var desc = JsonSerializer.Deserialize<Description>(text);
            desc.rootFolder = rootFolder;
            return desc;
        }
    }
}
