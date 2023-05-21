---
sidebar_position: 100
title: 10 - RSCG_AMS
description: Automatically registering the version, ci, commit id
slug: /RSCG_AMS
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# RSCG_AMS  by Ignat Andrei

<!---
<TOCInline toc={toc} />
-->
[![Nuget](https://img.shields.io/nuget/dt/RSCG_AMS?label=RSCG_AMS)](https://www.nuget.org/packages/RSCG_AMS/)
[![GitHub last commit](https://img.shields.io/github/last-commit/ignatandrei/RSCG_AMS?label=updated)](https://github.com/ignatandrei/RSCG_AMS)
![GitHub Repo stars](https://img.shields.io/github/stars/ignatandrei/RSCG_AMS?style=social)

## Details

### Info
:::info

Name: **RSCG_AMS**

Author: Ignat Andrei

NuGet: 
*https://www.nuget.org/packages/RSCG_AMS/*   


You can find more details at https://github.com/ignatandrei/RSCG_AMS

Source : https://github.com/ignatandrei/RSCG_AMS
:::

### About
:::note

Automatically registering the version, ci, commit id


:::

## How to use

### Example ( source csproj, source files )

<Tabs>

<TabItem value="csproj" label="CSharp Project">

This is the CSharp Project that references **RSCG_AMS**
```xml showLineNumbers {15}
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net7.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
  <ItemGroup>
    <PackageReference Include="AMS_Base" Version="2023.5.21.1551" />
    <PackageReference Include="RSCG_AMS" Version="2023.5.21.1551" ReferenceOutputAssembly="false" OutputItemType="Analyzer" />
  </ItemGroup>

</Project>

```

</TabItem>

  <TabItem value="C:\test\RSCG_Examples\v2\rscg_examples\RSCG_AMS\src\RSCG_AMSDemo\Program.cs" label="Program.cs" >

  This is the use of **RSCG_AMS** in *Program.cs*

```csharp showLineNumbers 
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


```
  </TabItem>

  <TabItem value="C:\test\RSCG_Examples\v2\rscg_examples\RSCG_AMS\src\RSCG_AMSDemo\globals.cs" label="globals.cs" >

  This is the use of **RSCG_AMS** in *globals.cs*

```csharp showLineNumbers 
[assembly: AMS_Base.VersionReleased(Name = "WithVersioning", ISODateTime = "2022-04-02", recordData = AMS_Base.RecordData.Merges)]
[assembly: AMS_Base.VersionReleased(Name = "FutureRelease", ISODateTime = "9999-04-16", recordData = AMS_Base.RecordData.Merges)]

```
  </TabItem>

</Tabs>

### Generated Files

Those are taken from $(BaseIntermediateOutputPath)\GX

<Tabs>


<TabItem value="C:\test\RSCG_Examples\v2\rscg_examples\RSCG_AMS\src\RSCG_AMSDemo\obj\GX\AMS\AMS.AMSVersionIncremental\RSCG_AMSDemo.cs" label="RSCG_AMSDemo.cs" >


```csharp showLineNumbers 
using System;
using AMS_Base;
namespace RSCG_AMSDemo { 
    /// <summary>
    /// this is the About My Software for 828469749970839076110119122
    /// </summary>
    public class XAboutMySoftware_828469749970839076110119122 :AboutMySoftware {
        /// <summary>
        /// starts when this module is loaded and 
        /// add the AMS tot the 
        /// </summary>
        [System.Runtime.CompilerServices.ModuleInitializer]
        public static void Add_AboutMySoftware_828469749970839076110119122(){
            AboutMySoftware.AddDefinition("RSCG_AMSDemo",new  XAboutMySoftware_828469749970839076110119122());      
        }
        /// <summary>
        /// constructor
        /// for AMS 828469749970839076110119122
        /// </summary>
        public XAboutMySoftware_828469749970839076110119122(){
            AssemblyName ="RSCG_AMSDemo" ; 
            DateGenerated = DateTime.ParseExact("20230521152410", "yyyyMMddHHmmss", null); 
            CommitId  = "not in a CI run" ; 
            RepoUrl ="https://ignatandrei.github.io/RSCG_AMS/runtimeMessages/NotFound.md" ; 
            CISourceControl = "not in a CI run" ; 
            SourceCommit = "https://ignatandrei.github.io/RSCG_AMS/runtimeMessages/NotFound.md" ; 
            Authors= "";
            Version= "";    
            EnvironmentVars =";User_Path;User_TEMP;User_OneDrive;User_OneDriveConsumer;User_OneDriveCommercial;User_POSH_THEMES_PATH;User_TMP;User_R_HOME;User_ChocolateyLastPathUpdate;Process_OneDriveConsumer;Process_ProgramFiles(x86);Process_ProgramW6432;Process_windir;Process_ChocolateyInstall;Process_PROCESSOR_IDENTIFIER;Process_POWERSHELL_DISTRIBUTION_CHANNEL;Process_TMP;Process_PROCESSOR_ARCHITECTURE;Process_Path;Process_PkgDefApplicationConfigFile;Process_USERPROFILE;Process_VisualStudioDir;Process_PROCESSOR_REVISION;Process_ChocolateyLastPathUpdate;Process_FPS_BROWSER_APP_PROFILE_STRING;Process_FPS_BROWSER_USER_PROFILE_STRING;Process_LOGONSERVER;Process_TEMP;Process_USERNAME;Process_SystemRoot;Process_VSSKUEDITION;Process_MSMPI_BIN;Process_OneDrive;Process_LOCALAPPDATA;Process_CommonProgramFiles;Process_R_HOME;Process_ProgramData;Process_VS_Perf_Session_GCHeapCount;Process_VSAPPIDDIR;Process_HOMEPATH;Process_COMPUTERNAME;Process_MONO_ANDROID_PATH;Process_ALLUSERSPROFILE;Process_CommonProgramW6432;Process_OneDriveCommercial;Process_ThreadedWaitDialogDpiContext;Process_GCExpConfigUsedInSession;Process_SignInWithHomeTenantOnly;Process_SESSIONNAME;Process_DriverData;Process_HOMEDRIVE;Process_MSMPI_BENCHMARKS;Process_SystemDrive;Process_NUMBER_OF_PROCESSORS;Process_OS;Process_XAMARIN_ANDROID_REGKEY;Process_ProgramFiles;Process_ComSpec;Process_VSAPPIDNAME;Process_USERDOMAIN_ROAMINGPROFILE;Process_PATHEXT;Process_VSLANG;Process_PSModulePath;Process_APPDATA;Process_USERDOMAIN;Process_PROCESSOR_LEVEL;Process_POSH_THEMES_PATH;Process_VisualStudioVersion;Process_VisualStudioEdition;Process_ServiceHubLogSessionKey;Process_CommonProgramFiles(x86);Process_PUBLIC;Process_ForceIdentityAuthenticationType;Process_MSBuildLoadMicrosoftTargetsReadOnly;Machine_PROCESSOR_REVISION;Machine_ComSpec;Machine_TEMP;Machine_PROCESSOR_LEVEL;Machine_windir;Machine_POWERSHELL_DISTRIBUTION_CHANNEL;Machine_MSMPI_BIN;Machine_DriverData;Machine_PATHEXT;Machine_Path;Machine_NUMBER_OF_PROCESSORS;Machine_PSModulePath;Machine_TMP;Machine_ChocolateyInstall;Machine_MSMPI_BENCHMARKS;Machine_PROCESSOR_ARCHITECTURE;Machine_USERNAME;Machine_PROCESSOR_IDENTIFIER;Machine_OS";
            User = "Surface1";
            IsInCI=false;
            
{ var v=new VersionReleased();
v.Name = "FutureRelease" ;
v.ISODateTime=DateTime.ParseExact("99990416","yyyyMMdd",null); { 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "efd1aa541ad0117edfbb55eda5afc92179debb13";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230521","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "e458336035ec3f6c8b2096de21ab6a2a2e4377aa";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230519","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "d4d900aedf110891ff6fd974a4230f3e64fa8fbf";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230519","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "497f016ee38ed84ad46a224af224dcc079b212a3";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230518","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "752c2603c69d068d6f3cc533dea4febb3ffcc490";
rd.Subject = "Merge pull request #60 from ignatandrei/40-httpsgithubcomltrzesniewskirazorblade";
rd.ReleaseDate = DateTime.ParseExact("20230516","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "85c7e47e29fa4aac1f8bc2451ba3f89938a35e6b";
rd.Subject = "Merge pull request #59 from ignatandrei/35-httpsgithubcomdomn1995dunet";
rd.ReleaseDate = DateTime.ParseExact("20230516","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "74e4bc7adaf110c80d328b957ae6c302969b427c";
rd.Subject = "Merge pull request #58 from ignatandrei/36-httpsgithubcomdistantcamautoctor";
rd.ReleaseDate = DateTime.ParseExact("20230516","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "e6f03e4eaf45c7edbafd6c888f1cc9eee9295ec7";
rd.Subject = "Merge pull request #57 from ignatandrei/37-httpsgithubcomflavienquickconstructor";
rd.ReleaseDate = DateTime.ParseExact("20230515","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "01c13b88674c19f18f3229b3be0643e454fdfb5b";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230515","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "e559ea3ab9adc9cae60dbc942c811eac1dd51e25";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230515","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "201637618cebc273144a4bfb7211a2055c16e80d";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230514","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "a72f3a36c876def2e6c438c3a3c24abe7ba1db0d";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230514","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "c0c54da6c25e12bd886698022ac57f7b11fb8c4c";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230513","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "4c6fbf61eda86bcf2d049462913853ec8c52f1b2";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230513","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "56622984f6dddeca95a0f38f8d0809b96470fdff";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230513","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "f0caab198c26eb1a21e8e341d094222f689cd13f";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230512","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "87d3b7833fc8f99d41683fa3fcee088a7adfed85";
rd.Subject = "Merge pull request #54 from ignatandrei/imgbot";
rd.ReleaseDate = DateTime.ParseExact("20230511","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "f68ad7b997593ded5e2ba60f65bf0ac295ae36f3";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230510","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "e5e9d0bbb7428cc1950eda609ce618d1394c9a89";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230509","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "95c1e2325ad41b28848a76c98e3b200aaa908a29";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples";
rd.ReleaseDate = DateTime.ParseExact("20230509","yyyyMMdd",null);  
v.AddRelease(rd);
} this.AddVersion(v);}
{ var v=new VersionReleased();
v.Name = "WithVersioning" ;
v.ISODateTime=DateTime.ParseExact("20220402","yyyyMMdd",null); { 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "c5c219a2a3cb26b8d1a46d632cf2dee54653602c";
rd.Subject = "Merge pull request #23 from ignatandrei/imgbot";
rd.ReleaseDate = DateTime.ParseExact("20211016","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "1b6d21a19e8bc4ec9323d4369b8958d5563b0015";
rd.Subject = "Merge pull request #22 from ignatandrei/imgbot";
rd.ReleaseDate = DateTime.ParseExact("20211011","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "ignatandrei";
rd.CommitId = "6d47fdc34ac4dc999f2e13fd828cd9f79f3bd41b";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples into main";
rd.ReleaseDate = DateTime.ParseExact("20211005","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "c3778675e5bfbeaa81667ada1fa24a19cf0e1efc";
rd.Subject = "Merge pull request #21 from ignatandrei/imgbot";
rd.ReleaseDate = DateTime.ParseExact("20211003","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "ea755c59323eefd5c2ff7b2c34220ac5f8dbeaeb";
rd.Subject = "Merge pull request #20 from ignatandrei/imgbot";
rd.ReleaseDate = DateTime.ParseExact("20210901","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "1ea5abc7b06c3776fd49a991234d63e141a9d1e4";
rd.Subject = "Merge pull request #19 from ignatandrei/imgbot";
rd.ReleaseDate = DateTime.ParseExact("20210831","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "da6a848014673e96e07f64f00106f050d539142d";
rd.Subject = "Merge pull request #18 from ignatandrei/imgbot";
rd.ReleaseDate = DateTime.ParseExact("20210821","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "5bccff438ec6604d7eb45925a4714276b0b4bf16";
rd.Subject = "Merge pull request #17 from ignatandrei/imgbot";
rd.ReleaseDate = DateTime.ParseExact("20210815","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "17aebf5d69a448572ce4fd831f3dd94d56099956";
rd.Subject = "Merge pull request #16 from ignatandrei/imgbot";
rd.ReleaseDate = DateTime.ParseExact("20210815","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "83e209f09c4511a0e5607925fa730658f0940287";
rd.Subject = "Merge pull request #12 from ignatandrei/imgbot";
rd.ReleaseDate = DateTime.ParseExact("20210807","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "072cfeeda71acb1d84961291e962b4eab90b16a5";
rd.Subject = "Merge pull request #11 from ignatandrei/imgbot";
rd.ReleaseDate = DateTime.ParseExact("20210717","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "9172c92711d71da5e5c6aa8929f8ff6a8ac85b9e";
rd.Subject = "Merge pull request #10 from ignatandrei/imgbot";
rd.ReleaseDate = DateTime.ParseExact("20210625","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "918954a5ac28eb47e041faa90990ffd85a4a3499";
rd.Subject = "Merge pull request #7 from ignatandrei/imgbot";
rd.ReleaseDate = DateTime.ParseExact("20210621","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "16d62359fc7d807ed652fd9b4218b4aa04734d43";
rd.Subject = "Merge pull request #5 from ignatandrei/imgbot";
rd.ReleaseDate = DateTime.ParseExact("20210330","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "ignatandrei";
rd.CommitId = "3b082c0aa0f63effd098a2bad184b03447406ec0";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples into main";
rd.ReleaseDate = DateTime.ParseExact("20210308","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "1a998fa87363c6df6b6d4a09dc514503808d380f";
rd.Subject = "Merge pull request #4 from ignatandrei/imgbot";
rd.ReleaseDate = DateTime.ParseExact("20210308","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "c5fa74a2ad780af288ece391da7a5ac84b06332e";
rd.Subject = "Merge pull request #3 from ignatandrei/imgbot";
rd.ReleaseDate = DateTime.ParseExact("20210307","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "ignatandrei";
rd.CommitId = "1bedfd1d4cb00f666b94fdaecdd7bd7da2e6a435";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples into main";
rd.ReleaseDate = DateTime.ParseExact("20210302","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "ignatandrei";
rd.CommitId = "3223ba3b8e69fc9e72e34735cc135b39881f7b59";
rd.Subject = "Merge branch 'main' of https://github.com/ignatandrei/RSCG_Examples into main";
rd.ReleaseDate = DateTime.ParseExact("20210218","yyyyMMdd",null);  
v.AddRelease(rd);
}{ 
var rd=new ReleaseData();
rd.Author = "Andrei Ignat";
rd.CommitId = "bea2886eb02f17523a34ff16f475654cb4b24ff4";
rd.Subject = "Merge pull request #1 from ignatandrei/whitesource/configure";
rd.ReleaseDate = DateTime.ParseExact("20210217","yyyyMMdd",null);  
v.AddRelease(rd);
} this.AddVersion(v);}
        }
        
    }
        
}
```

  </TabItem>


</Tabs>

## Usefull

### Download Example (.NET  C# )
:::tip

[Download Example project RSCG_AMS ](/sources/RSCG_AMS.zip)

:::

### Download PDF

[Download PDF RSCG_AMS ](/pdfs/RSCG_AMS.pdf)

### Share RSCG_AMS 

<ul>
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_AMS&quote=RSCG_AMS" title="Share on Facebook" target="_blank">Share on Facebook</a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_AMS&text=RSCG_AMS:%20https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_AMS" target="_blank" title="Tweet">Share in Twitter</a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_AMS&title=RSCG_AMS" target="_blank" title="Submit to Reddit">Share on Reddit</a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_AMS&title=RSCG_AMS&summary=&source=https%3A%2F%2Fignatandrei.github.io%2FRSCG_Examples%2Fv2%2Fdocs%2FRSCG_AMS" target="_blank" title="Share on LinkedIn">Share on Linkedin</a></li>
</ul>

https://ignatandrei.github.io/RSCG_Examples/v2/docs/RSCG_AMS
