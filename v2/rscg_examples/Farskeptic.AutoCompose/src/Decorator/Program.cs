﻿using Decorator;

ICoffee c = new Coffee();
c = new CoffeeWithLogging(c);
await c.Prepare();
var ingredients = c.GetIngredients();