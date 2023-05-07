using System;
using System.Linq;

namespace Apparatus.AOT.Reflection
{
    public static class CopyConstructor_PersonExtensions
    {
        [global::System.Runtime.CompilerServices.ModuleInitializer]
        public static void Bootstrap()
        {
            MetadataStore<global::CopyConstructor.Person>.Data = _lazy;
        }

        private static global::System.Lazy<global::System.Collections.Generic.IReadOnlyDictionary<string, IPropertyInfo>> _lazy = new global::System.Lazy<global::System.Collections.Generic.IReadOnlyDictionary<string, IPropertyInfo>>(new global::System.Collections.Generic.Dictionary<string, IPropertyInfo>
        {
            { "FirstName", new global::Apparatus.AOT.Reflection.PropertyInfo<global::CopyConstructor.Person,string>(
                        "FirstName", 
                        new global::System.Attribute[] 
                        {
                            new global::System.ComponentModel.DataAnnotations.RequiredAttribute(),
                        }, 
                        instance => instance.FirstName, (instance, value) => instance.FirstName = value)
                },
            { "LastName", new global::Apparatus.AOT.Reflection.PropertyInfo<global::CopyConstructor.Person,string>(
                        "LastName", 
                        new global::System.Attribute[] 
                        {
                            
                        }, 
                        instance => instance.LastName, (instance, value) => instance.LastName = value)
                },
        }); 


        internal static global::System.Collections.Generic.IReadOnlyDictionary<string, IPropertyInfo> GetProperties(this global::CopyConstructor.Person value)
        {
            return _lazy.Value;
        }
    }
}