namespace ASPRjsAPI.Dto
{
    public class ListIngredientDto
    {
        public int Count { get; set; }
        public IEnumerable<string> Ingredients { get; set; }
    }
}
