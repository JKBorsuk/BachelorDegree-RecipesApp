using ASPRjs.Models;
using ASPRjsAPI.Dto;
using Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ASPRjs.Controllers
{
    [ApiController]
    [Route("Dishes/[controller]")]
    public class RecipeController : ControllerBase
    {
        private readonly IRecipeService _recipeService;
        private readonly IUserService _userService;
        private readonly IWebHostEnvironment _env;

        public RecipeController(IRecipeService recipeService, IUserService userService, IWebHostEnvironment env)
        {
            _recipeService = recipeService;
            _userService = userService;
            _env = env;
        }

        [HttpGet("{linkname}/{login}")]
        public IActionResult Get(string linkname, string login)
        {
            var recipe = _recipeService.getRecipe(linkname);
            recipe.userVote = _recipeService.GetUserVote(linkname, _userService.getUserByLogin_U(login));
            if (recipe == null) return NotFound();
            return Ok(recipe);
        }

        [HttpGet("ViewIngredients")]
        public IActionResult GetIngredients()
        {
            var ingredients = _recipeService.getAllIngredients();
            return Ok(ingredients);
        }

        [HttpGet("ViewAll")]
        public IActionResult ViewAll()
        {
            var recipes = _recipeService.getAllRecipes();
            return Ok(recipes);
        }

        [HttpDelete("{linkname}")]
        public IActionResult Delete(string linkname)
        {
            _recipeService.removeRecipe(linkname);
            return NoContent();
        }

        [HttpPut("Update/{linkname}")]
        public IActionResult Update(string linkname, UpdateRecipe urecipe)
        {
            _recipeService.updateRecipe(linkname, urecipe);
            return Ok();
        }

        [HttpPost("Add/{login}")]
        public IActionResult AddNewRecipe(string login, AddRecipeDto recipe)
        {
            var user = _userService.getUserByLogin(login);
            if (user.role > 1 && HttpContext.Session.GetString("user") == login)
            {
                var rrecipe = _recipeService.addNewRecipe(recipe);
                return Created($"Dishes/Recipe/{rrecipe.LinkName}", rrecipe);
            }
            else return Unauthorized();
        }

        [HttpGet("GetImage/{linkname}")]
        public IActionResult GetImage(string linkname)
        {
            var recipe = _recipeService.getRecipe(linkname);
            if (recipe == null) return NotFound();
            return Ok(recipe);
        }

        [HttpPost("SaveImage/{linkname}")]
        public JsonResult SaveImage(string linkname)
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = $"{linkname}-{postedFile.FileName}";
                var physicalPath = _env.ContentRootPath + "/Images/" + filename;

                using(var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                    stream.Close();
                }
                return new JsonResult(filename);
            }
            catch (Exception ex)
            {
                return new JsonResult("Noimg.png");
            }
        }

        [HttpGet("GetThree")]
        public IActionResult getNewest()
        {

            var list0 = _recipeService.getBestRecipes();

            var list1 = _recipeService.getMostPopularRecipes();

            var list2 = _recipeService.getNewestRecipes();

            var list3 = _recipeService.getSmallestRecipes();


            if (list0 == null && list1 == null && list2 == null && list3 == null) return NotFound();

            return Ok(new ListRecipesDto[] { list0, list1, list2, list3 });
        }

        [HttpGet("GetVotes/{linkname}")]
        public IActionResult GetVotes(string linkname)
        {
            var recipe = _recipeService.getRecipe(linkname);
            if(recipe == null) return NotFound();

            return Ok(recipe.votes);
        }

        [HttpPut("{linkname}/{login}/{vote}")]
        public IActionResult RecipeVote(string linkname, string login, int vote)
        {
            var user = _userService.getUserByLogin_U(login);
            var recipe = _recipeService.RecipeVote(linkname, user, vote);
            if (!recipe) return NotFound();
            return Ok(recipe);
        }

        [HttpPut("{linkname}/{login}")]
        public IActionResult RecipeView(string linkname, string login)
        {
            var user = _userService.getUserByLogin_U(login);
            var recipe = _recipeService.RecipeView(linkname, user);
            if (!recipe) return NotFound();
            return Ok(recipe);
        }

        [HttpGet("search/{keys}")]
        public IActionResult RecipeSearch(string keys)
        {
            var recipes = _recipeService.RecipeSearch(keys);
            if (recipes == null) return NotFound("Not found");

            return Ok(recipes);
        }
    }
}
