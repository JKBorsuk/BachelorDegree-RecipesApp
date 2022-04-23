using ASPRjs.Models;
using Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Repositories
{
    public class RecipeRepository : IRecipeRepository
    {
        private readonly RecipeMasterDbContext _masterDbContext;
        public RecipeRepository(RecipeMasterDbContext masterDbContext)
        {
            _masterDbContext = masterDbContext;
        }
        public Recipe getById(int id)
        {
            return _masterDbContext.Recipes.SingleOrDefault(x => x.RecipeId == id);
        }
        public Recipe getByName(string name)
        {
            return _masterDbContext.Recipes.SingleOrDefault(x => x.Name == name);
        }
        public IEnumerable<Recipe> getAll()
        {
            return _masterDbContext.Recipes.Include(x => x.Ingredients);
        }
        public void addRecipe(Recipe recipe)
        {
            _masterDbContext.Recipes.Add(recipe);
            _masterDbContext.SaveChanges();
        }

        public void removeRec(int id)
        {
            _masterDbContext.Recipes.Remove(_masterDbContext.Recipes.SingleOrDefault(x => x.RecipeId == id));
            _masterDbContext.SaveChanges();
        }

        public void updateRecipe(Recipe recipe)
        {
            _masterDbContext.Recipes.Update(recipe);
            _masterDbContext.SaveChanges();
        }
    }
}
