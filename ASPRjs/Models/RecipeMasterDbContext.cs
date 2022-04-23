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
    }
}
