using BuildInfo;

Console.WriteLine(MyBuildInfo.Git.CommitId);
Console.WriteLine(MyBuildInfo.Git.Branch);
Console.WriteLine(MyBuildInfo.AssemblyVersionString);
