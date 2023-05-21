// See https://aka.ms/new-console-template for more information
using AMS_Base;

Console.WriteLine("Hello, World!");

var amsAll = AboutMySoftware.AllDefinitions;
Console.WriteLine("Number definitions:" + amsAll?.Length);
foreach (var amsKV in amsAll)
{
    var ams = amsKV.Value;

    Console.WriteLine($"{amsKV.Key}.{nameof(ams.AssemblyName)} : {ams.AssemblyName}");
    Console.WriteLine($"{amsKV.Key}.{nameof(ams.DateGenerated)} : {ams.DateGenerated}");
    Console.WriteLine($"{amsKV.Key}.{nameof(ams.CommitId)} : {ams.CommitId}");
    Console.WriteLine($"{amsKV.Key}.{nameof(ams.RepoUrl)} : {ams.RepoUrl}");
    Console.WriteLine($"{amsKV.Key}.{nameof(ams.CISourceControl)} : {ams.CISourceControl}");
    Console.WriteLine($"{amsKV.Key}.{nameof(ams.Authors)} : {ams.Authors}");
    Console.WriteLine($"{amsKV.Key}.{nameof(ams.Version)} : {ams.Version}");
    Console.WriteLine($"{amsKV.Key}.{nameof(ams.User)} : {ams.User}");
    Console.WriteLine("versions" + ams.Versions?.Length);
    if (ams.Versions != null)
        foreach (var item in ams.Versions)
        {
            Console.WriteLine("release:" + item.Name);
            foreach (var merge in item.releaseDatas)
            {
                Console.WriteLine("=>merge:" + merge.Subject);
            }

        }
}

