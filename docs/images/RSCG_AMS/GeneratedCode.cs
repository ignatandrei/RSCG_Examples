using System;
using AMS_Base;
namespace AMSExample { 
    /// <summary>
    /// this is the About My Software for 65788572124102115119116110
    /// </summary>
    public class XAboutMySoftware_65788572124102115119116110 :AboutMySoftware {
        /// <summary>
        /// starts when this module is loaded and 
        /// add the AMS tot the 
        /// </summary>
        [System.Runtime.CompilerServices.ModuleInitializer]
        public static void Add_AboutMySoftware_65788572124102115119116110(){
            AboutMySoftware.AddDefinition("AMSExample",new  XAboutMySoftware_65788572124102115119116110());  
        }
        /// <summary>
        /// constructor
        /// for AMS 65788572124102115119116110
        /// </summary>
        public XAboutMySoftware_65788572124102115119116110(){
            AssemblyName ="AMSExample" ; 
            DateGenerated = DateTime.ParseExact("20210717034910", "yyyyMMddHHmmss", null); 
            CommitId  = "not in a CI run" ; 
            RepoUrl ="https://ignatandrei.github.io/RSCG_AMS/runtimeMessages/NotFound.md" ; 
            CISourceControl = "not in a CI run" ; 
            SourceCommit = "https://ignatandrei.github.io/RSCG_AMS/runtimeMessages/NotFound.md" ; 
            Authors= "";
            Version= "";  
            User = "Surface1";
        }
        
    }
       
}