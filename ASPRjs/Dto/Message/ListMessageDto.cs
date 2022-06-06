namespace ASPRjsAPI.Dto
{
    public class ListMessageDto
    {
        public int Count { get; set; }
        public IEnumerable<MessageDto> Messages { get; set; }
    }
}
