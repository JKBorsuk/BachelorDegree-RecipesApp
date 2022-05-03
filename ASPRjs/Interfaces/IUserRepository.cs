using ASPRjs.Models;

namespace Interfaces
{
    public interface IUserRepository
    {
        public User getById(int id);
        public User getByLogin(string login);
        public void addUser(User user);
        public void updateUser(User user);
        public void addIngredient(UserIngredient Uing);
        public IEnumerable<string> readIngredients(string login);
        public List<Recipe> findOnes(Dictionary<string, bool> dictionary, int type);
    }
}
