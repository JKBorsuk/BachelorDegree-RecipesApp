using ASPRjs.Models;
using ASPRjsAPI.Dto;
using FluentValidation;

namespace ASPRjsAPI.Validators
{
    public class RecipeDtoValidator : AbstractValidator<RecipeDto>
    {
        public RecipeDtoValidator(RecipeMasterDbContext context)
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Name).MaximumLength(100);
            RuleFor(x => x.Type).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
        }
    }
}
