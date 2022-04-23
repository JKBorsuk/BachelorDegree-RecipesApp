using ASPRjs.Models;

namespace Interfaces
{
    public interface IRecipeRepository
    {
        public Recipe getById(int id);
        public Recipe getByName(string name);
        public void addRecipe(Recipe recipe);
        public void updateRecipe(Recipe recipe);
        public void removeRec(int id);
        public IEnumerable<Recipe> getAll();
    }
}
