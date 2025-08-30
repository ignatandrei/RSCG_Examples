[![License](https://img.shields.io/github/license/snowberry-software/EnumsEnhanced)](https://github.com/snowberry-software/EnumsEnhanced/blob/master/LICENSE)
[![NuGet Version](https://img.shields.io/nuget/v/EnumsEnhanced.svg?logo=nuget)](https://www.nuget.org/packages/EnumsEnhanced/)

# EnumsEnhanced

`EnumsEnhanced` is a C# [source generator](https://devblogs.microsoft.com/dotnet/introducing-c-source-generators) for generating common (extension) methods for enums without having the cost of the Reflection API (slow and many allocations).

Following extension methods will be generated for each enum:

| Default   | Equivalent                 |
| --------- | -------------------------- |
| GetName   | GetNameFast                |
| GetNames  | GetNamesFast               |
| GetValues | GetValuesFast              |
| HasFlag   | HasFlagFast, HasFlagUnsafe |
| IsDefined | IsDefinedFast              |
| Parse     | ParseFast                  |
| TryParse  | TryParseFast               |
| ToString  | ToStringFast               |

# How to use it

The project that makes use of this package must enable `AllowUnsafeBlocks` in order to allow compiling the `HasFlagUnsafe` extension method.

Also it will only generate the extension methods if the enum has no containing type.

```cs
internal class EnumContainingTypeTest
{
    // Will not generate any code for this enum.
    public enum ContainingTypeEnum
    {
        Test1
    }
}
```

The generated class will always have the same naming scheme by using your enum type name with an `Enhanced` postfix (e.g. **YourEnumName**`Enhanced`)
or in this example **TestEnumEnhanced**.

```cs
namespace EnumsEnhancedTest;

[Flags]
internal enum TestEnum
{
    Test1 = 1 << 0,
    Test_1 = 1 << 0,

    Test2 = 1 << 1,
    Test4 = 1 << 2,
    Test5 = 1 << 4,
    Test6 = 1 << 6,
    Test7
}
```

Generated code:

```cs
#nullable enable

using System.Text;
using System.Runtime.CompilerServices;
using System.Collections.Generic;
using System;
using System;
using System.Globalization;

namespace EnumsEnhancedTest {
  /// <summary>
  /// Reflection free extension methods for the <see cref="TestEnum"/> type.
  /// </summary>
  internal static partial class TestEnumEnhanced {

    /// <summary>
    /// Determines whether one or more bit fields are set in the current instance.
    /// </summary>
    /// <param name="e">The value of the enum.</param>
    /// <param name="flag">The flag to check.</param>
    /// <returns><see langword="true"/> if the bit field or bit fields that are set in flag are also set in the current instance; otherwise, false.</returns>
    #if NETCOREAPP3_0_OR_GREATER
      [MethodImplAttribute(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
    #else
      [MethodImplAttribute(MethodImplOptions.AggressiveInlining)]
    #endif

    public static bool HasFlagFast(this TestEnum e, TestEnum flag) {
      return (e & flag) == flag;
    }

    /// <inheritdoc cref="HasFlagFast(TestEnum, TestEnum)"/>
    #if NETCOREAPP3_0_OR_GREATER
      [MethodImplAttribute(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
    #else
      [MethodImplAttribute(MethodImplOptions.AggressiveInlining)]
    #endif

    public static unsafe bool HasFlagFastUnsafe(this TestEnum e, TestEnum flag) {
      return HasFlagFastUnsafe( & e, & flag);
    }

    /// <summary>
    /// Determines whether one or more bit fields are set in the current instance using unsafe pointer type casting.
    /// </summary>
    /// <param name="e">The value of the enum.</param>
    /// <param name="flag">The flag to check.</param>
    /// <returns><see langword="true"/> if the bit field or bit fields that are set in flag are also set in the current instance; otherwise, false.</returns>
    #if NETCOREAPP3_0_OR_GREATER
      [MethodImplAttribute(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
    #else
      [MethodImplAttribute(MethodImplOptions.AggressiveInlining)]
    #endif

    public static unsafe bool HasFlagFastUnsafe(TestEnum * e, TestEnum * flag) {
      return ( * (int * ) e & * (int * ) flag) == * (int * ) flag;
    }

    /// <summary>
    /// Retrieves an array of the names of the constants.
    /// </summary>
    /// <returns>A string array of the names of the constants.</returns>
    public static string[] GetNamesFast() {
      return new string[] {
        "Test1",
        "Test_1",
        "Test2",
        "Test4",
        "Test5",
        "Test6",
        "Test7"
      };
    }

    /// <summary>
    /// Retrieves an array of the values of the constants.
    /// </summary>
    /// <returns>An array that contains the values of the constants.</returns>
    public static TestEnum[] GetValuesFast() {
      return new TestEnum[] {
        TestEnum.Test1, TestEnum.Test_1, TestEnum.Test2, TestEnum.Test4, TestEnum.Test5, TestEnum.Test6, TestEnum.Test7
      };
    }

    /// <inheritdoc cref="IsDefinedFast(TestEnum)"/>
    public static bool IsDefinedFast(string value) {
      _ = value ??
        throw new ArgumentNullException(nameof(value));

      switch (value) {
      case "Test1":
        return true;
      case "Test2":
        return true;
      case "Test4":
        return true;
      case "Test5":
        return true;
      case "Test6":
        return true;
      case "Test7":
        return true;
      case "Test_1":
        return true;

      }

      return false;
    }

    /// <inheritdoc cref="IsDefinedFast(TestEnum)"/>
    #if NETCOREAPP3_0_OR_GREATER
      [MethodImplAttribute(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
    #else
      [MethodImplAttribute(MethodImplOptions.AggressiveInlining)]
    #endif

    public static bool IsDefinedFast(Int32 value) {
      return IsDefinedFast((TestEnum) value);
    }

    /// <summary>
    /// Returns a <see cref="bool"/> telling whether its given value exists in the enumeration.
    /// </summary>
    /// <param name="value">The value of the enumeration constant.</param>
    /// <returns><see langword="true"/> if a constant is defined with the given value from the <paramref name="value"/>.</returns>
    public static bool IsDefinedFast(TestEnum value) {
      switch (value) {
      case TestEnum.Test1:
        return true;
      case TestEnum.Test2:
        return true;
      case TestEnum.Test4:
        return true;
      case TestEnum.Test5:
        return true;
      case TestEnum.Test6:
        return true;
      case TestEnum.Test7:
        return true;
        // Skipping duplicated constant value: TestEnum.Test_1 -> 1

      }

      return false;
    }

    /// <summary>
    /// Resolves the name of the given enum value.
    /// </summary>
    /// <param name="e">The value of a particular enumerated constant in terms of its underlying type.</param>
    /// <param name="includeFlagNames">Determines whether the value has flags, so it will return `EnumValue, EnumValue2`.</param>
    /// <returns> A string containing the name of the enumerated constant or <see langword="null"/> if the enum has multiple flags set but <paramref name="includeFlagNames"/> is not enabled.</returns>
    public static string ? GetNameFast(this TestEnum e, bool includeFlagNames = false) {
      switch (e) {
      case TestEnum.Test1:
        return nameof(TestEnum.Test1);

        // Skipping duplicated constant value: TestEnum.Test_1 -> 1

      case TestEnum.Test2:
        return nameof(TestEnum.Test2);

      case TestEnum.Test4:
        return nameof(TestEnum.Test4);

      case TestEnum.Test5:
        return nameof(TestEnum.Test5);

      case TestEnum.Test6:
        return nameof(TestEnum.Test6);

      case TestEnum.Test7:
        return nameof(TestEnum.Test7);

      }

      // Returning null is the default behavior.
      if (!includeFlagNames)
        return null;
      //throw new Exception("Enum name could not be found!");

      var flagBuilder = new StringBuilder();
      if (e.HasFlagFast(TestEnum.Test1))
        flagBuilder.Append(TestEnum.Test1.GetNameFast(false) + ", ");

      // Skipping duplicated constant value: TestEnum.Test_1 -> 1

      if (e.HasFlagFast(TestEnum.Test2))
        flagBuilder.Append(TestEnum.Test2.GetNameFast(false) + ", ");

      if (e.HasFlagFast(TestEnum.Test4))
        flagBuilder.Append(TestEnum.Test4.GetNameFast(false) + ", ");

      if (e.HasFlagFast(TestEnum.Test5))
        flagBuilder.Append(TestEnum.Test5.GetNameFast(false) + ", ");

      if (e.HasFlagFast(TestEnum.Test6))
        flagBuilder.Append(TestEnum.Test6.GetNameFast(false) + ", ");

      if (e.HasFlagFast(TestEnum.Test7))
        flagBuilder.Append(TestEnum.Test7.GetNameFast(false) + ", ");

      return flagBuilder.ToString().Trim(new char[] {
        ',',
        ' '
      });
    }

    /// <summary>
    /// Converts the value of this instance to its equivalent string representation.
    /// </summary>
    /// <param name="e">The value of a particular enumerated constant in terms of its underlying type.</param>
    /// <returns>The string representation of the value of this instance.</returns>
    #if NETCOREAPP3_0_OR_GREATER
      [MethodImplAttribute(MethodImplOptions.AggressiveInlining | MethodImplOptions.AggressiveOptimization)]
    #else
      [MethodImplAttribute(MethodImplOptions.AggressiveInlining)]
    #endif

    public static string ? ToStringFast(this TestEnum e) {
      return GetNameFast(e, true);
    }

    /// <summary>
    /// Converts the string representation of the name or numeric value of one or more enumerated constants to an equivalent enumerated object.
    /// </summary>
    /// <param name="value">A string containing the name or value to convert.</param>
    /// <param name="ignoreCase"><see langword="true"/> to ignore case; false to regard case.</param>
    /// <param name="result">The result of the enumeration constant.</param>
    /// <returns><see langword="true"/> if the conversion succeeded; <see langword="false"/> otherwise.</returns>
    public static bool TryParseFast(string value, bool ignoreCase, out TestEnum result) {
      result = ParseFast(out
        var successful, value: value, ignoreCase: ignoreCase, throwOnFailure: false);
      return successful;
    }

    /// <summary>
    /// Converts the string representation of the name or numeric value of one or more enumerated constants to an equivalent enumerated object.
    /// </summary>
    /// <param name="value">A string containing the name or value to convert.</param>
    /// <param name="ignoreCase"><see langword="true"/> to ignore case; false to regard case.</param>
    /// <returns>The enumeration value whose value is represented by the given value.</returns>
    public static TestEnum ParseFast(string value, bool ignoreCase = false) {
      return ParseFast(out _, value: value, ignoreCase: ignoreCase, throwOnFailure: true);
    }

    /// <summary>
    /// Converts the string representation of the name or numeric value of one or more enumerated constants to an equivalent enumerated object.
    /// </summary>
    /// <param name="successful"><see langword="true"/> if the conversion succeeded; <see langword="false"/> otherwise.</param>
    /// <param name="value">A string containing the name or value to convert.</param>
    /// <param name="ignoreCase"><see langword="true"/> to ignore case; false to regard case.</param>
    /// <param name="throwOnFailure">Determines whether to throw an <see cref="Exception"/> on errors or not.</param>
    /// <returns>The enumeration value whose value is represented by the given value.</returns>
    public static TestEnum ParseFast(out bool successful, string value, bool ignoreCase = false, bool throwOnFailure = true) {
      successful = false;

      if (throwOnFailure && (string.IsNullOrEmpty(value) || string.IsNullOrWhiteSpace(value))) {
        throw new ArgumentException("Value can't be null or whitespace!", nameof(value));
      }

      Int32 localResult = 0;
      bool parsed = false;
      string subValue;
      string originalValue = value;
      char firstChar = value[0];

      if (char.IsDigit(firstChar) || firstChar == '-' || firstChar == '+') {
        if (Int32.TryParse(value, NumberStyles.AllowLeadingSign | NumberStyles.AllowTrailingWhite, null, out
            var valueNumber))
          switch (valueNumber) {
          case (Int32) TestEnum.Test1:
            successful = true;
            return TestEnum.Test1;

          case (Int32) TestEnum.Test2:
            successful = true;
            return TestEnum.Test2;

          case (Int32) TestEnum.Test4:
            successful = true;
            return TestEnum.Test4;

          case (Int32) TestEnum.Test5:
            successful = true;
            return TestEnum.Test5;

          case (Int32) TestEnum.Test6:
            successful = true;
            return TestEnum.Test6;

          case (Int32) TestEnum.Test7:
            successful = true;
            return TestEnum.Test7;

            // Skipping duplicated constant value: TestEnum.Test_1 -> 1

          }
      } else
        while (value != null && value.Length > 0) {
          parsed = false;

          int endIndex = value.IndexOf(',');

          if (endIndex < 0) {
            // No next separator; use the remainder as the next value.
            subValue = value.Trim();
            value = null!;
          } else if (endIndex != value!.Length - 1) {
            // Found a separator before the last char.
            subValue = value.Substring(0, endIndex).Trim();
            value = value.Substring(endIndex + 1);
          } else {
            // Last char was a separator, which is invalid.
            break;
          }

          if (!ignoreCase) {
            switch (subValue) {
            case nameof(TestEnum.Test1):
              parsed = true;
              localResult |= (Int32) TestEnum.Test1;
              break;

            case nameof(TestEnum.Test2):
              parsed = true;
              localResult |= (Int32) TestEnum.Test2;
              break;

            case nameof(TestEnum.Test4):
              parsed = true;
              localResult |= (Int32) TestEnum.Test4;
              break;

            case nameof(TestEnum.Test5):
              parsed = true;
              localResult |= (Int32) TestEnum.Test5;
              break;

            case nameof(TestEnum.Test6):
              parsed = true;
              localResult |= (Int32) TestEnum.Test6;
              break;

            case nameof(TestEnum.Test7):
              parsed = true;
              localResult |= (Int32) TestEnum.Test7;
              break;

            case nameof(TestEnum.Test_1):
              parsed = true;
              localResult |= (Int32) TestEnum.Test_1;
              break;

            }
          } else {
            if (subValue.Equals("Test1", StringComparison.OrdinalIgnoreCase)) {
              parsed = true;
              localResult |= (Int32) TestEnum.Test1;
            }
            if (subValue.Equals("Test2", StringComparison.OrdinalIgnoreCase)) {
              parsed = true;
              localResult |= (Int32) TestEnum.Test2;
            }
            if (subValue.Equals("Test4", StringComparison.OrdinalIgnoreCase)) {
              parsed = true;
              localResult |= (Int32) TestEnum.Test4;
            }
            if (subValue.Equals("Test5", StringComparison.OrdinalIgnoreCase)) {
              parsed = true;
              localResult |= (Int32) TestEnum.Test5;
            }
            if (subValue.Equals("Test6", StringComparison.OrdinalIgnoreCase)) {
              parsed = true;
              localResult |= (Int32) TestEnum.Test6;
            }
            if (subValue.Equals("Test7", StringComparison.OrdinalIgnoreCase)) {
              parsed = true;
              localResult |= (Int32) TestEnum.Test7;
            }
            if (subValue.Equals("Test_1", StringComparison.OrdinalIgnoreCase)) {
              parsed = true;
              localResult |= (Int32) TestEnum.Test_1;
            }

          }

          if (!parsed)
            break;
        }

      successful = true;

      if (!parsed) {
        successful = false;

        if (throwOnFailure)
          throw new ArgumentException($"Could not convert the given value `{originalValue}`.", nameof(value));
      }

      return (TestEnum) localResult;
    }

  }
}

#nullable restore
```
