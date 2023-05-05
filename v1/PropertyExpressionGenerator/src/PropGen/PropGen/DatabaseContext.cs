using Microsoft.EntityFrameworkCore;

namespace PropGen
{
    public partial class DatabaseContext : DbContext
    {
        public virtual DbSet<Person> Person { get; set; }
        public DatabaseContext(DbContextOptions<DatabaseContext> options)
        : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Person>()
                .HasKey(iterator => iterator.ID)
                
                ;
        }
    }
}