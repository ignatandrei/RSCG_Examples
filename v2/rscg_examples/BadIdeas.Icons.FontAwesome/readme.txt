# BadIdeas.Icons

I had a bad idea about building out all the icons in Font Awesome in a huge blazor assembly and relying on dotnet trimming to keep the file size low.

This is the result.

## Install

```
dotnet add package BadIdeas.Icons.FontAwesome 
```

## Use

All the icons are components in the Icon namespace. They have zero styling, so you'll need to apply a width and a fill color with whatever CSS library you're into.

```csharp
@using BadIdeas.FontAwesome.Icons

<Icon Data="Brands.Github()" class="...your styling..."> </Icon>
```

## Neat

This will render the svg for the GitHub icon. No external javascript or CSS is needed for this, just a few KBs for the SVG content. And because of the assembly trimming, only the SVGs that are needed are deployed.