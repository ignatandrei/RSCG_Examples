---
sidebar_position: 9707 
title: 9707 - System.Text.RegularExpressions.Generator=>System.Text.RegularExpressions.Generator.RegexGenerator
description: System.Text.RegularExpressions.Generator=>System.Text.RegularExpressions.Generator.RegexGenerator
slug: /Microsoft/System.Text.RegularExpressions.Generator=>System.Text.RegularExpressions.Generator.RegexGenerator
---

# System.Text.RegularExpressions.Generator=>System.Text.RegularExpressions.Generator.RegexGenerator


##  Original Code

The code that will be improved by generation is :
```csharp showLineNumbers
using System.Text.RegularExpressions;

namespace Demo;

public partial class DemoRegex
{
    //Generator:RegexGenerator.g.cs
    [GeneratedRegex("abc|def", RegexOptions.IgnoreCase, "en-US")]
    private static partial Regex AbcOrDefGeneratedRegex();

    public static bool EvaluateText(string text)
    {
        return (AbcOrDefGeneratedRegex().IsMatch(text));
        
    }
}

```

## Generated Code

The code that is written is
```csharp showLineNumbers
// <auto-generated/>
#nullable enable
#pragma warning disable CS0162 // Unreachable code
#pragma warning disable CS0164 // Unreferenced label
#pragma warning disable CS0219 // Variable assigned but never used

namespace Demo
{
    partial class DemoRegex
    {
        /// <remarks>
        /// Pattern explanation:<br/>
        /// <code>
        /// ○ Match with 2 alternative expressions, atomically.<br/>
        ///     ○ Match a sequence of expressions.<br/>
        ///         ○ Match a character in the set [Aa].<br/>
        ///         ○ Match a character in the set [Bb].<br/>
        ///         ○ Match a character in the set [Cc].<br/>
        ///     ○ Match a sequence of expressions.<br/>
        ///         ○ Match a character in the set [Dd].<br/>
        ///         ○ Match a character in the set [Ee].<br/>
        ///         ○ Match a character in the set [Ff].<br/>
        /// </code>
        /// </remarks>
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("System.Text.RegularExpressions.Generator", "7.0.8.27404")]
        private static partial global::System.Text.RegularExpressions.Regex AbcOrDefGeneratedRegex() => global::System.Text.RegularExpressions.Generated.AbcOrDefGeneratedRegex_0.Instance;
    }
}

namespace System.Text.RegularExpressions.Generated
{
    using System;
    using System.CodeDom.Compiler;
    using System.Collections;
    using System.ComponentModel;
    using System.Globalization;
    using System.Runtime.CompilerServices;
    using System.Text.RegularExpressions;
    using System.Threading;

    /// <summary>Custom <see cref="Regex"/>-derived type for the AbcOrDefGeneratedRegex method.</summary>
    [GeneratedCodeAttribute("System.Text.RegularExpressions.Generator", "7.0.8.27404")]
    file sealed class AbcOrDefGeneratedRegex_0 : Regex
    {
        /// <summary>Cached, thread-safe singleton instance.</summary>
        internal static readonly AbcOrDefGeneratedRegex_0 Instance = new();
    
        /// <summary>Initializes the instance.</summary>
        private AbcOrDefGeneratedRegex_0()
        {
            base.pattern = "abc|def";
            base.roptions = RegexOptions.IgnoreCase;
            ValidateMatchTimeout(Utilities.s_defaultTimeout);
            base.internalMatchTimeout = Utilities.s_defaultTimeout;
            base.factory = new RunnerFactory();
            base.capsize = 1;
        }
    
        /// <summary>Provides a factory for creating <see cref="RegexRunner"/> instances to be used by methods on <see cref="Regex"/>.</summary>
        private sealed class RunnerFactory : RegexRunnerFactory
        {
            /// <summary>Creates an instance of a <see cref="RegexRunner"/> used by methods on <see cref="Regex"/>.</summary>
            protected override RegexRunner CreateInstance() => new Runner();
        
            /// <summary>Provides the runner that contains the custom logic implementing the specified regular expression.</summary>
            private sealed class Runner : RegexRunner
            {
                /// <summary>Scan the <paramref name="inputSpan"/> starting from base.runtextstart for the next match.</summary>
                /// <param name="inputSpan">The text being scanned by the regular expression.</param>
                protected override void Scan(ReadOnlySpan<char> inputSpan)
                {
                    // Search until we can't find a valid starting position, we find a match, or we reach the end of the input.
                    while (TryFindNextPossibleStartingPosition(inputSpan) &&
                           !TryMatchAtCurrentPosition(inputSpan) &&
                           base.runtextpos != inputSpan.Length)
                    {
                        base.runtextpos++;
                        if (Utilities.s_hasTimeout)
                        {
                            base.CheckTimeout();
                        }
                    }
                }
        
                /// <summary>Search <paramref name="inputSpan"/> starting from base.runtextpos for the next location a match could possibly start.</summary>
                /// <param name="inputSpan">The text being scanned by the regular expression.</param>
                /// <returns>true if a possible match was found; false if no more matches are possible.</returns>
                private bool TryFindNextPossibleStartingPosition(ReadOnlySpan<char> inputSpan)
                {
                    int pos = base.runtextpos;
                    ulong charMinusLow;
                    
                    // Any possible match is at least 3 characters.
                    if (pos <= inputSpan.Length - 3)
                    {
                        // The pattern matches a character in the set [CFcf] at index 2.
                        // Find the next occurrence. If it can't be found, there's no match.
                        ReadOnlySpan<char> span = inputSpan.Slice(pos);
                        for (int i = 0; i < span.Length - 2; i++)
                        {
                            int indexOfPos = span.Slice(i + 2).IndexOfAny("CFcf");
                            if (indexOfPos < 0)
                            {
                                goto NoMatchFound;
                            }
                            i += indexOfPos;
                            
                            if (((long)((0x9000000090000000UL << (int)(charMinusLow = (uint)span[i] - 'A')) & (charMinusLow - 64)) < 0) &&
                                ((long)((0x9000000090000000UL << (int)(charMinusLow = (uint)span[i + 1] - 'B')) & (charMinusLow - 64)) < 0))
                            {
                                base.runtextpos = pos + i;
                                return true;
                            }
                        }
                    }
                    
                    // No match found.
                    NoMatchFound:
                    base.runtextpos = inputSpan.Length;
                    return false;
                }
        
                /// <summary>Determine whether <paramref name="inputSpan"/> at base.runtextpos is a match for the regular expression.</summary>
                /// <param name="inputSpan">The text being scanned by the regular expression.</param>
                /// <returns>true if the regular expression matches at the current position; otherwise, false.</returns>
                private bool TryMatchAtCurrentPosition(ReadOnlySpan<char> inputSpan)
                {
                    int pos = base.runtextpos;
                    int matchStart = pos;
                    ReadOnlySpan<char> slice = inputSpan.Slice(pos);
                    
                    // Match with 2 alternative expressions, atomically.
                    {
                        if (slice.IsEmpty)
                        {
                            return false; // The input didn't match.
                        }
                        
                        switch (slice[0])
                        {
                            case 'A' or 'a':
                                if ((uint)slice.Length < 3 ||
                                    !slice.Slice(1).StartsWith("bc", StringComparison.OrdinalIgnoreCase)) // Match the string "bc" (ordinal case-insensitive)
                                {
                                    return false; // The input didn't match.
                                }
                                
                                pos += 3;
                                slice = inputSpan.Slice(pos);
                                break;
                                
                            case 'D' or 'd':
                                if ((uint)slice.Length < 3 ||
                                    !slice.Slice(1).StartsWith("ef", StringComparison.OrdinalIgnoreCase)) // Match the string "ef" (ordinal case-insensitive)
                                {
                                    return false; // The input didn't match.
                                }
                                
                                pos += 3;
                                slice = inputSpan.Slice(pos);
                                break;
                                
                            default:
                                return false; // The input didn't match.
                        }
                    }
                    
                    // The input matched.
                    base.runtextpos = pos;
                    base.Capture(0, matchStart, pos);
                    return true;
                }
            }
        }

    }
    
    /// <summary>Helper methods used by generated <see cref="Regex"/>-derived implementations.</summary>
    [GeneratedCodeAttribute("System.Text.RegularExpressions.Generator", "7.0.8.27404")]
    file static class Utilities
    {
        /// <summary>Default timeout value set in <see cref="AppContext"/>, or <see cref="Regex.InfiniteMatchTimeout"/> if none was set.</summary>
        internal static readonly TimeSpan s_defaultTimeout = AppContext.GetData("REGEX_DEFAULT_MATCH_TIMEOUT") is TimeSpan timeout ? timeout : Regex.InfiniteMatchTimeout;
        
        /// <summary>Whether <see cref="s_defaultTimeout"/> is non-infinite.</summary>
        internal static readonly bool s_hasTimeout = s_defaultTimeout != Timeout.InfiniteTimeSpan;
    }
}

```

## More details

Csharp Project: C:\test\RSCG_Examples\v2\rscg_examples\Microsoft\DemoRegex\DemoRegex.csproj

<p>
    You can see the whole list at 
    <a target="_blank" href='https://ignatandrei.github.io/RSCG_Examples/v2/docs/List-of-RSCG'>
        https://ignatandrei.github.io/RSCG_Examples/v2/docs/List-of-RSCG
    </a>
</p>
