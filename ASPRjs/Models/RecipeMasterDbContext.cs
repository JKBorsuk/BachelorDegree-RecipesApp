using Microsoft.EntityFrameworkCore;

namespace ASPRjs.Models
{
    public class RecipeMasterDbContext : DbContext
    {
        public RecipeMasterDbContext(DbContextOptions<RecipeMasterDbContext> options) : base(options)
        {

        }

        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<RecipeIngredient> RecipeIngredients { get; set; }
        public DbSet<RecipeSpice> RecipeSpices { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserIngredient> UserIngredients { get; set; }
        public DbSet<EachIngredient> Ingredients { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            #region Recipe
            modelBuilder.Entity<Recipe>().Property(e => e.PhotoFileName).HasDefaultValue("Noimg.png");
            modelBuilder.Entity<Recipe>().Property(e => e.PhotoFileName).IsRequired(false);
            #endregion

            #region User
            modelBuilder.Entity<User>().Property(e => e.role).HasDefaultValue(1);
            modelBuilder.Entity<User>().Property(e => e.role).IsRequired(false);
            #endregion
        }
    }
}
