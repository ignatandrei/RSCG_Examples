﻿namespace Decorator;
internal interface ICoffee
{
    Task<bool> Prepare();

    string[] GetIngredients();
}
