using ArgumentParsing;
using ArgumentParsing.SpecialCommands.Help;
using System.Collections.Immutable;

namespace ArgPars;

[OptionsType]
class FileProcessorOptions
{
    [Option('v', "verbose"), HelpInfo("Enable verbose logging and detailed output")]
    public bool Verbose { get; init; }

    [Option('f', "format"), HelpInfo("Output format for processed files (json, xml, csv)")]
    public OutputFormat OutputFormat { get; init; } = OutputFormat.Json;

    [Option('m', "max-size"), HelpInfo("Maximum file size in bytes (default: 10MB)")]
    public long MaxFileSizeBytes { get; init; } = 10 * 1024 * 1024; // 10MB default

    [Option('o', "output"), HelpInfo("Output file path (optional, defaults to input file with new extension)")]
    public string? OutputFile { get; init; }

    [Parameter(0, Name = "input-file"), HelpInfo("Path to the input file to process")]
    public required string InputFile { get; init; }

    [RemainingParameters, HelpInfo("Additional files to process")]
    public ImmutableArray<string> AdditionalFiles { get; init; }
}
