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
                .Include(x => x.Ingredients)
                .SingleOrDefault(x => x.Id == id);
        }

        public User getByLogin(string login)
        {
            return _masterDbContext.Users.
                Include(x => x.Ingredients).
                SingleOrDefault(x => x.Login == login);
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
                UserIngredient userIngredient = _masterDbContext.UserIngredients.Where(x => x.UserId == user.Id).SingleOrDefault(y => y.Name == name);
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
        public void updateIngredient(UserIngredient Uing)
        {
            _masterDbContext.UserIngredients.Update(Uing);
            _masterDbContext.SaveChanges();
        }
        public IEnumerable<string> readIngredients(string login)
        {
            return _masterDbContext.UserIngredients.Where(x => x.UserId == getByLogin(login).Id).Select(y => y.Name);
        }
        public IEnumerable<Message> GetMessages()
        {
            return _masterDbContext.Messages.OrderBy(x => x.Sent).AsEnumerable();
        }
        public void WriteNewMessage(Message message)
        {
            _masterDbContext.Messages.Add(message);
            _masterDbContext.SaveChanges();
        }
        public void DeleteMessages()
        {
            _masterDbContext.Database.ExecuteSqlRaw("TRUNCATE TABLE Messages");
            _masterDbContext.SaveChanges();
        }
        public IEnumerable<Recipe> GetFavorites(User user)
        {
            return _masterDbContext.Votes.Where(x => x.UserId == user.Id && x.value == 1).Select(y => y.Recipe);
        }
        public IEnumerable<Recipe> GetHistory(User user)
        {
            return _masterDbContext.Views.Where(x => x.UserId == user.Id).Select(y => y.Recipe).Take(15);
        }
        public List<Recipe>[] findOnes(Dictionary<string, bool> dictionary, int type)
        {
            bool found;
            int count;

            List<Recipe> recipes = new List<Recipe>();
            List<Recipe> recipes_reserve = new List<Recipe>(); // recipes that can be done by adding up to 3 random elements
            List<RecipeIngredient> reserveIngredients = new List<RecipeIngredient>(); // those elements

            foreach (Recipe recipe in _masterDbContext.Recipes.Include(x => x.Ingredients).Where(y => y.Type == type))
            {
                reserveIngredients.Clear();

                found = true;
                count = 0;

                foreach (RecipeIngredient recipeIngredient in recipe.Ingredients)
                {
                    if (!dictionary.ContainsKey(recipeIngredient.Name))
                    {
                        found = false;
                        reserveIngredients.Add(recipeIngredient);
                    }
                    else count++;
                }

                if (found == true) recipes.Add(recipe);
                else if (recipe.Ingredients.Count <= count + 3)
                {
                    var newRec = new Recipe()
                    {
                        Name = recipe.Name,
                        LinkName = recipe.LinkName,
                        PhotoFileName = recipe.PhotoFileName,
                        Ingredients = new List<RecipeIngredient>(reserveIngredients),
                    };

                    recipes_reserve.Add(newRec);

                    reserveIngredients.Clear();
                    count = 0;
                }
            }
            return new List<Recipe>[] { recipes, recipes_reserve };
        }
    }
}
