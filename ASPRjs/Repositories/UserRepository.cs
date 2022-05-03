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
        public IEnumerable<string> readIngredients(string login)
        {
            return _masterDbContext.UserIngredients.Where(x => x.UserId == getByLogin(login).UserId).Select(y => y.Name);
        }
        public List<Recipe> findOnes(Dictionary<string, bool> dictionary, int type)
        {
            bool found;

            List<Recipe> recipes = new List<Recipe>();
            foreach (Recipe recipe in _masterDbContext.Recipes.Include(x => x.Ingredients).Where(y => y.Type == type))
            {
                found = true;
                foreach (RecipeIngredient recipeIngredient in recipe.Ingredients)
                {
                    if (!dictionary.ContainsKey(recipeIngredient.Name))
                    {
                        found = false;
                        break;
                    }
                }
                if (found == true) { recipes.Add(recipe); found = false; }
            }
            return recipes;
        }
    }
}
