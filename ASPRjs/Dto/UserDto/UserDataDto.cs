namespace ASPRjsAPI.Dto
{
    public class UserDataDto
    {
        public ListIngredientDto userIngredients { get; set; }
        public ListRecipesDto favorites { get; set; }
        public ListRecipesDto history { get; set; }
    }
}
