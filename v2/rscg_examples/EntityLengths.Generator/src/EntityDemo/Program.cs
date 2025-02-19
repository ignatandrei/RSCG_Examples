Console.WriteLine("Hello, World!");
DbContextOptionsBuilder<DotNetStatsContext> optionsBuilder = new();
optionsBuilder.UseInMemoryDatabase("StatsDatabase");
var cnt = new DotNetStatsContext(optionsBuilder.Options);
await cnt.Database.EnsureCreatedAsync();
Console.WriteLine("Database created");
Console.WriteLine(cnt.Stars.Count());