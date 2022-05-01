using ASPRjs.Models;
using ASPRjsAPI.Dto;
using AutoMapper;
using Interfaces;

namespace Services
{
    public class RecipeService : IRecipeService
    {
        private readonly IRecipeRepository _recipeRepository;
        private readonly IMapper _mapper;

        public RecipeService(IRecipeRepository recipeRepository, IMapper mapper)
        {
            _recipeRepository = recipeRepository;
            _mapper = mapper;
        }
        public RecipeDto getRecipe(string linkname)
        {
            var recipe = _recipeRepository.getByName(linkname);
            return _mapper.Map<RecipeDto>(recipe);
        }
        public ListRecipesDto getAllRecipes()
        {
            var recipes = _recipeRepository.getAll();
            return _mapper.Map<ListRecipesDto>(recipes);
        }
        public ListIngredientDto getAllIngredients()
        {
            var ingredients = _recipeRepository.getAllIngredients();
            return _mapper.Map<ListIngredientDto>(ingredients);
        }
        public Recipe addNewRecipe(RecipeDto recipe)
        {
            var nrecipe = _mapper.Map<Recipe>(recipe);

            _recipeRepository.addRecipe(nrecipe);
            return nrecipe;
        }
        public void removeRecipe(string linkname)
        {
            _recipeRepository.removeRec(linkname);
        }
        public void updateRecipe(string linkname, UpdateRecipe urecipe)
        {
            var existingRecipe = _recipeRepository.getByName(linkname);
            if (existingRecipe == null) return;
            var updatedRecipe = _mapper.Map(urecipe, existingRecipe);

            existingRecipe.Type = updatedRecipe.Type;
            existingRecipe.Name = updatedRecipe.Name;

            _recipeRepository.updateRecipe(existingRecipe);
        }
        public void changeImage(string linkname, string filename)
        {
            var existingRecipe = _recipeRepository.getByName(linkname);
            if (existingRecipe == null) return;

            existingRecipe.PhotoFileName = filename;

            _recipeRepository.updateRecipe(existingRecipe);
        }
    }
}
