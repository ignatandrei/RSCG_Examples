namespace GeneratorData;

public class DbRSCGContext : DbContext
{
    public DbRSCGContext(string folder)
    {
        this.folder = Path.Combine(folder,"v2", DatabaseName);
        Console.WriteLine($"Using database folder: {this.folder}");
    }
    public const string DatabaseName = "RSCGExamplesData";
    private readonly string folder;
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseFileBaseContextDatabase("", folder);
    }

    public DbSet<NoExample> NoExamples { get; set; } 

    public DbSet<GeneratorDataRec> Examples { get; set; } 


}
