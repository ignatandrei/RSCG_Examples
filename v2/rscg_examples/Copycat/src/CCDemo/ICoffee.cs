﻿
namespace CCDemo;

internal interface ICoffee
{
    //for the moment does not work for properties in interface
    //string? Name { get; set; }
    Task<bool> Prepare();

    string[] GetIngredients();
}