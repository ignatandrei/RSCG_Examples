
using System.Diagnostics.CodeAnalysis;

namespace Stats.Database;

[AutoDbSetGenerators.AutoDbContext]
public partial class DotNetStatsContext : DbContext
{
    [SetsRequiredMembers]
    internal DotNetStatsContext() : base() {
        Stars = Set<Star>();
        Projects = Set<Project>();
    }
    [SetsRequiredMembers]
    public DotNetStatsContext(DbContextOptions<DotNetStatsContext> options)
        : base(options)
    {
        Stars = Set<Star>();
        Projects = Set<Project>();
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Project>(entity =>
        {
            //entity.ToTable("Project");

            entity.Property(e => e.Id);//.HasColumnName("ID");
            entity.Property(e => e.Description).HasMaxLength(500);
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.SourceCodeUrl).HasMaxLength(50);
        });

        modelBuilder.Entity<Star>(entity =>
        {
        //    entity.Property(e => e.Id)
        //        .HasColumnName("ID");
        //    entity.Property(e => e.Idproject).HasColumnName("IDProject");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
