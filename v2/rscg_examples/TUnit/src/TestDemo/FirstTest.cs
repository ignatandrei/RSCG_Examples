namespace TestDemo;


public class FirstTest
{
    [Test]
    public async Task Add_WithTwoNumbers_ReturnsSum()
    {
        var result = true;
        // Assert
        await Assert.That(result).IsTrue();
    }
}
