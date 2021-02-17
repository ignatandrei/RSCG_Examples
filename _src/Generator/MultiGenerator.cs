using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Generator
{
    class MultiGenerator
    {
        string[] generators;
        private readonly string rootPath;

        public MultiGenerator(string root)
        {
            generators = new string[]
            {
                "ApplicationVersion",
                "Enum",
                "JsonToClass",
            };
            this.rootPath = root;
        }
        public async Task GeneratePost()
        {
            var gen = await Task.WhenAll(generators.Select(async it => await Generate(it)).ToArray());

            var posts = gen.Select(async it => await GeneratePost(it)).ToArray();

            await Task.WhenAll(posts);
            

        }
        public async Task GenerateReadMe()
        {
            var gen = await Task.WhenAll(generators.Select(async it => await Generate(it)).ToArray());

            var posts = gen.Select(async it => await GenerateReadMe(it)).ToArray();

            await Task.WhenAll(posts);


        }

        private async Task<Description> Generate(string rootFolder)
        {

            //string rootPath = @"E:\ignatandrei\RSCG_Examples\";/**/

            var folder = Path.Combine(rootPath, rootFolder);
            var text = await File.ReadAllTextAsync(Path.Combine(folder, "description.json"));
            var desc = JsonSerializer.Deserialize<Description>(text);
            desc.rootFolder = rootFolder;
            return desc;
        }
        private async Task GenerateReadMe(Description desc)
        {
            var templatePost = await File.ReadAllTextAsync("readme.txt");
            var templateScriban = Scriban.Template.Parse(templatePost);
            var output = templateScriban.Render(desc, member => member.Name);
            string readMe = Path.Combine(rootPath, desc.rootFolder,"readme.md");
            await File.WriteAllTextAsync(readMe, output);

        }
        private async Task GeneratePost(Description desc)
        {
            var templatePost = await File.ReadAllTextAsync("post.txt");
            var templateScriban = Scriban.Template.Parse(templatePost);
            var output = templateScriban.Render(desc, member => member.Name);
            await File.WriteAllTextAsync($"{desc.rootFolder}.html", output);

        }

    }
}
