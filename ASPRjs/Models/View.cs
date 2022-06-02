using System.ComponentModel.DataAnnotations;

namespace ASPRjs.Models
{
    public class View
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int RecipeId { get; set; }
        public Recipe Recipe { get; set; }
    }
}
