using System;
using System.Collections.Generic;
using System.Diagnostics;
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
                "DP_Builder",
                "MetadataFromObject",
                "DynamicMocking",
                "MethodDecorator",
                "PartiallyFunction",
                "IFormattable",
                "DP_Decorator",
                "PropertyExpressionGenerator",
                "TemplateRender",
                "CI_Version",
                "HttpClientCodeGenerator",
                "QueryGenerator",
                "AutoRegister",
                "TinyTypes"
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
        public async Task GenerateForEmail()
        {
            var gen = await AllDescriptions();
            var posts = gen
                .Where(it=>!it.Generator.Author.Contains("gnat"))
                .Select(async it => await GenerateEmail(it))
                .ToArray();
            await Task.WhenAll(posts);

        }

        private async Task GenerateEmail(Description desc)
        {
            
            var templatePost = await File.ReadAllTextAsync("email.txt");
            var templateScriban = Scriban.Template.Parse(templatePost);
            var output = templateScriban.Render(desc, member => member.Name);
            string email = Path.Combine(rootPath, desc.rootFolder, "email.txt");
            await File.WriteAllTextAsync(email, output);
            //Process.Start("notepad.exe",email);

        }

        public async Task GenerateReadMeForEach()
        {
            var gen = await AllDescriptions();

            var posts = gen.Select(async (it,i) => await GenerateReadMe(it,i)).ToArray();

            await Task.WhenAll(posts);


        }
        public int GenerateCSPROJ(string folder, string rootDesc)
        {
            var f = Directory.GetFiles(rootDesc, "*.csproj", SearchOption.AllDirectories);
            f = f
                    .Where(it => !it.Contains("MatOps.csproj"))
                    .Where(it => !it.Contains("AMSExample.csproj"))
                    .Where(it => !it.Contains("HttpClientTestWebSite.csproj"))
                    .Where(it => !it.Contains("BL.csproj"))
                    .Where(it=> !it.Contains("TinyConsole.csproj"))
               .ToArray();
            switch (f.Length)
            {
                case 1:
                    var name = Path.GetFileName(f[0]);
                    name = "The.csproj";
                    File.Copy(f[0], Path.Combine(folder, name),true);
                    break;
                default:
                    throw new ArgumentException("more csproj at " + rootDesc);
            }
            return f.Length;
        }
        public async Task GenerateForImages(string folder)
        {
            var gen = await AllDescriptions();

            var files = gen.Select(async (it, i) => await GenerateFiles(Path.Combine(folder,it.Generator.Name) ,it.Data)).ToArray();

            await Task.WhenAll(files);
            var csproj = gen.Select(it => GenerateCSPROJ(Path.Combine(folder, it.Generator.Name), Path.Combine(rootPath, it.rootFolder))).ToArray();


        }
        private async Task GenerateFiles(string folder, Data d)
        {
            if (!Directory.Exists(folder))
                Directory.CreateDirectory(folder);
            var nl = Environment.NewLine;
            string filePath = "";
            filePath = Path.Combine(folder, "GeneratedCode.cs");
            

            var f1 = File.WriteAllTextAsync(Path.Combine(folder, "GeneratedCode.cs"), string.Join(nl, d.GeneratedCode));
            var f2 = File.WriteAllTextAsync(Path.Combine(folder, "ExistingCode.cs"), string.Join(nl, d.ExistingCode));
            var f3 = File.WriteAllTextAsync(Path.Combine(folder, "Usage.cs"), string.Join(nl, d.Usage));

            await Task.WhenAll(f1, f2, f3);
        }
        public async Task GenerateFrontReadMe()
        {
            var gen = await AllDescriptions();
            var templatePost = await File.ReadAllTextAsync("frontReadme.txt");
            var templateScriban = Scriban.Template.Parse(templatePost);
            string other_roslyn = await File.ReadAllTextAsync(@"E:\ignatandrei\RSCG_Examples\book\others.md");
            var output = templateScriban.Render(new { all = gen, other_roslyn }, member => member.Name);
            string readMe = Path.Combine(rootPath,  "readme.md");
            await File.WriteAllTextAsync(readMe, output);

        }

        private async Task<Description> Generate(string rootFolder)
        {
            var folder = Path.Combine(rootPath, rootFolder);
            var text = await File.ReadAllTextAsync(Path.Combine(folder, "description.json"));
            var desc = JsonSerializer.Deserialize<Description>(text);
            desc.rootFolder = rootFolder;
            var auth = Path.Combine(folder, "author.md");
            if (File.Exists(auth))
            {
                desc.HaveAuthorAnswered = true;
                desc.authorMD = await File.ReadAllTextAsync(auth);
            }
            return desc;
        }
        private async Task GenerateReadMe(Description desc,int nr )
        {
            desc.Nr = nr;
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
