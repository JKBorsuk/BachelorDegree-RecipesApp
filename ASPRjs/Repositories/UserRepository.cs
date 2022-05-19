using Microsoft.EntityFrameworkCore;
using Interfaces;
using ASPRjs.Models;

namespace Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly RecipeMasterDbContext _masterDbContext;
        public UserRepository(RecipeMasterDbContext masterDbContext) 
        {
            _masterDbContext = masterDbContext;
        }
        public User getById(int id)
        {
            return _masterDbContext.Users
                .Include(x => x.ingredients)
                .SingleOrDefault(x => x.UserId == id);
        }

        public User getByLogin(string login)
        {
            return _masterDbContext.Users.
                Include(x => x.ingredients).
                SingleOrDefault(x => x.login == login);
        }

        public void addUser(User user)
        {
            _masterDbContext.Users.Add(user);
            _masterDbContext.SaveChanges();
        }

        public void updateUser(User user)
        {
            _masterDbContext.Users.Update(user);
            _masterDbContext.SaveChanges();
        }
        public void addIngredient(UserIngredient Uing)
        {
            _masterDbContext.UserIngredients.Add(Uing);
            _masterDbContext.SaveChanges();
        }
        public UserIngredient getByUser(User user, string name)
        {
            try
            {
                UserIngredient userIngredient = _masterDbContext.UserIngredients.Where(x => x.UserId == user.UserId).SingleOrDefault(y => y.Name == name);
                return userIngredient;
            }
            catch(InvalidOperationException ex)
            {
                return null;
            }
        }
        public void deleteIngredient(UserIngredient Uing)
        {
            _masterDbContext.UserIngredients.Remove(Uing);
            _masterDbContext.SaveChanges();
        }
        public IEnumerable<string> readIngredients(string login)
        {
            return _masterDbContext.UserIngredients.Where(x => x.UserId == getByLogin(login).UserId).Select(y => y.Name);
        }
        public List<Recipe>[] findOnes(Dictionary<string, bool> dictionary, int type)
        {
            bool found;
            int count = 0;

            List<Recipe> recipes = new List<Recipe>();
            List<Recipe> recipes_reserve = new List<Recipe>(); // recipes that can be done by adding up to 3 random elements
            List<RecipeIngredient> reserveIngredients = new List<RecipeIngredient>(); // those elements

            foreach (Recipe recipe in _masterDbContext.Recipes.Include(x => x.Ingredients).Where(y => y.Type == type))
            {
                reserveIngredients.Clear();

                found = true;
                foreach (RecipeIngredient recipeIngredient in recipe.Ingredients)
                {
                    if (!dictionary.ContainsKey(recipeIngredient.Name))
                    {
                        found = false;
                        reserveIngredients.Add(recipeIngredient);
                    }
                    else count++;
                }
                if (found == true) { recipes.Add(recipe); found = false; }
                else if(recipe.Ingredients.Count <= count + 3)
                {
                    recipes_reserve.Add(recipe);
                    recipes_reserve. // dodaj tylko te elementy których brakuje!!
                    count = 0;
                }
            }
            return new List<Recipe>[] { recipes, recipes_reserve };
        }
    }
}
