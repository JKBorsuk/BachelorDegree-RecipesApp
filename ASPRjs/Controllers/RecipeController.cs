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
        private readonly IWebHostEnvironment _env;

        public RecipeController(IRecipeService recipeService, IWebHostEnvironment env)
        {
            _recipeService = recipeService;
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

        [HttpPost("AddRecipe")]
        public IActionResult addNewRecipe(RecipeDto recipe)
        {
            var rrecipe = _recipeService.addNewRecipe(recipe);
            return Created($"Dishes/Recipe/{rrecipe.LinkName}", rrecipe);
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
                _recipeService.changeImage(linkname, filename);

                return new JsonResult(filename);
            }
            catch (Exception ex)
            {
                return new JsonResult("Noimg.png");
            }
        }
    }
}
