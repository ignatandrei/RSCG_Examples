"use strict";(self.webpackChunkrscg_examples=self.webpackChunkrscg_examples||[]).push([[3725],{4137:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>d});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),p=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=p(e.components);return a.createElement(o.Provider,{value:t},e.children)},c="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,o=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),c=p(n),m=r,d=c["".concat(o,".").concat(m)]||c[m]||g[m]||l;return n?a.createElement(d,i(i({ref:t},u),{},{components:n})):a.createElement(d,i({ref:t},u))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,i=new Array(l);i[0]=m;var s={};for(var o in t)hasOwnProperty.call(t,o)&&(s[o]=t[o]);s.originalType=e,s[c]="string"==typeof e?e:r,i[1]=s;for(var p=2;p<l;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},1810:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>i,default:()=>g,frontMatter:()=>l,metadata:()=>s,toc:()=>p});var a=n(7462),r=(n(7294),n(4137));const l={},i=void 0,s={unversionedId:"RSCG-Examples/Breezy_readme",id:"RSCG-Examples/Breezy_readme",title:"Breezy_readme",description:"NuGet Badge",source:"@site/docs/RSCG-Examples/Breezy_readme.md",sourceDirName:"RSCG-Examples",slug:"/RSCG-Examples/Breezy_readme",permalink:"/RSCG_Examples/v2/docs/RSCG-Examples/Breezy_readme",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"RoslynComponents",permalink:"/RSCG_Examples/v2/docs/RSCG-Examples/BenutomoAutomaticDisposeImplSourceGenerator_readme"},next:{title:"\ud83e\uddf0 .NET Community Toolkit",permalink:"/RSCG_Examples/v2/docs/RSCG-Examples/CommunityToolkit.Mvvm_readme"}},o={},p=[{value:"Installation",id:"installation",level:2},{value:"Nugget Package : https://www.nuget.org/packages/Breezy.SourceGenerator/",id:"nugget-package--httpswwwnugetorgpackagesbreezysourcegenerator",level:5},{value:"Getting Started",id:"getting-started",level:2},{value:"Mapping Objects with Relations (N to N || 1 to N)",id:"mapping-objects-with-relations-n-to-n--1-to-n",level:2},{value:"Vs Dapper",id:"vs-dapper",level:4},{value:"Mapping Objects with Reference Type(s)",id:"mapping-objects-with-reference-types",level:2},{value:"Querying with Anonymous Types",id:"querying-with-anonymous-types",level:2},{value:"Caching for Performance Optimization",id:"caching-for-performance-optimization",level:2},{value:"Execute a Command that return result",id:"execute-a-command-that-return-result",level:2},{value:"Execute a Command that return results with Transaction",id:"execute-a-command-that-return-results-with-transaction",level:2},{value:"Performance ~ 10k rows",id:"performance--10k-rows",level:2},{value:"Why Breezy ?",id:"why-breezy-",level:2}],u={toc:p},c="wrapper";function g(e){let{components:t,...n}=e;return(0,r.kt)(c,(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("div",null,(0,r.kt)("img",{src:"https://zupimages.net/up/23/23/na2b.png",width:"900",height:"300"})),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://www.nuget.org/packages/Breezy.SourceGenerator//1.0.1"},(0,r.kt)("img",{parentName:"a",src:"https://buildstats.info/nuget/Breezy.SourceGenerator/",alt:"NuGet Badge"})),"\n",(0,r.kt)("a",{parentName:"p",href:"https://opensource.org/licenses/MIT"},(0,r.kt)("img",{parentName:"a",src:"https://img.shields.io/badge/License-MIT-yellow.svg",alt:"License: MIT"}))),(0,r.kt)("p",null,"Breezy is a lightweight Object-Relational Mapping ",(0,r.kt)("b",null,"(ORM)")," library for mapping objects using ",(0,r.kt)("a",{parentName:"p",href:"https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/source-generators-overview"},(0,r.kt)("inlineCode",{parentName:"a"},"Source Generator"))," in C#. ",(0,r.kt)("br",null),"It provides seamless asynchronous operations for enhanced performance."),(0,r.kt)("h2",{id:"installation"},"Installation"),(0,r.kt)("h5",{id:"nugget-package--httpswwwnugetorgpackagesbreezysourcegenerator"},"Nugget Package : ",(0,r.kt)("a",{parentName:"h5",href:"https://www.nuget.org/packages/Breezy.SourceGenerator/"},"https://www.nuget.org/packages/Breezy.SourceGenerator/")),(0,r.kt)("p",null,"To install Breezy, simply add the package reference to your project using NuGet Package Manager or by adding the following line to your .csproj file:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},'<ItemGroup>\n<PackageReference Include="Breezy.SourceGenerator" Version="1.0.1" />\n</ItemGroup>\n')),(0,r.kt)("h2",{id:"getting-started"},"Getting Started"),(0,r.kt)("p",null,"Breezy simplifies the mapping of objects and performing database operations. Here's a simple example of querying houses using Breezy's asynchronous operations :"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},"public static async Task<IEnumerable<House>> QueryAsync<T>(this DbConnection connection, string sql, object param, ICacheableQuery<House> cacheableQuery, CancellationToken cancellationToken = default) where T : House\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},'using Breezy;\n\nvar houses = await connection.QueryAsync<House>("SELECT * FROM house");\n')),(0,r.kt)("p",null,"In the above example, the QueryAsync method executes the provided SQL query and maps the results to a list of House objects asynchronously."),(0,r.kt)("h2",{id:"mapping-objects-with-relations-n-to-n--1-to-n"},"Mapping Objects with Relations (N to N || 1 to N)"),(0,r.kt)("p",null,"Breezy supports mapping objects with relationships. Here's an example of querying posts with tags using Breezy's asynchronous operations :"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},'using Breezy;\n\nvar posts = await connection.QueryAsync<Post>(\n    @"SELECT * FROM test.post p INNER JOIN posts_tags pt ON p.id = pt.post_id INNER JOIN tag t ON t.id = pt.tag_id");\n')),(0,r.kt)("p",null,"The QueryAsync method executes the provided SQL query and maps the results to a list of Post objects. The Post class is defined as follows :"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},'[Table("post")]\n[SplitOn(3, 4)]\npublic class Post\n{\n    public int Id { get; set; }\n    public string Title { get; set; }\n    public string Body { get; set; }\n    public List<Tag> Tags { get; set; } = new();\n}\n\n[Table("tag")]\npublic class Tag\n{\n    public int Id { get; set; }\n    public string Name { get; set; }\n    public List<Post> Posts { get; set; } = new();\n}\n')),(0,r.kt)("p",null,"In the Post class, the ",(0,r.kt)("b",null,"Table attribute")," specifies the table name, and the ",(0,r.kt)("b",null,"SplitOn attribute")," indicates the column indices to split when mapping the object from the database."),(0,r.kt)("i",null,"Circular reference doesn't throw exception ! "),(0,r.kt)("h4",{id:"vs-dapper"},"Vs Dapper"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},'var sql = @"SELECT p.id, p.title, p.body, t.id, t.name\n                FROM post p \n                INNER JOIN posts_tags pt ON pt.post_id = p.id\n                INNER JOIN tag t ON t.id = pt.tag_id";\n                \n    var posts = await connection.QueryAsync<Post, Tag, Post>(sql, (post, tag) => {      \n        post.Tags.Add(tag);\n        return post;\n    }, splitOn: "id");\n    \n    var result = posts.GroupBy(p => p.PostId).Select(g =>\n    {\n        var groupedPost = g.First();\n        groupedPost.Tags = g.Select(p => p.Tags.Single()).ToList();\n        return groupedPost;\n    });\n    \n   // Dapper is less user friendly for theses using case\n')),(0,r.kt)("h2",{id:"mapping-objects-with-reference-types"},"Mapping Objects with Reference Type(s)"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},"public class UserReference\n{\n    public int Id { get; set; }\n    public Position Position { get; set; }\n}\n\npublic sealed class Position\n{\n    public string ZipCode { get; set; }\n    public string City { get; set; }\n    public string Address { get; set; }\n}\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},'var users = await connection.QueryAsync<UserReference>("SELECT u.id, u.zip_code, u.city, u.address FROM user_ref u");\n')),(0,r.kt)("p",null,"The QueryAsync method executes the SQL query and automatically maps the result columns to the corresponding properties of the UserReference entity, including the reference type Position."),(0,r.kt)("h2",{id:"querying-with-anonymous-types"},"Querying with Anonymous Types"),(0,r.kt)("p",null,"Breezy allows you to query using anonymous types as parameters. Here's an example :"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},'var houses = await connection.QueryAsync<House>("SELECT * FROM house h WHERE h.id = @Id", new {Id = 1});\n')),(0,r.kt)("p",null,"The anonymous type is used to pass the ",(0,r.kt)("b",null,"Id")," parameter."),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("em",{parentName:"p"},"IMPORTANT :"),"\nMake sure that the column index in the SQL query match the property index in any class for the mapping to work correctly."),(0,r.kt)("br",null),(0,r.kt)("b",null,"You need to add any relations at the end of you main object !")),(0,r.kt)("h2",{id:"caching-for-performance-optimization"},"Caching for Performance Optimization"),(0,r.kt)("p",null,"Breezy supports implementing caching mechanisms, such as in-memory or distributed caching, to reduce the memory footprint and improve query execution time. You can implement your own caching strategy based on your specific requirements."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},"public interface ICacheableQuery<T> where T : class\n{\n    public Task<IEnumerable<T>> GetCacheableResultsAsync(IdentityQuery identityQuery);\n    \n    public Task SetCacheableResultsAsync(IdentityQuery identityQuery, IEnumerable<T> results);\n}   \n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},"// Check if the query result is already cached\n\nvar identityQuery = new IdentityQuery(sql);\n\nvar cacheableResults = await cacheableQuery.GetCacheableResultsAsync(identityQuery);\n\nif (cacheableResults.Any())\n    return cacheableResults;\n    \n// Execute the query    \n\nvar results = new List<T>();\n\nwhile (await reader.ReadAsync(cancellationToken).ConfigureAwait(false)) \n{ \n    // processing...\n}\n\n// Cache the query result for X ms/s\n\nawait cacheableQuery.SetCacheableResultsAsync(identityQuery, results);\n")),(0,r.kt)("details",null,(0,r.kt)("summary",null,"Example of implementation (Memory Cache)"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},"public sealed class MemoryCacheableQuery<T> : ICacheableQuery<T> where T : class\n{\n    private readonly Dictionary<IdentityQuery, Tuple<DateTime, IEnumerable<T>>> _cacheableData = new();\n    \n    public Task<IEnumerable<T>> GetCacheableResultsAsync(IdentityQuery identityQuery)\n    {\n        if (_cacheableData.TryGetValue(identityQuery, out var results))\n        {\n            var (addDate, collection) = results;\n\n            if ((DateTime.Now - addDate) < TimeSpan.FromSeconds(10))\n                return Task.FromResult<IEnumerable<T>>(collection);\n\n            _cacheableData.Remove(identityQuery);\n        }\n\n        return Task.FromResult<IEnumerable<T>>(Array.Empty<T>());\n    }\n\n    public Task SetCacheableResultsAsync(IdentityQuery identityQuery, IEnumerable<T> results)\n    {\n        _cacheableData.Add(identityQuery, new Tuple<DateTime, IEnumerable<T>>(DateTime.Now, results));\n\n        return Task.CompletedTask;\n    }\n}\n"))),(0,r.kt)("h2",{id:"execute-a-command-that-return-result"},"Execute a Command that return result"),(0,r.kt)("p",null,"Breezy provides the ExecuteAsync method for executing SQL statements that can return results. Here's an example of using ExecuteAsync to insert data into a table and retrieve the last inserted ID:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},"public static async Task<int> ExecuteAsync(this DbConnection connection, string sql, object param, CancellationToken cancellationToken = default)\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},'var lastId = await connection.ExecuteAsync("INSERT INTO myTable (x, y) VALUES (x, y); SELECT LAST_INSERT_ID();");\n')),(0,r.kt)("h2",{id:"execute-a-command-that-return-results-with-transaction"},"Execute a Command that return results with Transaction"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},"public static async Task<int[]> ExecuteAsync(this DbConnection connection, string[] sql, DbTransaction transaction, CancellationToken cancellationToken = default)\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},'var dbTransaction = await _mySqlConnection.BeginTransactionAsync();\n\nvar results = await connection.ExecuteAsync(new [] { "INSERT INTO myTable (x, y) VALUES (x, y); SELECT LAST_INSERT_ID();" }, { /* ... */ }, dbTransaction);\n')),(0,r.kt)("h2",{id:"performance--10k-rows"},"Performance ~ 10k rows"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"BenchmarkDotNet=v0.13.5, OS=Windows 10 (10.0.19044.2965/21H2/November2021Update)\nAMD Ryzen 5 3500X, 1 CPU, 6 logical and 6 physical cores\n.NET SDK=8.0.100-preview.2.23157.25\n[Host]     : .NET 7.0.5 (7.0.523.17405), X64 RyuJIT AVX2\nDefaultJob : .NET 7.0.5 (7.0.523.17405), X64 RyuJIT AVX2\n")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"ORM"),(0,r.kt)("th",{parentName:"tr",align:null},"Method"),(0,r.kt)("th",{parentName:"tr",align:null},"Return"),(0,r.kt)("th",{parentName:"tr",align:"right"},"Mean"),(0,r.kt)("th",{parentName:"tr",align:"right"},"StdDev"),(0,r.kt)("th",{parentName:"tr",align:"right"},"Gen0"),(0,r.kt)("th",{parentName:"tr",align:"right"},"Gen1"),(0,r.kt)("th",{parentName:"tr",align:"right"},"Gen2"),(0,r.kt)("th",{parentName:"tr",align:"right"},"Allocated"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Breezy"),(0,r.kt)("td",{parentName:"tr",align:null},"QueryAsync","<","T",">"),(0,r.kt)("td",{parentName:"tr",align:null},"No relation"),(0,r.kt)("td",{parentName:"tr",align:"right"},"491.1 ns"),(0,r.kt)("td",{parentName:"tr",align:"right"},"4.08 ns"),(0,r.kt)("td",{parentName:"tr",align:"right"},"0.0801"),(0,r.kt)("td",{parentName:"tr",align:"right"},"-"),(0,r.kt)("td",{parentName:"tr",align:"right"},"-"),(0,r.kt)("td",{parentName:"tr",align:"right"},"672 B")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Dapper"),(0,r.kt)("td",{parentName:"tr",align:null},"QueryAsync","<","T",">"),(0,r.kt)("td",{parentName:"tr",align:null},"No relation"),(0,r.kt)("td",{parentName:"tr",align:"right"},"14,005,807.3 ns"),(0,r.kt)("td",{parentName:"tr",align:"right"},"85,785.13 ns"),(0,r.kt)("td",{parentName:"tr",align:"right"},"437.5000"),(0,r.kt)("td",{parentName:"tr",align:"right"},"265.6250"),(0,r.kt)("td",{parentName:"tr",align:"right"},"125.0000"),(0,r.kt)("td",{parentName:"tr",align:"right"},"3899691 B")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Breezy"),(0,r.kt)("td",{parentName:"tr",align:null},"QueryFirstOrDefault","<","T",">"),(0,r.kt)("td",{parentName:"tr",align:null},"No relation"),(0,r.kt)("td",{parentName:"tr",align:"right"},"589.8 ns"),(0,r.kt)("td",{parentName:"tr",align:"right"},"7.28 ns"),(0,r.kt)("td",{parentName:"tr",align:"right"},"0.0935"),(0,r.kt)("td",{parentName:"tr",align:"right"},"-"),(0,r.kt)("td",{parentName:"tr",align:"right"},"-"),(0,r.kt)("td",{parentName:"tr",align:"right"},"784 B")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Dapper"),(0,r.kt)("td",{parentName:"tr",align:null},"QueryFirstOrDefault","<","T",">"),(0,r.kt)("td",{parentName:"tr",align:null},"No relation"),(0,r.kt)("td",{parentName:"tr",align:"right"},"540,714.1 ns"),(0,r.kt)("td",{parentName:"tr",align:"right"},"44,717.07 ns"),(0,r.kt)("td",{parentName:"tr",align:"right"},"0.9766"),(0,r.kt)("td",{parentName:"tr",align:"right"},"-"),(0,r.kt)("td",{parentName:"tr",align:"right"},"-"),(0,r.kt)("td",{parentName:"tr",align:"right"},"13081 B")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Breezy"),(0,r.kt)("td",{parentName:"tr",align:null},"QueryAsync","<","T",">"),(0,r.kt)("td",{parentName:"tr",align:null},"1 To N relations"),(0,r.kt)("td",{parentName:"tr",align:"right"},"588.5 ns"),(0,r.kt)("td",{parentName:"tr",align:"right"},"9.26 ns"),(0,r.kt)("td",{parentName:"tr",align:"right"},"0.0801"),(0,r.kt)("td",{parentName:"tr",align:"right"},"-"),(0,r.kt)("td",{parentName:"tr",align:"right"},"-"),(0,r.kt)("td",{parentName:"tr",align:"right"},"672 B")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Dapper"),(0,r.kt)("td",{parentName:"tr",align:null},"QueryAsync","<","T",">"),(0,r.kt)("td",{parentName:"tr",align:null},"1 To N relations"),(0,r.kt)("td",{parentName:"tr",align:"right"},"98,695,865.6 ns"),(0,r.kt)("td",{parentName:"tr",align:"right"},"740,908.87 ns"),(0,r.kt)("td",{parentName:"tr",align:"right"},"2000.0000"),(0,r.kt)("td",{parentName:"tr",align:"right"},"833.3333"),(0,r.kt)("td",{parentName:"tr",align:"right"},"500.0000"),(0,r.kt)("td",{parentName:"tr",align:"right"},"17760052 B")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Breezy"),(0,r.kt)("td",{parentName:"tr",align:null},"QueryFirstOrDefault","<","T",">"),(0,r.kt)("td",{parentName:"tr",align:null},"1 To N relations"),(0,r.kt)("td",{parentName:"tr",align:"right"},"690.7 ns"),(0,r.kt)("td",{parentName:"tr",align:"right"},"13.41 ns"),(0,r.kt)("td",{parentName:"tr",align:"right"},"0.0935"),(0,r.kt)("td",{parentName:"tr",align:"right"},"-"),(0,r.kt)("td",{parentName:"tr",align:"right"},"-"),(0,r.kt)("td",{parentName:"tr",align:"right"},"784 B")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Dapper"),(0,r.kt)("td",{parentName:"tr",align:null},"QueryFirstOrDefault","<","T",">"),(0,r.kt)("td",{parentName:"tr",align:null},"1 To N relations"),(0,r.kt)("td",{parentName:"tr",align:"right"},"14,866,187.7 ns"),(0,r.kt)("td",{parentName:"tr",align:"right"},"385,888.24 ns"),(0,r.kt)("td",{parentName:"tr",align:"right"},"-"),(0,r.kt)("td",{parentName:"tr",align:"right"},"-"),(0,r.kt)("td",{parentName:"tr",align:"right"},"-"),(0,r.kt)("td",{parentName:"tr",align:"right"},"30835 B")))),(0,r.kt)("h2",{id:"why-breezy-"},"Why Breezy ?"),(0,r.kt)("p",null,"I wanted to offer similary fonctionalities faster than ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/DapperLib/Dapper"},(0,r.kt)("inlineCode",{parentName:"a"},"Dapper"))," with source generator"))}g.isMDXComponent=!0}}]);