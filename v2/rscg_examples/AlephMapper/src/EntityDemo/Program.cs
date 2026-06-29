using EntityDemo;

Console.WriteLine("Hello, World!");
DbContextOptionsBuilder<DotNetStatsContext> optionsBuilder = new();
//optionsBuilder.UseInMemoryDatabase("StatsDatabase");
optionsBuilder.UseSqlite("Data Source=stats.db");
var cnt = new DotNetStatsContext(optionsBuilder.Options);
await cnt.Database.EnsureCreatedAsync();
Console.WriteLine("Database created");

var projDTO = cnt.Projects
    .Select(ProjectExtensions.ProjToDTOExpression());
Console.WriteLine(projDTO.ToQueryString());
var result = await projDTO.ToArrayAsync();
    
Console.WriteLine(result.Length);