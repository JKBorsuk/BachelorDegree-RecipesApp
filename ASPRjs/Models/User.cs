using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ASPRjs.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName = "varchar(100)")]
        public string Name { get; set; }
        [Column(TypeName = "varchar(100)")]
        public string Login { get; set; }
        public string Password { get; set; }
        public List<UserIngredient> Ingredients { get; set; }
        public List<Vote> Votes { get; set; }
        public List<View> Views { get; set; }

        [DefaultValue(1)]
        public int Role { get; set; } = 1; // 3 - HA, 2 - A, 1 - User

    }
}
