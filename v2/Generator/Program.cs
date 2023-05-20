using System.Runtime.InteropServices;

try
{
    string originalFolder = @"C:\test\RSCG_Examples";
    Console.WriteLine("New generator?(press enter for none)");
    var newGen = Console.ReadLine();
    if (!string.IsNullOrWhiteSpace(newGen))
    {

        var f = Path.Combine(originalFolder, "v2");
        var staticWeb= Path.Combine(f, "rscg_examples_site", "static");
        await File.WriteAllTextAsync(Path.Combine(staticWeb, "pdfs", $"{newGen}.pdf"), "");
        await File.WriteAllTextAsync(Path.Combine(staticWeb, "sources", $"{newGen}.zip"), "");
        var examples = Path.Combine(f, "rscg_examples", newGen);
        Directory.CreateDirectory(examples);
        Directory.CreateDirectory(Path.Combine(examples,"src"));
        await File.WriteAllTextAsync(Path.Combine(examples,"description.json"), 
$$"""
{
   "generator":{
      "name":"{{newGen}}",
      "nuget":[
         "https://www.nuget.org/packages/{{newGen}}/"
      ],
      "link":"",
      "author":"",
      "source":""
   },
   "data":{
      "goodFor":[""],
      "csprojDemo":"{{newGen}}Demo.csproj",
      "csFiles":["Program.cs"]
   },
   "links":{
      "blog":"",
      "video":""
   }
}
""");
        return;
    }
    
    Console.WriteLine("generating data");
    var old = new MultiGenerator(Path.Combine(originalFolder,"v1"));
    var oldDesc = await old.AllDescriptions();
    oldDesc = oldDesc.Select((desc, i) =>
    {
        if(desc != null) desc.Nr = i;
        return desc;
    }).ToArray();
    //var text = a
    //    .Select((desc, i) =>
    //    { 
    //        if(desc==null)
    //            return string.Empty;

    //        var bookmark = desc.Generator.Name.ToLower();
    //        bookmark = bookmark.Replace(" + ", "--");
    //        bookmark = bookmark.Replace(" ", "-");
    //        return $"|{i + 1}| [{desc.Generator.Name}]({desc.Generator.Nuget.First()}) | [v1]( https://ignatandrei.github.io/RSCG_Examples/v1/#rscg-number-{i+1}--{bookmark}) |";       
    //    })
    //    .Where(it=>it!=null)
    //    .ToArray();
    //var c=string.Join(Environment.NewLine, text);
    //if (a.Length>0)
    //    return;

    string folder = Path.Combine(originalFolder,"v2");
    var m = new MultiGeneratorV2(folder);
    await m.GatherData();

    if (await m.WroteDocusaurusAll()) return;
    
    //await m.WrotePost();
    await m.WriteFrontReadMe(oldDesc);
    Console.WriteLine("npm run build");
    Console.WriteLine("npm run serve");
    Console.WriteLine("y/n");
    //if (Console.ReadLine() == "y")
    {
        await m.CreateZip();
        await m.CreateImageFiles();
        await m.CreateHTMLBook();
        await m.WrotePDFs();
    }
    //var m = new MultiGenerator(folder);

    //await m.GeneratePost();
    //await m.GenerateReadMeForEach();
    //await m.GenerateFrontReadMe();
    //await m.GenerateForImages(Path.Combine(folder, "docs", "images"));
    //await m.GenerateForEmail();
}
catch (Exception ex) 
{
    Console.WriteLine("!!!!" + ex.Message);
    Console.WriteLine("!!!!" + ex.StackTrace);
}
