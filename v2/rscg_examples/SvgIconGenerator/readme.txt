# SVG Icon Generator

A C# source generator that automatically creates strongly-typed icon properties from SVG files.

## Installation

Install the NuGet package in your project:

```bash
dotnet add package SvgIconGenerator
```

## Usage

### 1. Organize Your SVG Files

Place your SVG icon files in a folder within your project (e.g., `Icons/`):

```
YourProject/
├── Icons/
│   ├── user-circle.svg
│   ├── home.svg
│   └── settings.svg
└── Program.cs
```

### 2. Add SVG Files as AdditionalFiles

In your `.csproj` file, add the SVG files as `AdditionalFiles`:

```xml
<ItemGroup>
  <AdditionalFiles Include="Icons/*.svg" />
</ItemGroup>
```

**Important**: Adding files as `AdditionalFiles` ensures that changes to SVG files trigger regeneration during incremental compilation.

### 3. Create an Icon Class

Create a `static partial` class and decorate it with the `[GenerateIcons]` attribute:

```csharp
[GenerateIcons]
internal static partial class MyIcons;
```

You can optionally specify a glob pattern to filter which SVG files to include:

```csharp
// Include all SVG files from AdditionalFiles
[GenerateIcons]
internal static partial class AllIcons;

// Filter by glob pattern
[GenerateIcons("Icons/*.svg")]
internal static partial class MyIcons;
```

### 4. Access Generated Icons

The source generator will create properties for each SVG file. Property names are automatically converted from kebab-case to PascalCase:

```csharp
// user-circle.svg becomes UserCircle
IconDto icon = MyIcons.UserCircle;

Console.WriteLine($"Icon name: {icon.Name}");
Console.WriteLine($"ViewBox: {icon.DefaultAttributes["viewBox"]}");
Console.WriteLine($"SVG content: {icon.InnerContent}");
```

### 5. Render Icons

The `IconDto` contains everything needed to render the icon:

```csharp
public static string RenderIcon(IconDto icon, Dictionary<string, string>? customAttributes = null)
{
    // Merge default attributes with custom overrides
    var attributes = new Dictionary<string, string>(icon.DefaultAttributes);
    if (customAttributes != null)
    {
        foreach (var kvp in customAttributes)
        {
            attributes[kvp.Key] = kvp.Value;
        }
    }

    // Build attribute string
    var attrString = string.Join(" ", attributes.Select(kvp => $"{kvp.Key}=\"{kvp.Value}\""));

    // Return complete SVG
    return $"<svg {attrString}>{icon.InnerContent}</svg>";
}

// Use it
string svg = RenderIcon(MyIcons.UserCircle, new Dictionary<string, string>
{
    ["class"] = "icon",
    ["width"] = "24",
    ["height"] = "24"
});
```

## Using with Popular Icon Libraries

You can use this generator with popular icon libraries installed via NPM, such as Bootstrap Icons, Lucide, Heroicons, or Feather Icons.

### Example: Lucide Icons

1. Install Lucide icons via NPM:

```bash
npm install lucide-static
```

2. Add the icons as `AdditionalFiles` in your `.csproj`:

```xml
<ItemGroup>
  <AdditionalFiles Include="node_modules/lucide-static/icons/*.svg" />
</ItemGroup>
```

3. Create the icon class with optional glob pattern filter:

```csharp
[GenerateIcons("node_modules/lucide-static/icons/*.svg")]
internal static partial class LucideIcons;
```

4. Access any Lucide icon:

```csharp
IconDto icon = LucideIcons.UserCircle;
IconDto icon2 = LucideIcons.ShoppingCart;
IconDto icon3 = LucideIcons.AlertTriangle;
```

### Example: Bootstrap Icons

```bash
npm install bootstrap-icons
```

```xml
<ItemGroup>
  <AdditionalFiles Include="node_modules/bootstrap-icons/icons/*.svg" />
</ItemGroup>
```

```csharp
[GenerateIcons("node_modules/bootstrap-icons/icons/*.svg")]
internal static partial class BootstrapIcons;
```

### Example: Heroicons

```bash
npm install heroicons
```

```xml
<ItemGroup>
  <AdditionalFiles Include="node_modules/heroicons/24/outline/*.svg" />
  <AdditionalFiles Include="node_modules/heroicons/24/solid/*.svg" />
</ItemGroup>
```

```csharp
// Outline style icons
[GenerateIcons("node_modules/heroicons/24/outline/*.svg")]
internal static partial class HeroiconsOutline;

// Solid style icons
[GenerateIcons("node_modules/heroicons/24/solid/*.svg")]
internal static partial class HeroiconsSolid;
```

### Multiple Icon Sets

You can create multiple icon classes in the same project to organize different icon sets:

```xml
<ItemGroup>
  <AdditionalFiles Include="node_modules/lucide-static/icons/*.svg" />
  <AdditionalFiles Include="Icons/custom/*.svg" />
  <AdditionalFiles Include="Icons/logos/*.svg" />
</ItemGroup>
```

```csharp
[GenerateIcons("node_modules/lucide-static/icons/*.svg")]
internal static partial class LucideIcons;

[GenerateIcons("Icons/custom/*.svg")]
internal static partial class CustomIcons;

[GenerateIcons("Icons/logos/*.svg")]
internal static partial class LogoIcons;
```

## How It Works

1. The source generator reads SVG files from `AdditionalFiles` in your project
2. Files are optionally filtered by glob pattern (if specified in the attribute)
3. For each SVG file, it:
    - Extracts the root element's attributes (excluding `xmlns` and `class`)
    - Captures the inner SVG content
    - Converts the filename to PascalCase for the property name
4. Generates a partial class with `IconDto` properties for each icon
5. **Incremental compilation**: Changes to SVG files automatically trigger regeneration

## IconDto Structure

The generated `IconDto` record contains:

- **Name** (`string`): The original kebab-case filename without extension
- **DefaultAttributes** (`IReadOnlyDictionary<string, string>`): SVG root attributes like `viewBox`, `fill`, `stroke`, etc.
- **InnerContent** (`string`): The inner HTML content (paths, circles, etc.)

## Example SVG Input

Given an SVG file `Icons/user-circle.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <circle cx="12" cy="12" r="10"/>
  <circle cx="12" cy="10" r="3"/>
  <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/>
</svg>
```

The generator creates:

```csharp
/// <summary>
/// Icon: user-circle
/// </summary>
public static readonly IconDto UserCircle = new IconDto(
    "user-circle",
    new global::System.Collections.Generic.Dictionary<string, string> {
        { "width", "24" },
        { "height", "24" },
        { "viewBox", "0 0 24 24" },
        { "fill", "none" },
        { "stroke", "currentColor" },
        { "stroke-width", "2" },
    },
    "<circle cx=\"12\" cy=\"12\" r=\"10\"/><circle cx=\"12\" cy=\"10\" r=\"3\"/><path d=\"M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662\"/>");
```

## Requirements

- .NET Standard 2.0 or higher
- C# 9.0 or higher (for record types)

## License

See the repository for license information.
