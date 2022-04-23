using ASPRjs.Models;
using ASPRjsAPI.Dto;

namespace Interfaces
{
    public interface IRecipeService
    {
        public RecipeDto getRecipe(string name);
        public ListRecipesDto getAllRecipes();
        public Recipe addNewRecipe(RecipeDto recipe);
        public void removeRecipe(int id);
        public void updateRecipe(int id, UpdateRecipe urecipe);
        public void changeImage(int id, string filename);
    }
}
