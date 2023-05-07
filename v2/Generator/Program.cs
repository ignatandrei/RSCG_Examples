try
{
    string folder = @"C:\Users\Surface1\Documents\GitHub\RSCG_Examples\v2";
    var m = new MultiGeneratorV2(folder);
    await m.GatherData();
    await m.WroteDocusaurus();
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
