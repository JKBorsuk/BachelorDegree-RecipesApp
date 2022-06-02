using FluentValidation;
using ASPRjsAPI.Dto;
using ASPRjs.Models;

namespace ASPRjsAPI.Validators
{
    public class RegisterDtoValidator : AbstractValidator<RegisterUser>
    {
        public RegisterDtoValidator(RecipeMasterDbContext DbContext)
        {
            RuleFor(x => x.login).NotEmpty();
            RuleFor(x => x.login).MaximumLength(100);
            RuleFor(x => x.login)
                .Custom((value, context) =>
                {
                    var usersInDatabase = DbContext.Users.Any(c => c.Login == value);
                    if (usersInDatabase)
                    {
                        context.AddFailure("Login", "This user already exists");
                    }
                });
            RuleFor(x => x.name).NotEmpty();
            RuleFor(x => x.name).MaximumLength(100);
            RuleFor(x => x.password).NotEmpty();
        }
    }
}
