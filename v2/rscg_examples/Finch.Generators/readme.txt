# Finch - database mapping extension methods source generator

## Introduction

Finch is c# source generator designed to simplify database interactions by generating concise extension methods for
database queries mappings.

## Getting Started

1. Install the Finch NuGet packages:
    ```bash
    $ dotnet add package Finch.Abstractions
    $ dotnet add package Finch.Generators
    ```
2. Mark the required type with an [attribute](https://github.com/ivmazurenko/Finch/tree/master/Finch.Abstractions) corresponding to your desired database:
   ```c#
   [GenerateSqlserverConnectionExtensions]
   public class TbUser
   {
      public int id { get; set; }
      public string name { get; set; }
   }
   ```
3. Use the extension method for your type:

   ```c#
   var connection = new SqlConnection(connectionString);
   var items = await connection.QueryAsync<TbUser>("select * from tb_user");
   ```

## Contribution

Contributions to Finch are welcome! If you encounter any issues or have ideas for improvement, feel free to open an
issue or submit a pull request on GitHub.

## License

Finch is licensed under the MIT License.