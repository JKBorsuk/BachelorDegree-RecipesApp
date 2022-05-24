using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ASPRjs.Migrations
{
    public partial class onmodelcreating : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "role",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 1,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "PhotoFileName",
                table: "Recipes",
                type: "varchar(75)",
                nullable: true,
                defaultValue: "Noimg.png",
                oldClrType: typeof(string),
                oldType: "varchar(75)",
                oldDefaultValue: "Noimg.png");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "role",
                table: "Users",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldDefaultValue: 1);

            migrationBuilder.AlterColumn<string>(
                name: "PhotoFileName",
                table: "Recipes",
                type: "varchar(75)",
                nullable: false,
                defaultValue: "Noimg.png",
                oldClrType: typeof(string),
                oldType: "varchar(75)",
                oldNullable: true,
                oldDefaultValue: "Noimg.png");
        }
    }
}
