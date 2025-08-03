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
        private readonly IRecipeService _recipeService;

        public UserController(IUserService userService, IRecipeService recipeService)
        {
            _userService = userService;
            _recipeService = recipeService;
        }
        [HttpGet("{login}")]
        public IActionResult getUser(string login)
        {
            if(login == null) return NotFound("User does not exist");

            var user = _userService.getUserByLogin(login);
            if(user == null) return NotFound("User does not exist");
            return Ok(user);
        }
        [HttpGet("IsLogged")]
        public IActionResult isLogged()
        {
            var user = _userService.getUserByLogin(HttpContext.Session.GetString("user")); ;
            if (user == null) return NoContent();

            return Ok(
                new SessionUserDto
                {
                    login = user.login,
                    name = user.name,
                    role = user.role,
                    ingredients = _userService.readAllUserIngredients(user.login),
                    allIngredients = _recipeService.getAllIngredients()
                });
        }

        [HttpGet("getCookie")]
        public IActionResult getCookie()
        {
            return Ok(Request.Cookies["acceptance"] != null ? Request.Cookies["acceptance"] : null);
        }

        [HttpPut("setCookie")]
        public IActionResult setCookie()
        {
            CookieOptions options = new CookieOptions();
            options.Expires = DateTime.Now.AddMonths(1);
            Response.Cookies.Append("acceptance", "1", options);
            return Ok();
        }

        [HttpGet("UserData")]
        public IActionResult getUserData()
        {
            var login = HttpContext.Session.GetString("user");
            if (login == null) return NotFound("User does not exist");

            var ingredients = _userService.getUserData(login);
            return Ok(ingredients);
        }

        [HttpGet("GetMessages")]
        public IActionResult GetMessages()
        {
            var userLogin = HttpContext.Session.GetString("user");
            if (userLogin != null)
            {
                if (_userService.getUserByLogin_U(userLogin).Role != 3) return NoContent();

                var messages = _userService.GetAllMessages();
                if (messages == null) return NoContent();

                return Ok(messages);
            }
            else return NoContent();

        }

        [HttpPost("WriteMessage")]
        public IActionResult WriteMessage(MessageDto message)
        {
            var mess = _userService.WriteMessage(message);
            return Created($"Community/User/WriteMessage/{message.UserLogin}", message);
        }

        [HttpDelete("Messages")]
        public IActionResult DeleteMessages()
        {
            if (_userService.getUserByLogin_U(HttpContext.Session.GetString("user")).Role != 3) return Unauthorized();

            _userService.DeleteAllMessages();

            return Ok();

        }

        [HttpGet("Logout")]
        public IActionResult Logout()
        {
            HttpContext.Session.Remove("user");
            return Ok("User logged out");
        }

        [HttpGet("Ingredients")]
        public IActionResult readIngredients()
        {
            var login = HttpContext.Session.GetString("user");
            if(login == null) return NotFound("User does not exist");

            var ingredients = _userService.readAllUserIngredients(login);
            return Ok(ingredients);
        }

        [HttpPost("Register")]
        public IActionResult Register(RegisterUser ruser)
        {
            var user = _userService.addNewUser(ruser);
            return Created($"Community/User/{user.Login}", user);
        }

        [HttpPost("AddIngredient")]
        public IActionResult addIngredients(UIngredientDto userIngredient)
        {
            var login = HttpContext.Session.GetString("user");
            if (login == null) return NoContent();
            else if (_userService.getUserByLogin_U(login).Ingredients.Count + 1 > 50) return Unauthorized("Limit");

            var ingredient = _userService.AddNewIngredient(userIngredient, HttpContext.Session.GetString("user"));
            return Created($"Community/User/Ingredients/{ingredient.Id}", ingredient);
        }

        [HttpPost("AddIngredients")]
        public IActionResult addMultiIngredients(ArrayUIngredientDto userIngredients)
        {
            var login = HttpContext.Session.GetString("user");
            if (login == null) return NoContent();
            if (_userService.getUserByLogin_U(login).Ingredients.Count + userIngredients.UIngredients.Length > 50) return Unauthorized("Limit");

            _userService.addMulitIngredients(userIngredients,login);
            return Created($"Community/User/Ingredients",1);
        }

        [HttpPost("Login")]
        public IActionResult login(LoginUser user)
        {
            var loginuser = _userService.getUserByLogin_U(user.login);
            if (loginuser == null) return NotFound("Bad login or password");

            if (loginuser.Password == user.password)
            {
                HttpContext.Session.SetString("user", loginuser.Login);
                return Ok();
            }
            else return NotFound("Bad login or password");
        }

        [HttpPut("Update")]
        public IActionResult Update(UpdateUser user)
        {
            var mainUser = _userService.getUserByLogin_U(HttpContext.Session.GetString("user"));
            if (user == null || mainUser == null) return NotFound();

            _userService.updateUser(mainUser.Login, user);
            return Ok();
        }

        [HttpGet("Cooking/{type}")]
        public IActionResult findProperOnes(int type)
        {
            var user = _userService.getUserByLogin_U(HttpContext.Session.GetString("user"));
            if (user == null) return NotFound("No recepies were found");

            var recipes = _userService.readAllICanCook(user.Login, type);
            if (recipes.AllRecipes[0].Count == 0 && recipes.AllRecipes[1].Count == 0) return NotFound("No recepies were found");

            return Ok(recipes);
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

        [HttpGet("GetName/{login}")]
        public IActionResult ViewName(string login)
        {
            var user = _userService.getUserByLogin(login);
            if (user == null) return NotFound("Bad login or user does not exist");

            return Ok(user.name);
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

        [HttpDelete("DeleteIngredient/{name}")]
        public IActionResult deleteUserIngredient(string name)
        {
            var login = HttpContext.Session.GetString("user");
            if (login != null)
            {
                _userService.deleteIngredient(_userService.getUserByLogin_U(login), name);
                return Ok();
            }
            else return Unauthorized();
        }

        [HttpPut("UpdateIngredient/{name},{newname}")]
        public IActionResult updateIngredient(string name, string newname)
        {
            var login = HttpContext.Session.GetString("user");
            if (login != null)
            {
                _userService.updateIngredient(_userService.getUserByLogin_U(login), name, newname);
                return Ok(newname);
            }
            else return Unauthorized(name);
        }

        [HttpGet("Favorites")]
        public IActionResult GetFavorites()
        {
            var user = _userService.getUserByLogin_U(HttpContext.Session.GetString("user"));
            if (user == null) return Unauthorized();

            var recipes = _userService.GetFavoritesRecipes(user);

            if (recipes == null) return NoContent();
            return Ok(recipes);
        }

        [HttpGet("History")]
        public IActionResult GetHistory()
        {
            var user = _userService.getUserByLogin_U(HttpContext.Session.GetString("user"));
            if (user == null) return Unauthorized();

            var recipes = _userService.GetHistoryRecipes(user);

            if (recipes == null) return NoContent();
            return Ok(recipes);
        }
    }
}
