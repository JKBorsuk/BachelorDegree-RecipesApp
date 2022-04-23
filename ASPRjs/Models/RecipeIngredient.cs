using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ASPRjs.Models
{
    public class RecipeIngredient
    {
        [Key]
        public int RIngredientId { get; set; }
        [Column(TypeName = "varchar(100)")]
        public string Name { get; set; }
        [Column(TypeName = "varchar(100)")]
        public string Amount { get; set; }
        public int RecipeId { get; set; }
        public Recipe Recipe { get; set; }
    }
}
