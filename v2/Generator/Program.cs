using Generator;
using System.Runtime.InteropServices;

//var t = Task.FromResult(2);
//var x = new TaskWithData<string, int>("asd", t);
//var a = await x;
//if (a.res == 2)
//{
//    Console.WriteLine("asdasd");
//    return;
//}

var t = Task.FromResult(2);
var x = new TaskWithData<string, int>("asd", t);
var y = new TaskWithData<string, int>("asd1", Task.FromResult(7));
var x1=await x;
var y1=await y;

//var a = await Task.WhenAll(x, y);
//if (a.res == 2)
//{
//    Console.WriteLine("asdasd");
//    return;
//}
try
{
    string originalFolder = @"C:\test\RSCG_Examples";
    if (!Directory.Exists(originalFolder))
    {
        originalFolder = @"C:\gth\RSCG_Examples";
    }
    Console.WriteLine("New generator?(press enter for none)");
    var newGen =  Console.ReadLine();
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
    ArgumentNullException.ThrowIfNull(oldDesc);
    oldDesc = oldDesc
        .Where(it=>it !=null)
        .Select((desc, i) =>
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
    long nr = await m.GenerateMSFT();
    Console.WriteLine("RSCG used by MSFT :"+nr);
    await m.GatherData();
    await m.GrabDescriptionFromNuget();
    await m.GrabReadMe();

    //await m.WrotePost();     
    await m.WroteDocusaurusAll();

    await m.WriteFrontReadMe(oldDesc);
    //int x = 1;
    //if (x == 1)
    //    throw new ArgumentException("test");

    Console.WriteLine("npm run build");
    Console.WriteLine("npm run serve");
    Console.WriteLine("Zip, image, html, pdf : y/n");
    if (Console.ReadLine() == "y")
    {
        //await m.WrotePost();
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
