using System.ComponentModel.DataAnnotations;

namespace ASPRjs.Models
{
    public class Message
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string UserMessage { get; set; }
        [Required]
        public string UserLogin { get; set; }
        public DateTime Sent { get; set; }
    }
}
