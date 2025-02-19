namespace Stats.Database;

public partial class Project
{
    public long Id { get; set; }

    public string Name { get; set; } = null!;

    public string SourceCodeUrl { get; set; } = null!;

    public string? Description { get; set; }
}
