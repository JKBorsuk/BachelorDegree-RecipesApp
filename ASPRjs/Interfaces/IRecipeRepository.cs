using ASPRjs.Models;

namespace Interfaces
{
    public interface IRecipeRepository
    {
        public Recipe getById(int id);
        public Recipe getByName(string name);
        public int GetVote(string name, int userId);
        public void addRecipe(Recipe recipe);
        public void updateRecipe(Recipe recipe);
        public void removeRec(string linkname);
        public IEnumerable<Recipe> getAll();
        public IEnumerable<string> getAllIngredients();
        public IEnumerable<Recipe> getNewestForShowCase();
        public IEnumerable<Recipe> getBestForShowCase();
        public IEnumerable<Recipe> getMostPopularForShowCase();
        public IEnumerable<Recipe> getSmallestForShowCase();
        public void UpdateRecipeVote(Recipe recipe, User user, int vote);
        public void UpdateRecipeView(Recipe recipe, User user);
        public IEnumerable<Recipe> RecipeSearch(string keys);
    }
}
