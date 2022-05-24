using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ASPRjs.Migrations
{
    public partial class photofilenamemax : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "PhotoFileName",
                table: "Recipes",
                type: "varchar(MAX)",
                nullable: true,
                defaultValue: "Noimg.png",
                oldClrType: typeof(string),
                oldType: "varchar(75)",
                oldNullable: true,
                oldDefaultValue: "Noimg.png");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "PhotoFileName",
                table: "Recipes",
                type: "varchar(75)",
                nullable: true,
                defaultValue: "Noimg.png",
                oldClrType: typeof(string),
                oldType: "varchar(MAX)",
                oldNullable: true,
                oldDefaultValue: "Noimg.png");
        }
    }
}
