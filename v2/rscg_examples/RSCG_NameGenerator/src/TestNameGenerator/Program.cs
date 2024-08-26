using Generated.TestNameGenerator;
//by just putting here
//you will not deploy the dll when you deploy the project
//name are generated in the code source
Console.WriteLine($"Name:{TheAssemblyInfo.GeneratedName}");
Console.WriteLine($"Nice:{TheAssemblyInfo.GeneratedNameNice}");
Console.WriteLine($"Small:{TheAssemblyInfo.GeneratedNameSmall}");
//if you want to generate a new name every time you run the app
//put in the csproj
//<ReferenceOutputAssembly>false</ReferenceOutputAssembly>
//but the dll will be deployed with the app
//Console.WriteLine(NameGenerator.NameGeneratorData.Generate().UniqueNameLong);