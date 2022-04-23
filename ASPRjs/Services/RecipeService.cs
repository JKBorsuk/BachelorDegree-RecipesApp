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
        public RecipeDto getRecipe(string name)
        {
            name = name.Replace('-', ' ').Replace('-',',');
            var recipe = _recipeRepository.getByName(name);
            return _mapper.Map<RecipeDto>(recipe);
        }
        public ListRecipesDto getAllRecipes()
        {
            var recipes = _recipeRepository.getAll();
            return _mapper.Map<ListRecipesDto>(recipes);
        }
        public Recipe addNewRecipe(RecipeDto recipe)
        {
            var nrecipe = _mapper.Map<Recipe>(recipe);

            _recipeRepository.addRecipe(nrecipe);
            return nrecipe;
        }
        public void removeRecipe(int id)
        {
            _recipeRepository.removeRec(id);
        }
        public void updateRecipe(int id, UpdateRecipe urecipe)
        {
            var existingRecipe = _recipeRepository.getById(id);
            if (existingRecipe == null) return;
            var updatedRecipe = _mapper.Map(urecipe, existingRecipe);

            existingRecipe.Type = updatedRecipe.Type;
            existingRecipe.Name = updatedRecipe.Name;

            _recipeRepository.updateRecipe(existingRecipe);
        }
        public void changeImage(int id, string filename)
        {
            var existingRecipe = _recipeRepository.getById(id);
            if (existingRecipe == null) return;

            existingRecipe.PhotoFileName = filename;

            _recipeRepository.updateRecipe(existingRecipe);
        }
    }
}
