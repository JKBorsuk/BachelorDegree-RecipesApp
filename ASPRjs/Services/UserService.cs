using Interfaces;
using ASPRjs.Models;
using ASPRjsAPI.Dto;
using AutoMapper;
using Microsoft.AspNetCore.Identity;

namespace Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public User addNewUser(RegisterUser user)
        {
            var newuser = _mapper.Map<User>(user);
            _userRepository.addUser(newuser);
            return newuser;
        }

        public UserDto getUserById(int id)
        {
            var user = _userRepository.getById(id);
            return _mapper.Map<UserDto>(user);
        }

        public UserDto getUserByLogin(string login)
        {
            var user = _userRepository.getByLogin(login);
            return _mapper.Map<UserDto>(user);
        }
        public User getUserByLogin_U(string login)
        {
            return _userRepository.getByLogin(login);
        }
        public void addMulitIngredients(ArrayUIngredientDto userIngredients, string login)
        {
            var user = getUserByLogin_U(login);
            foreach(var item in userIngredients.UIngredients)
            {
                user.Ingredients.Add(new UserIngredient() { Name = item.Name });
            }
            _userRepository.updateUser(user);
        }

        public UserIngredient AddNewIngredient(UIngredientDto user_ingredient, string login)
        {
            if(user_ingredient.Name == null) return null;
            var NIngredient = _mapper.Map<UserIngredient>(user_ingredient);
            NIngredient.UserId = _userRepository.getByLogin(login).Id;
            _userRepository.addIngredient(NIngredient);
            return NIngredient;
        }
        public UserDataDto getUserData(string login)
        {
            UserDataDto userData = new UserDataDto();
            User user = getUserByLogin_U(login);
            userData.userIngredients = readAllUserIngredients(login);
            userData.history = GetHistoryRecipes(user);
            userData.favorites = GetFavoritesRecipes(user);
            return userData;
        }
        public ListIngredientDto readAllUserIngredients(string login)
        {
            var ingredients = _userRepository.readIngredients(login);

            return _mapper.Map<ListIngredientDto>(ingredients);
        }
        public Dictionary<string, bool> dictionary(int id)
        {
            UserDto user = getUserById(id);
            if (user == null) return null;
            Dictionary<string, bool> dictionary = new Dictionary<string, bool>();
            foreach (UIngredientDto item in user.ingredients)
            {
                try
                {
                    dictionary.Add(item.Name, true);
                }
                catch (ArgumentException) { }
            }
            return dictionary;
        }

        public ArrayUserRecipesDto readAllICanCook(string login, int type)
        {
            Dictionary<string, bool> MyDictionary = dictionary(_userRepository.getByLogin(login).Id);
            var ones = _userRepository.findOnes(MyDictionary, type);
            return _mapper.Map<ArrayUserRecipesDto>(ones);
        }
        public void updateUser(string login, UpdateUser user)
        {
            var existingUser = _userRepository.getByLogin(login);
            if (existingUser == null) return;
            var updatedUser = _mapper.Map(user, existingUser);

            existingUser.Role = updatedUser.Role;
            existingUser.Name = updatedUser.Name;
            existingUser.Password = updatedUser.Password;

            _userRepository.updateUser(existingUser);
        }
        public User changeRole(User user, int role)
        {
            user.Role = role;
            _userRepository.updateUser(user);
            return user;
        }
        public void deleteIngredient(User user, string name)
        {
            _userRepository.deleteIngredient(_userRepository.getByUser(user, name));
        }
        public void updateIngredient(User user, string name, string newName)
        {
            var existingIngredient = _userRepository.getByUser(user, name);
            existingIngredient.Name = newName;
            _userRepository.updateIngredient(existingIngredient);
        }

        public ListMessageDto GetAllMessages()
        {
            return _mapper.Map<ListMessageDto>(_userRepository.GetMessages());
        }
        public Message WriteMessage(MessageDto message)
        {
            var newMessage = _mapper.Map<Message>(message);
            newMessage.Sent = DateTime.Now;
            _userRepository.WriteNewMessage(newMessage);
            return newMessage;
        }
        public void DeleteAllMessages()
        {
            _userRepository.DeleteMessages();
        }
        public ListRecipesDto GetFavoritesRecipes(User user)
        {
            var favorites = _userRepository.GetFavorites(user);
            return _mapper.Map<ListRecipesDto>(favorites);
        }
        public ListRecipesDto GetHistoryRecipes(User user)
        {
            var history = _userRepository.GetHistory(user);
            return _mapper.Map<ListRecipesDto>(history);
        }
    }
}
