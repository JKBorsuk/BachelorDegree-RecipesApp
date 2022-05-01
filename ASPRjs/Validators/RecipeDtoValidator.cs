using ASPRjs.Models;
using ASPRjsAPI.Dto;
using FluentValidation;

namespace ASPRjsAPI.Validators
{
    public class RecipeDtoValidator : AbstractValidator<RecipeDto>
    {
        public RecipeDtoValidator(RecipeMasterDbContext DbContext)
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Name).MaximumLength(100);
            RuleFor(x => x.LinkName)
                .Custom((value, context) =>
                {
                    var RecipesInDatabase = DbContext.Recipes.Any(x => x.LinkName == value);
                    if (RecipesInDatabase)
                    {
                        context.AddFailure("LinkName", "Recipe with that linkname already exists");
                    }
                });
            RuleFor(x => x.Type).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
        }
    }
}
