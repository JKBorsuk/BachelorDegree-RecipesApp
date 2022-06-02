namespace ASPRjsAPI.Dto
{
    public class SessionUserDto
    {
        public int role { get; set; }
        public string name { get; set; }
        public string login { get; set; }
        public ListIngredientDto ingredients { get; set; }
        public ListIngredientDto allIngredients { get; set; }
    }
}
