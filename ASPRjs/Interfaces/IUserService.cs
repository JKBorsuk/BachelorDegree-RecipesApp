using ASPRjs.Models;
using ASPRjsAPI.Dto;

namespace Interfaces
{
    public interface IUserService
    {
        public UserDto getUserById(int id);
        public UserDto getUserByLogin(string login); // do wyszukiwania
        public User getUserByLogin_U(string login); // do logowania
        public User addNewUser(RegisterUser user);
        public Dictionary<string, bool> dictionary(int id);
        public UserIngredient AddNewIngredient(UIngredientDto uing, string login);
        public ListIngredientDto readAllUserIngredients(string login);
        public UserRecipesListDto readAllICanCook(string login, int type);
        public void updateUser(string login, UpdateUser user);
        public User changeRole(User user, int role);
        public void deleteIngredient(User user, string nazwa);
    }
}
