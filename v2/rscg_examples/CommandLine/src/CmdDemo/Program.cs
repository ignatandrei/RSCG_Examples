﻿// See https://aka.ms/new-console-template for more information
using DotMake.CommandLine;

Cli.Run(([CliArgument] string PersonName, int  Age) =>
{
    Console.WriteLine($@"Value for {nameof(PersonName)} parameter is '{PersonName}'");
    Console.WriteLine($@"Value for {nameof(Age)} parameter is '{Age}'");
});


Cli.Run(([CliArgument] int idData) =>
{
    Console.WriteLine($@"Value for {nameof(idData)} parameter is '{idData}'");
    
});