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
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<Vote> Votes { get; set; }
        public DbSet<View> Views { get; set; }
        public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            #region Recipe
            modelBuilder.Entity<Recipe>().Property(e => e.PhotoFileName).HasDefaultValue("Noimg.png");
            modelBuilder.Entity<Recipe>().Property(e => e.PhotoFileName).IsRequired(false);
            modelBuilder.Entity<Recipe>().Property(e => e.votes).HasDefaultValue(0);
            #endregion

            #region User
            modelBuilder.Entity<User>().Property(e => e.Role).HasDefaultValue(1);
            #endregion

            #region RecipeIngredient
            #endregion

            #region Vote
            modelBuilder.Entity<Vote>().Property(e => e.value).HasDefaultValue(0);
            #endregion
        }
    }
}
