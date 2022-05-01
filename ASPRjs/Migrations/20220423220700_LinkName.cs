using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ASPRjs.Migrations
{
    public partial class LinkName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LinkName",
                table: "Recipes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LinkName",
                table: "Recipes");
        }
    }
}
