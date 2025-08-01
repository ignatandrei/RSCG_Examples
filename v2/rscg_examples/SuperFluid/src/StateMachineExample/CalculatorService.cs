namespace SimpleFluentExample;

public class CalculatorService : ICalculator
{
    private int _currentValue = 0;

    // Static factory method as required by the generated interface
    public static ICanAddOrSubtract Create()
    {
        var calculator = new CalculatorService();
        Console.WriteLine("🧮 Calculator created");
        return calculator;
    }

    public ICanAddOrSubtractOrCalculate Add(int value)
    {
        _currentValue += value;
        Console.WriteLine($"➕ Added {value}, current value: {_currentValue}");
        return this;
    }

    public ICanAddOrSubtractOrCalculate Subtract(int value)
    {
        _currentValue -= value;
        Console.WriteLine($"➖ Subtracted {value}, current value: {_currentValue}");
        return this;
    }

    public int Calculate()
    {
        Console.WriteLine($"🎯 Final result: {_currentValue}");
        return _currentValue;
    }
}
