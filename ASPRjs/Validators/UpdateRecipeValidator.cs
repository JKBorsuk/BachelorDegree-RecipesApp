using ASPRjs.Models;
using ASPRjsAPI.Dto;
using FluentValidation;

namespace ASPRjsAPI.Validators
{
    public class UpdateRecipeValidator : AbstractValidator<UpdateRecipe>
    {
        public UpdateRecipeValidator(RecipeMasterDbContext context)
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Name).MaximumLength(100);
            RuleFor(x => x.Type).NotEmpty();
        }
    }
}
