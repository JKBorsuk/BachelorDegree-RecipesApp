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
                .FirstOrDefault(x => x.Id == id);
        }
        public Recipe getByName(string linkname)
        {
            return _masterDbContext.Recipes
                .Include(x => x.Ingredients)
                .Include(x => x.Spices)
                .Include(x => x.Views)
                .FirstOrDefault(x => x.LinkName == linkname);
        }
        public int GetVote(string linkname, int userId)
        {                
            var vote = _masterDbContext.Recipes.Include(z => z.Votes)
                    .FirstOrDefault(x => x.LinkName == linkname).Votes
                    .FirstOrDefault(y => y.UserId == userId);

            if (vote == null) return 0;
            else return vote.value;

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
            Ingredient each;

            foreach(RecipeIngredient ring in recipe.Ingredients)
            {
                each = _mapper.Map<Ingredient>(ring);
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

        public IEnumerable<Recipe> getNewestForShowCase()
        {
            return _masterDbContext.Recipes.OrderByDescending(x => x.Id).Take(3);
        }
        public IEnumerable<Recipe> getBestForShowCase()
        {
            return _masterDbContext.Recipes.OrderByDescending(x => x.votes).Take(3);
        }
        public IEnumerable<Recipe> getMostPopularForShowCase()
        {
            return _masterDbContext.Recipes.OrderByDescending(x => x.Views.Count).Take(3);
        }
        public IEnumerable<Recipe> getSmallestForShowCase()
        {
            return _masterDbContext.Recipes.OrderBy(x => x.Ingredients.Count).Take(3);
        }
        public void UpdateRecipeVote(Recipe recipe, User user, int vote)
        {
            var voteEntity = _masterDbContext.Votes.Where(x => x.UserId == user.Id).SingleOrDefault(y => y.RecipeId == recipe.Id);

            if (voteEntity == null || voteEntity.value != vote)
            {

                if(voteEntity != null)
                {
                    _masterDbContext.Recipes.SingleOrDefault(x => x.Id == recipe.Id).votes += 2*vote;
                    _masterDbContext.Votes.Where(x => x.UserId == user.Id).SingleOrDefault(y => y.RecipeId == recipe.Id).value = vote;

                    _masterDbContext.SaveChanges();
                }
                else
                {
                    _masterDbContext.Recipes.SingleOrDefault(x => x.Id == recipe.Id).votes += vote;

                    _masterDbContext.Votes.Add(
                        new Vote()
                        {
                            RecipeId = recipe.Id,
                            UserId = user.Id,
                            value = vote
                        });

                    _masterDbContext.SaveChanges();
                }
            }
            else if (voteEntity != null && voteEntity.value == vote)
            {
                _masterDbContext.Recipes.SingleOrDefault(x => x.Id == recipe.Id).votes -= vote;
                _masterDbContext.Votes.Remove(voteEntity);

                _masterDbContext.SaveChanges();
            }
        }
        public void UpdateRecipeView(Recipe recipe, User user)
        {
            var viewEntity = _masterDbContext.Views.Where(x => x.UserId == user.Id).SingleOrDefault(y => y.RecipeId == recipe.Id);

            if(viewEntity == null)
            {
                _masterDbContext.Views.Add(
                    new View() { 
                        RecipeId = recipe.Id, 
                        UserId = user.Id 
                    });

                _masterDbContext.SaveChanges();
            }
        }

        public IEnumerable<Recipe> RecipeSearch(string keys)
        {
            string[] keysArray = keys.ToLower().Split(' ');
            List<Recipe> recipes = new List<Recipe>();

            foreach(string key in keysArray)
            {
                var recipesP = _masterDbContext.Recipes.Where(x => x.Name.ToLower().Contains(key));

                foreach(Recipe recipe in recipesP)
                {
                    if(recipes.FirstOrDefault(x => x.Name == recipe.Name) == null)
                    {
                        recipes.Add(recipe);
                    }
                }
            }
            return recipes;
        }
    }
}
