
namespace Stats.Database;
public partial class DotNetStatsContext : DbContext
{
    internal DotNetStatsContext() : base() { }
    public DotNetStatsContext(DbContextOptions<DotNetStatsContext> options)
        : base(options)
    {
        
    }
    
    public virtual DbSet<Project> Projects { get; set; }

    public virtual DbSet<Star> Stars { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Project>(entity =>
        {
            entity.ToTable("Project");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Description).HasMaxLength(500);
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.SourceCodeUrl).HasMaxLength(50);
        });

        modelBuilder.Entity<Star>(entity =>
        {
            entity.Property(e => e.Id)
                .HasColumnName("ID");
            entity.Property(e => e.Idproject).HasColumnName("IDProject");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
