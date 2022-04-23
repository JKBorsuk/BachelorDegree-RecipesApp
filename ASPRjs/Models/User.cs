using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ASPRjs.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        [Column(TypeName = "varchar(100)")]
        public string Name { get; set; }
        [Column(TypeName = "varchar(100)")]
        public string login { get; set; }
        public string password { get; set; }
        public List<UserIngredient> ingredients { get; set; }
        [DefaultValue(1)]
        public int role { get; set; } = 1; // 3 - HA, 2 - A, 1 - User

    }
}
