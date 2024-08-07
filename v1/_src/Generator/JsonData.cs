﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Generator
{
    
    public class Generator
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("nuget")]
        public string[] Nuget { get; set; }

        [JsonPropertyName("link")]
        public string Link { get; set; }

        [JsonPropertyName("author")]
        public string Author { get; set; }

        [JsonPropertyName("source")]
        public string Source { get; set; }

        public string MarkDownNugetDownloads
        {
            get
            {
                if ((Nuget?.Length ?? 0) == 0)
                    return "";
                var l = "https://www.nuget.org/packages/".Length;
                var name = Nuget[0].Substring(l);
                if (name.EndsWith("/"))
                    name = name.Substring(0, name.Length - 1);
                return $"![Nuget](https://img.shields.io/nuget/dt/{name}?label=Nuget)";
            }
        }
        public string MarkdownLastCommit
        {
            get
            {
                var strShields = "https://img.shields.io";
                var data = Source.Split("/",StringSplitOptions.RemoveEmptyEntries);
                var site = data[1].Replace(".com", "");
                var user = data[2];
                var repo = data[3];
                return $"![GitHub last commit]({strShields}/{site}/last-commit/{user}/{repo}?label=updated)";
            }
        }
        public string MarkDownStars
        {
            get
            {
                var strShields = "https://img.shields.io";
                var data = Source.Split("/", StringSplitOptions.RemoveEmptyEntries);
                var site = data[1].Replace(".com", "");
                var user = data[2];
                var repo = data[3];
                return $"![GitHub Repo stars]({strShields}/{site}/stars/{user}/{repo}?style=social)";
            }
        }
    }

    public class Data
    {
        [JsonPropertyName("goodFor")]
        public string GoodFor { get; set; }

        [JsonPropertyName("existingCode")]
        public string[] ExistingCode { get; set; }

        [JsonPropertyName("usage")]
        public string[] Usage { get; set; }

        [JsonPropertyName("generatedCode")]
        public string[] GeneratedCode { get; set; }
    }

    public class Links
    {
        [JsonPropertyName("blog")]
        public string Blog { get; set; }

        [JsonPropertyName("video")]
        public string Video { get; set; }
    }

    public class Description
    {
        public int Nr;

        [JsonPropertyName("generator")]
        public Generator Generator { get; set; }

        [JsonPropertyName("data")]
        public Data Data { get; set; }

        [JsonPropertyName("links")]
        public Links Links { get; set; }

        public string rootFolder;

        public bool HaveAuthorAnswered;

        public string authorMD;
    }


}
