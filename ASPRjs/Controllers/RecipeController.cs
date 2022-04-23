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
        [HttpGet("name")]
        public IActionResult Get(string name)
        {
            var recipe = _recipeService.getRecipe(name);
            if (recipe == null) return NotFound();
            return Ok(recipe);
        }


        [HttpGet("ViewAll")]
        public IActionResult ViewAll()
        {
            var recipes = _recipeService.getAllRecipes();
            return Ok(recipes);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _recipeService.removeRecipe(id);
            return NoContent();
        }

        [HttpPut("Update/{id}")]
        public IActionResult Update(int id, UpdateRecipe urecipe)
        {
            _recipeService.updateRecipe(id, urecipe);
            return Ok();
        }

        [HttpPost("AddRecipe")]
        public IActionResult addNewRecipe(RecipeDto recipe)
        {
            var rrecipe = _recipeService.addNewRecipe(recipe);
            return Created($"Dishes/Recipe/{rrecipe.Name.Replace(' ','-')}", rrecipe);
        }

        [HttpPost("SaveImage/{id}")]
        public JsonResult SaveImage(int id)
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = $"{id}_{postedFile.FileName}";
                var physicalPath = _env.ContentRootPath + "/Images/" + filename;

                using(var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                    stream.Close();
                }
                _recipeService.changeImage(id, filename);

                return new JsonResult(filename);
            }
            catch (Exception ex)
            {
                return new JsonResult("Noimg.png");
            }
        }
    }
}
