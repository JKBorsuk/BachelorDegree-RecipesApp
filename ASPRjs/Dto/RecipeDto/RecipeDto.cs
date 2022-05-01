using ASPRjs.Models;

namespace ASPRjsAPI.Dto
{
    public class RecipeDto
    {
        public int Type { get; set; }
        public string Name { get; set; }
        public List<RIngredientDto> Ingredients { get; set; }

        public List<RSpiceDto> Spices { get; set; }
        public string Description { get; set; }
        public string Source { get; set; }
        public string PhotoFileName { get; set; }
        public string LinkName { get; set; }
    }
}
