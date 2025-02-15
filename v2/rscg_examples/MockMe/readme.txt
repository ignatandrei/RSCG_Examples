![MockMeFull](https://github.com/user-attachments/assets/43d8b58f-98b0-4469-95c3-7e5ca0683ffc)

___

[![Coverage Status](https://coveralls.io/repos/github/connorivy/MockMe/badge.svg?branch=main)](https://coveralls.io/github/connorivy/MockMe?branch=main)

## What is it?

MockMe is a library for mocking dependencies in your unit test projects. Unlike other libraries that can only mock interfaces and virtual methods, MockMe can mock sealed classes and non-virtual methods.

## Getting Started

Imagine you have the following repository class
```csharp
sealed class MyRepo
{
    public int ExpensiveDatabaseCall() => // some code;
}
```

Download the MockMe NuGet package, then the source generators and the "MockMe.Mock" type will be available in your project.
Then you can customize the behavior of the repository class as below.

```csharp
using MockMe;

// use this syntax to trigger the source generator to make a mock of the provided type
// the 'mock' object will have 3 properties: Setup, Assert, and MockedObject
// hint: rebuild test project after writing this line or IntelliSense may not work correctly
var mock = Mock.Me(default(MyRepo)); 

// the mock.Setup object has an identical interface to the original object
// from there you can configure method behavior with 'Returns', 'Callback', 'Throws', etc
mock.Setup.ExpensiveDatabaseCall().Returns(99);

// the mock.MockedObject is a special instance of the mocked type which has the modified behavior
// other instances of the mocked type will have the original behavior
MyRepo myRepo = mock.MockedObject;
int result = myRepo.ExpensiveDatabaseCall();

Assert.Equal(99, result);

// the mock.Assert object also has an identical interface to the original object.
// you can use it to assert certain mock behaviors
mock.Assert.ExpensiveDatabaseCall().WasCalled();

```

Check out the [Wiki](https://github.com/connorivy/MockMe/wiki/QuickStart) for more examples.

## Give it a Star 

If you like this project, please give it a star!
