using ASPRjs.Models;
using ASPRjsAPI.Dto;

namespace Interfaces
{
    public interface IRecipeService
    {
        public RecipeDto getRecipe(string name);
        public ListRecipesDto getAllRecipes();
        public ListIngredientDto getAllIngredients();
        public Recipe addNewRecipe(RecipeDto recipe);
        public void removeRecipe(string linkname);
        public void updateRecipe(string linkname, UpdateRecipe urecipe);
        public void changeImage(string linkname, string filename);
    }
}
