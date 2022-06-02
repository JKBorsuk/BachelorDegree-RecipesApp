using ASPRjs.Models;
using ASPRjsAPI.Dto;

namespace Interfaces
{
    public interface IRecipeService
    {
        public RecipeDto getRecipe(string name);
        public int GetUserVote(string linkname, User user);
        public ListRecipesDto getAllRecipes();
        public ListIngredientDto getAllIngredients();
        public Recipe addNewRecipe(AddRecipeDto recipe);
        public void removeRecipe(string linkname);
        public void updateRecipe(string linkname, UpdateRecipe urecipe);
        public void changeImage(string linkname, string filename);
        public ListRecipesDto getNewestRecipes();
        public ListRecipesDto getBestRecipes();
        public ListRecipesDto getMostPopularRecipes();
        public ListRecipesDto getSmallestRecipes();
        public bool RecipeVote(string linkname, User user, int vote);
        public bool RecipeView(string linkname, User user);
        public ListRecipesDto RecipeSearch(string keys);
    }
}
