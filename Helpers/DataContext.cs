using DataEnteringQuality.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataEnteringQuality.Helpers
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Student> Students { get; set; }
    }
}