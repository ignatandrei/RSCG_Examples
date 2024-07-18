
using Pekspro.BuildInformationGenerator;

namespace BuildInfo;
[BuildInformation(AddBuildTime = true, 
    AddGitCommitId = true,
    AddAssemblyVersion = true,
    AddDotNetSdkVersion = true,
    AddGitBranch = true,
    AddLocalBuildTime= true,
    AddOSVersion = true,    
    FakeIfDebug =false,
    FakeIfRelease =false)]
partial class MyBuildInfo
{
}
