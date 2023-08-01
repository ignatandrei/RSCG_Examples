global using ProxyGenDemo;
global using Solti.Utils.Proxy.Generators;
global using Solti.Utils.Proxy.Attributes;

//[assembly: EmbedGeneratedType(typeof(ProxyGenerator<IMyInterface, MyInterceptor<IMyInterface>>))]
[assembly: EmbedGeneratedType(typeof(DuckGenerator<IPerson, Person>))]