using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ParkingLot.Migrations
{
    /// <inheritdoc />
    public partial class @enum : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Reserved",
                table: "ParkingSpots");

            migrationBuilder.RenameColumn(
                name: "isDeleted",
                table: "Subscriber",
                newName: "IsDeleted");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "PricingPlans",
                newName: "String");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsDeleted",
                table: "Subscriber",
                newName: "isDeleted");

            migrationBuilder.RenameColumn(
                name: "String",
                table: "PricingPlans",
                newName: "Type");

            migrationBuilder.AddColumn<int>(
                name: "Reserved",
                table: "ParkingSpots",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
