using ASPRjs.Models;
using AutoMapper;
using Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Repositories
{
    public class RecipeRepository : IRecipeRepository
    {
        private readonly RecipeMasterDbContext _masterDbContext;
        private readonly IMapper _mapper;
        public RecipeRepository(RecipeMasterDbContext masterDbContext, IMapper mapper)
        {
            _masterDbContext = masterDbContext;
            _mapper = mapper;
        }
        public Recipe getById(int id)
        {
            return _masterDbContext.Recipes
                .SingleOrDefault(x => x.RecipeId == id);
        }
        public Recipe getByName(string linkname)
        {
            return _masterDbContext.Recipes
                .Include(x => x.Ingredients)
                .Include(x => x.Spices)
                .SingleOrDefault(x => x.LinkName == linkname);
        }
        public IEnumerable<Recipe> getAll()
        {
            return _masterDbContext.Recipes.Include(x => x.Ingredients);
        }
        public IEnumerable<string> getAllIngredients()
        {
            return _masterDbContext.Ingredients.Select(x => x.Name);
        }
        public void addRecipe(Recipe recipe)
        {
            _masterDbContext.Recipes.Add(recipe);
            EachIngredient each;

            foreach(RecipeIngredient ring in recipe.Ingredients)
            {
                each = _mapper.Map<EachIngredient>(ring);
                if(_masterDbContext.Ingredients.SingleOrDefault(x => x.Name == each.Name) == null) _masterDbContext.Ingredients.Add(each);
            }

            _masterDbContext.SaveChanges();
        }

        public void removeRec(string linkname)
        {
            _masterDbContext.Recipes
                .Remove(_masterDbContext.Recipes.SingleOrDefault(x => x.LinkName == linkname));
            _masterDbContext.SaveChanges();
        }

        public void updateRecipe(Recipe recipe)
        {
            _masterDbContext.Recipes.Update(recipe);
            _masterDbContext.SaveChanges();
        }
    }
}
