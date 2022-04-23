namespace ASPRjsAPI.Dto
{
    public class ListRecipesDto
    {
        public int Count { get; set; }
        public IEnumerable<RecipeDto> Recipes { get; set; }
    }
}
