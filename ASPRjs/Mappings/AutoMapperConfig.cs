using AutoMapper;
using ASPRjsAPI.Dto;
using ASPRjs.Models;

namespace ASPRjsAPI.Mappings
{
    public class AutoMapperConfig
    {
        public static IMapper Initialize()
            => new MapperConfiguration(cfg =>
            {

                #region User

                cfg.CreateMap<RegisterUser, User>();
                cfg.CreateMap<LoginUser, User>();
                cfg.CreateMap<UpdateUser, User>();
                cfg.CreateMap<User, UserDto>()
                .ForMember(cfg => cfg.ingredients, act => act.MapFrom(src => src.ingredients))
                .ForMember(cfg => cfg.login, act => act.MapFrom(src => src.login))
                .ForMember(cfg => cfg.role, act => act.MapFrom(src => src.role))
                .ForMember(cfg => cfg.name, act => act.MapFrom(src => src.Name));

                #endregion

                #region Ingredient

                #region Ingredients U

                cfg.CreateMap<UIngredientDto, UserIngredient>();
                cfg.CreateMap<UserIngredient, UIngredientDto>();

                cfg.CreateMap<ReadIngredientDto, UserIngredient>();
                cfg.CreateMap<UserIngredient, ReadIngredientDto>();

                #endregion

                #region Ingredients R

                cfg.CreateMap<RIngredientDto, RecipeIngredient>();
                cfg.CreateMap<RecipeIngredient, RIngredientDto>();

                cfg.CreateMap<RSpiceDto, RecipeSpice>();
                cfg.CreateMap<RecipeSpice, RSpiceDto>();

                #endregion

                cfg.CreateMap<IEnumerable<string>, ListIngredientDto>()
                .ForMember(dest => dest.Ingredients, act => act.MapFrom(src => src))
                .ForMember(dest => dest.Count, act => act.MapFrom(src => src.Count()));

                #endregion


                #region Recipe

                cfg.CreateMap<UpdateRecipe, Recipe>();
                cfg.CreateMap<RecipeDto, Recipe>();
                cfg.CreateMap<Recipe, RecipeDto>();
                cfg.CreateMap<IEnumerable<Recipe>, ListRecipesDto>()
                .ForMember(dest => dest.Recipes, act => act.MapFrom(src => src))
                .ForMember(dest => dest.Count, act => act.MapFrom(src => src.Count()));

                cfg.CreateMap<List<Recipe>, UserRecipesListDto>()
                .ForMember(dest => dest.Recipes, act => act.MapFrom(src => src))
                .ForMember(dest => dest.Count, act => act.MapFrom(src => src.Count()));

                #endregion

            }).CreateMapper();
    }
}
