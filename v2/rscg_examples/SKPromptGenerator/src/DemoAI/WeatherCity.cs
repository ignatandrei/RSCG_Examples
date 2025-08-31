using SKPromptGenerator; // <-- Add namespace here

namespace DemoAI
{
    public static partial class MyPrompts
    {
        [PromptTemplate] // <-- Remove namespace here
        public const string Weather = """
            What is the weather in the city {{$city}} ?
            Respond directly in a single line
            """;
    }
}