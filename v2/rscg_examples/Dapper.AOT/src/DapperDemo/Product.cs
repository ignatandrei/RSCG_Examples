
namespace DapperDemo;
internal partial class Product
{
    public int ID { get; set; }
    public string Name { get; set; } = "";
    public string ProductId { get; set; } = ""; 
    public static Product GetProduct(SqlConnection connection, int productId) => connection.QueryFirst<Product>(
    "select ID, Name, ProductId from Production.Product where ProductId=@productId", new { productId });
}
