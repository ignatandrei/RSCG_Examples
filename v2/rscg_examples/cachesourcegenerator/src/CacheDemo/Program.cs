﻿using CacheDemo;
using Microsoft.Extensions.Caching.Memory;
var f=new FibTest(new MemoryCache(new MemoryCacheOptions()));
Console.WriteLine(f.FibMemo(5));
Console.WriteLine("and now with cache hit:");
Console.WriteLine(f.FibMemo(5));
