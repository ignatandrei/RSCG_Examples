﻿using CCDemo;

ICoffee c =new Coffee();
c= new CoffeeWithLogging(c);
await c.Prepare();