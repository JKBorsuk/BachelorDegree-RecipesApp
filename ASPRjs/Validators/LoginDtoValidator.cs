using ASPRjs.Models;
using ASPRjsAPI.Dto;
using FluentValidation;

namespace ASPRjsAPI.Validators
{
    public class LoginDtoValidator : AbstractValidator<LoginUser>
    {
        public LoginDtoValidator(RecipeMasterDbContext context)
        {
            RuleFor(x => x.login).NotEmpty();
            RuleFor(x => x.login).MaximumLength(100);
        }
    }
}
