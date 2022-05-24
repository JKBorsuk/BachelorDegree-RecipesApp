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
        [HttpGet("IsLogged")]
        public IActionResult isLogged()
        {
            return Ok(HttpContext.Session.GetString("user"));
        }
        [HttpGet("Logout")]
        public IActionResult Logout()
        {
            HttpContext.Session.Remove("user");
            return Ok("User logged out");
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

        [HttpGet("Cooking/{login}/{type}")]
        public IActionResult findProperOnes(string login, int type)
        {
            if (HttpContext.Session.GetString("user") != login) return NotFound("No recepies were found");

            var ones = _userService.readAllICanCook(login,type);
            if (ones.AllRecipes[0] == null || ones.AllRecipes[0].Count == 0) return NotFound("No recepies were found");

            return Ok(ones);
        }
        [HttpGet("URole/{login}")]
        public IActionResult URole(string login)
        {
            var user = _userService.getUserByLogin(login);
            if(user == null) return NotFound();

            if (user.role == 2 && HttpContext.Session.GetString("user") == login) return Accepted();
            else if (user.role == 3 && HttpContext.Session.GetString("user") == login) return Ok();
            else return NoContent();
        }
        [HttpGet("ViewRole/{login}")]
        public IActionResult ViewRole(string login)
        {
            var user = _userService.getUserByLogin(login);
            if (user == null) return NotFound();

            return Ok(user.role);
        }
        [HttpPut("ChangeRole/{login}/{role}")]
        public IActionResult changeRole(string login,int role)
        {
            var user = _userService.getUserByLogin_U(login);
            if (user == null) return NotFound();

            var act_user = _userService.getUserByLogin(HttpContext.Session.GetString("user"));
            if (act_user.role > role && login != HttpContext.Session.GetString("user"))
            {
                return Ok(_userService.changeRole(user, role));
            }
            else return Unauthorized("Too low rank");
        }
        [HttpDelete("DeleteIngredient/{login}/{name}")]
        public IActionResult deleteUserIngredient(string login, string name)
        {
            if (HttpContext.Session.GetString("user") == login)
            {
                _userService.deleteIngredient(_userService.getUserByLogin_U(login), name);
                return Ok();
            }
            else return Unauthorized();
        }
    }
}
