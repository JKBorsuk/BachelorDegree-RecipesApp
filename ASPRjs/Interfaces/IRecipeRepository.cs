using ASPRjs.Models;

namespace Interfaces
{
    public interface IRecipeRepository
    {
        public Recipe getById(int id);
        public Recipe getByName(string name);
        public void addRecipe(Recipe recipe);
        public void updateRecipe(Recipe recipe);
        public void removeRec(string linkname);
        public IEnumerable<Recipe> getAll();
        public IEnumerable<string> getAllIngredients();
        public IEnumerable<Recipe> getNewestForShowCase();
    }
}
