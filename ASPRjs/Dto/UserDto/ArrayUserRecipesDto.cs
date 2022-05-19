namespace ASPRjsAPI.Dto
{
    public class ArrayUserRecipesDto
    {
        public int Count { get; set; }
        public List<RecipeDto>[] AllRecipes { get; set; }
    }
}
