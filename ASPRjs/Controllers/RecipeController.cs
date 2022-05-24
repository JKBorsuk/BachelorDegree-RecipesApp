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
        [HttpGet("{linkname}")]
        public IActionResult Get(string linkname)
        {
            var recipe = _recipeService.getRecipe(linkname);
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

        [HttpPost("AddRecipe/{login}")]
        public IActionResult addNewRecipe(string login,RecipeDto recipe)
        {
            var user = _userService.getUserByLogin(login);
            if (user.role > 1 && HttpContext.Session.GetString("user") == login)
            {
                var rrecipe = _recipeService.addNewRecipe(recipe);
                return Created($"Dishes/Recipe/{rrecipe.LinkName}", rrecipe);
            }
            else { return Unauthorized(); }
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

        [HttpGet("GetThreeNewest")]
        public IActionResult getNewest()
        {
            var list = _recipeService.getNewestRecipes();
            if (list == null) return NotFound();

            return Ok(list);
        }
    }
}
