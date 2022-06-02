using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ASPRjs.Migrations
{
    public partial class newKeys : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "role",
                table: "Users",
                newName: "Role");

            migrationBuilder.RenameColumn(
                name: "password",
                table: "Users",
                newName: "Password");

            migrationBuilder.RenameColumn(
                name: "login",
                table: "Users",
                newName: "Login");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Users",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "UIngredientId",
                table: "UserIngredients",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "RSpiceId",
                table: "RecipeSpices",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "RecipeId",
                table: "Recipes",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "RIngredientId",
                table: "RecipeIngredients",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "EachIngredientId",
                table: "Ingredients",
                newName: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Role",
                table: "Users",
                newName: "role");

            migrationBuilder.RenameColumn(
                name: "Password",
                table: "Users",
                newName: "password");

            migrationBuilder.RenameColumn(
                name: "Login",
                table: "Users",
                newName: "login");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Users",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "UserIngredients",
                newName: "UIngredientId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "RecipeSpices",
                newName: "RSpiceId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Recipes",
                newName: "RecipeId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "RecipeIngredients",
                newName: "RIngredientId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Ingredients",
                newName: "EachIngredientId");
        }
    }
}
