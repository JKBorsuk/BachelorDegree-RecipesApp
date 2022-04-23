namespace ASPRjsAPI.Dto
{
    public class UserDto
    {
        public int role { get; set; }
        public string name { get; set; }
        public string login { get; set; }
        public List<UIngredientDto> ingredients { get; set; }
    }
}
