// See https://aka.ms/new-console-template for more information
using DB;
using Microsoft.Data.SqlClient;

Console.WriteLine("Hello, World!");
string connectionString="not set";
var connection = new SqlConnection(connectionString);
var items = await connection.QueryAsync<Person>("select * from Person");