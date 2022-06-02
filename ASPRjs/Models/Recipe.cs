using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ASPRjs.Models
{
    public class Recipe
    {
        [Key]
        public int Id { get; set; }
        public int votes { get; set; }
        public int Type { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string Name { get; set; }

        public List<RecipeIngredient> Ingredients { get; set; }
        public List<RecipeSpice> Spices { get; set; }
        public List<Vote> Votes { get; set; }
        public List<View> Views { get; set; }

        [Column(TypeName = "varchar(MAX)")]
        public string Description { get; set; }
        [Column(TypeName = "varchar(MAX)")]
        public string PhotoFileName { get; set; } = "Noimg.png";
        public string LinkName { get; set; }
        public string Source { get; set; } = "";

    }
}
