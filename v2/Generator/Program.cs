try
{
    //var m1 = new MultiGenerator(@"C:\test\RSCG_Examples\v1");
    //var a = await m1.AllDescriptions();

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

    string folder = @"C:\test\RSCG_Examples\v2";
    var m = new MultiGeneratorV2(folder);
    await m.GatherData();
    
    await m.WroteDocusaurus();
    await m.WrotePost(); 
    Console.WriteLine("npm run build");
    Console.WriteLine("npm run serve");
    Console.WriteLine("y/n");
    if (Console.ReadLine() == "y")
    {
        await m.CreateZip();
        await m.WrotePDF();
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
}
