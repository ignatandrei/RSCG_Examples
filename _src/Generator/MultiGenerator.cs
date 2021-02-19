using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace Generator
{
    class MultiGenerator
    {
        string[] generators;
        private readonly string rootPath;
        private Description[] _AllDescriptions = null;

        
        public MultiGenerator(string root)
        {
            generators = new string[]
            {
                "ApplicationVersion",
                "Enum",
                "JsonToClass",
                "CopyConstructor",
                "DTOMapper",
                "SkinnyControllers",
                "DP_Builder"
            };
            this.rootPath = root;
        }
        private async Task<Description[]> AllDescriptions()
        {
            if (_AllDescriptions != null)
                return _AllDescriptions;
            var ss = new SemaphoreSlim(1, 1);
            await ss.WaitAsync();
            
            if (_AllDescriptions != null)
                return _AllDescriptions;

            _AllDescriptions = await Task.WhenAll(generators.Select(async it => await Generate(it)).ToArray());
            return _AllDescriptions;
            
        }
        public async Task GeneratePost()
        {
            var gen = await AllDescriptions();
            var posts = gen.Select(async it => await GeneratePost(it)).ToArray();

            await Task.WhenAll(posts);
            

        }
        public async Task GenerateReadMeForEach()
        {
            var gen = await AllDescriptions();

            var posts = gen.Select(async it => await GenerateReadMe(it)).ToArray();

            await Task.WhenAll(posts);


        }

        public async Task GenerateFrontReadMe()
        {
            var gen = await AllDescriptions();
            var templatePost = await File.ReadAllTextAsync("frontReadme.txt");
            var templateScriban = Scriban.Template.Parse(templatePost);
            var output = templateScriban.Render(new { all = gen }, member => member.Name);
            string readMe = Path.Combine(rootPath,  "readme.md");
            await File.WriteAllTextAsync(readMe, output);

        }

        private async Task<Description> Generate(string rootFolder)
        {
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
