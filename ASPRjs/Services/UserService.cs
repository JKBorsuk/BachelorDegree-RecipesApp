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

        public Dictionary<string, bool> dictionary(int id)
        {
            UserDto user = getUserById(id);
            if(user == null) return null;
            Dictionary<string, bool> dict = new Dictionary<string, bool>();
            foreach(UIngredientDto item in user.ingredients)
            {
                try
                {
                    dict.Add(item.Name, true);
                }
                catch (ArgumentException) {}
            }

            return dict;
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

        public UserIngredient AddNewIngredient(UIngredientDto uing, string login)
        {
            if(uing.Name == null) return null;
            var NIngredient = _mapper.Map<UserIngredient>(uing);
            NIngredient.UserId = _userRepository.getByLogin(login).UserId;
            _userRepository.addIngredient(NIngredient);
            return NIngredient;
        }
        public ListIngredientDto readAllUserIngredients(string login)
        {
            var ingredients = _userRepository.readIngredients(login);

            return _mapper.Map<ListIngredientDto>(ingredients);
        }

        public ArrayUserRecipesDto readAllICanCook(string login, int type)
        {
            Dictionary<string, bool> MyDictionary = dictionary(_userRepository.getByLogin(login).UserId);
            if(MyDictionary == null) return null;

            var ones = _userRepository.findOnes(MyDictionary, type);
            return _mapper.Map<ArrayUserRecipesDto>(ones);
        }
        public void updateUser(string login, UpdateUser user)
        {
            var existingUser = _userRepository.getByLogin(login);
            if (existingUser == null) return;
            var updatedUser = _mapper.Map(user, existingUser);

            existingUser.role = updatedUser.role;
            existingUser.Name = updatedUser.Name;
            existingUser.password = updatedUser.password;

            _userRepository.updateUser(existingUser);
        }
        public User changeRole(User user, int role)
        {
            user.role = role;
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
    }
}
