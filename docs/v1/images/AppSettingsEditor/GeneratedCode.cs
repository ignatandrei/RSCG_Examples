//------------------------------------------------------------------------------                                                                       
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using Microsoft.Extensions.Configuration;
using appSettingsEditor;
namespace SettingsEditor.SettingsJson
{

    //[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("appSettingsEditorAPI", "2021.3.21.2300")]
    public partial class LogLevel: IAppSettingsConfig<LogLevel> 
    {
        public object GetFromPropertyName(string propName, bool returnNull =false){
            
            propName=propName?.ToUpper();
            
            switch(propName){
                
                case "DEFAULT":
                    return this.Default ;
                
                case "MICROSOFT":
                    return this.Microsoft ;
                
                case "MICROSOFTHOSTINGLIFETIME":
                    return this.MicrosoftHostingLifetime ;
                
                default:
                    if(returnNull)
                        return null;

                    throw new ArgumentException("cannot found from LogLevel prop "+propName);            

            }
            
            
        }

        public IEnumerable<string> Properties(){
            
                yield return "Default" ;
            
                yield return "Microsoft" ;
            
                yield return "MicrosoftHostingLifetime" ;
            
            yield break;
        }
        
        [System.Text.Json.Serialization.JsonPropertyName("Default")]
        public string Default { get; set; }
        
        [System.Text.Json.Serialization.JsonPropertyName("Microsoft")]
        public string Microsoft { get; set; }
        
        [System.Text.Json.Serialization.JsonPropertyName("Microsoft.Hosting.Lifetime")]
        public string MicrosoftHostingLifetime { get; set; }
        
        public  LogLevel LoadFromConfig(IConfiguration config)
        { 
            
                config.GetSection("Logging.LogLevel").Bind(this);
                return this;
            
        }
    }

    //[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("appSettingsEditorAPI", "2021.3.21.2300")]
    public partial class Logging: IAppSettingsConfig<Logging> 
    {
        public object GetFromPropertyName(string propName, bool returnNull =false){
            
            propName=propName?.ToUpper();
            
            switch(propName){
                
                case "LOGLEVEL":
                    return this.LogLevel ;
                
                default:
                    if(returnNull)
                        return null;

                    throw new ArgumentException("cannot found from Logging prop "+propName);            

            }
            
            
        }

        public IEnumerable<string> Properties(){
            
                yield return "LogLevel" ;
            
            yield break;
        }
        
        [System.Text.Json.Serialization.JsonPropertyName("LogLevel")]
        public LogLevel LogLevel { get; set; }
        
        public  Logging LoadFromConfig(IConfiguration config)
        { 
            
                config.GetSection("Logging").Bind(this);
                return this;
            
        }
    }

    //[global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("appSettingsEditorAPI", "2021.3.21.2300")]
    public partial class appsettings: IAppSettingsConfig<appsettings> 
    {
        public object GetFromPropertyName(string propName, bool returnNull =false){
            
            propName=propName?.ToUpper();
            
            switch(propName){
                
                case "LOGGING":
                    return this.Logging ;
                
                case "ALLOWEDHOSTS":
                    return this.AllowedHosts ;
                
                default:
                    if(returnNull)
                        return null;

                    throw new ArgumentException("cannot found from appsettings prop "+propName);            

            }
            
            
        }

        public IEnumerable<string> Properties(){
            
                yield return "Logging" ;
            
                yield return "AllowedHosts" ;
            
            yield break;
        }
        
        [System.Text.Json.Serialization.JsonPropertyName("Logging")]
        public Logging Logging { get; set; }
        
        [System.Text.Json.Serialization.JsonPropertyName("AllowedHosts")]
        public string AllowedHosts { get; set; }
        
        public  appsettings LoadFromConfig(IConfiguration config)
        { 
            
                return config.Get<appsettings>();
            
        }
    }

}