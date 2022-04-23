using ASPRjs.Models;
using ASPRjsAPI.Dto;
using Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ASPRjs.Controllers
{
    [ApiController]
    [Route("Community/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpGet("{login}")]
        public IActionResult getUser(string login)
        {
            if(login == "") return NotFound("User does not exist");

            var user = _userService.getUserByLogin(login);
            if(user == null) return NotFound("User does not exist");
            return Ok(user);
        }

        [HttpGet("Ingredients/{login}")]
        public IActionResult readIngredients(string login)
        {
            if (_userService.getUserByLogin(login) == null) return NotFound("User does not exist");
            var ingredients = _userService.readAllUserIngredients(login);
            return Ok(ingredients);
        }

        [HttpPost("Register")]
        public IActionResult Register(RegisterUser ruser)
        {
            var user = _userService.addNewUser(ruser);
            return Created($"api/users/{user.login}", user);
        }

        [HttpPost("AddIngredient/{login}")]
        public IActionResult addIngredients(UIngredientDto userIngredient, string login)
        {
            var ingredient = _userService.AddNewIngredient(userIngredient, login);
            return Created($"api/users/Ingredients/{ingredient.UIngredientId}", ingredient);
        }

        [HttpPost("Login")]
        public IActionResult login(LoginUser user)
        {
            var loginuser = _userService.getUserByLogin_U(user.login);
            if (loginuser == null) return NotFound("Bad login or password");

            if (loginuser.password == user.password)
            {
                HttpContext.Session.SetString("user", loginuser.login);
                return Ok();
            }
            else return NotFound("Bad login or password");
        }
        [HttpPut("Update/{login}")]
        public IActionResult Update(string login, UpdateUser user)
        {
            if (user == null) return NotFound();

            _userService.updateUser(login, user);
            return Ok();
        }

        [HttpPost("Cooking/{login}")]
        public IActionResult findProperOnes(string login)
        {
            var ones = _userService.readAllICanCook(login);
            if(ones == null || ones.Count == 0) return NotFound("No recepies were found");

            return Ok(ones);
        }
    }
}
