﻿Console.WriteLine("Hello, World!");
var gitHubApi = RestService.For<IFindPosts>("https://jsonplaceholder.typicode.com/");
var data = await gitHubApi.GetPost(1);
Console.WriteLine(data.Title);