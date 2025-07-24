using ArgumentParsing;
using ArgumentParsing.Results;

namespace ArgPars;

partial class Program
{
    /// <summary>
    /// Execute in the folder with csproj file:
    ///
    /// dotnet run -- --help
    /// dotnet run -- --version
    /// dotnet run -- sample-input.txt
    /// dotnet run -- -v -f Xml sample-input.txt
    /// </summary>
    /// <param name="args"></param>
    private static void Main(string[] args)
    {
        // Parse the command line arguments with the generated parser
        var result = ParseArguments(args);
        
        // Handle the result based on its state
        switch (result.State) 
        {
            case ParseResultState.ParsedOptions:
                ExecuteMainApp(result.Options!);
                break;
            case ParseResultState.ParsedWithErrors:
                Console.Error.WriteLine("Error parsing arguments:");
                if (result.Errors != null)
                {
                    foreach (var error in result.Errors)
                    {
                        Console.Error.WriteLine($"  {error.GetMessage()}");
                    }
                }
                Environment.Exit(1);
                break;
            case ParseResultState.ParsedSpecialCommand:
                var exitCode = result.SpecialCommandHandler!.HandleCommand();
                Environment.Exit(exitCode);
                break;
        }
    }

    [GeneratedArgumentParser]
    private static partial ParseResult<FileProcessorOptions> ParseArguments(string[] args);

    private static void ExecuteMainApp(FileProcessorOptions options)
    {
        // At this point all errors and special cases are handled,
        // so we get valid options object we can work with
        
        Console.WriteLine("=== File Processor Tool ===");
        Console.WriteLine($"Verbose mode: {options.Verbose}");

        if (options.Verbose)
        {
            Console.WriteLine($"Verbose mode: enabled");
            Console.WriteLine($"Output format: {options.OutputFormat}");
            Console.WriteLine($"Max file size: {options.MaxFileSizeBytes} bytes");
            Console.WriteLine($"Input file: {options.InputFile}");
            
            if (!string.IsNullOrEmpty(options.OutputFile))
                Console.WriteLine($"Output file: {options.OutputFile}");
                
            if (options.AdditionalFiles.Length > 0)
            {
                Console.WriteLine($"Additional files ({options.AdditionalFiles.Length}):");
                foreach (var file in options.AdditionalFiles)
                {
                    Console.WriteLine($"  - {file}");
                }
            }
        }

        //TODO: Simulate file processing
        
    }

    

    
}
