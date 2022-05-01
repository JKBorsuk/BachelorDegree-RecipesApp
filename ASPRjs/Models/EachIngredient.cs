using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ASPRjs.Models
{
    public class EachIngredient
    {
        [Key]
        public int EachIngredientId { get; set; }
        [Column(TypeName = "varchar(100)")]
        public string Name { get; set; }
    }
}
