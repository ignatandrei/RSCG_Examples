﻿namespace RefitDemo;
public interface IFindPosts
{
    [Get("/posts/{nr}")]
    Task<Post> GetPost(long nr);
}
