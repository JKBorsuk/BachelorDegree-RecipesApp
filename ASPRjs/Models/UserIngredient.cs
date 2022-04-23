using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ASPRjs.Models
{
    public class UserIngredient
    {
        [Key]
        public int UIngredientId { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string Name { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
    }
}
