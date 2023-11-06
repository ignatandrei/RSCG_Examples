# DudNet [![NuGet Badge](https://buildstats.info/nuget/Jwshyns.DudNet)](https://www.nuget.org/packages/Jwshyns.DudNet)
 
DudNet is a C# source generator for implementing a proxy pattern. 

## Example

Generating a proxy for a class is as simple as marking it with the `ProxyServiceAttribute` as follows:
```csharp
using DudNet.Attributes;

public interface IExampleService {
    
       public void ExampleFunction();
    
       public int ExampleFunctionWithArgumentAndReturn(int number);
    
}

[ProxyService]
public class ExampleService : IExampleService {
    
       public void ExampleFunction(){
           // omitted for brevity
       }
        
       public int ExampleFunctionWithArgumentAndReturn(int number){
           // omitted for brevity
       }
    
       public void FunctionNotOnInterface(){
           // ommitted for brevity
       }
    
}
```

Which would generate the following two classes:
```csharp
using System.Runtime.CompilerServices;
using DudNet.Attributes;

public partial class ExampleServiceProxy : IExampleService {

	private readonly IExampleService _service;

	public void ExampleFunction() {
		Interceptor();
		ExampleFunctionInterceptor();
		_service.ExampleFunction();
	}
    
	public int ExampleFunctionWithArgumentAndReturn(int number) {
		Interceptor();
		ExampleFunctionWithArgumentAndReturnInterceptor(number);
		_service.ExampleFunctionWithArgumentAndReturn(number);
	}
    
	partial void Interceptor([CallerMemberName]string callerName = null);

	partial void ExampleFunctionInterceptor();

	partial void ExampleFunctionWithArgumentAndReturnInterceptor(int number);
}
```
and 
```csharp
using DudNet.Attributes;

public class ExampleServiceDud : IExampleService {

    public void ExampleFunction() {
    }
    
    public int ExampleFunctionWithArgumentAndReturn(int number) {
    }

}
```

These generated classes can be used by further implementing the `partial` proxy class as follows:
```csharp
public partial class ExampleServiceProxy : IExampleService {
    
    public ExampleServiceProxy(ExampleProxyService service) {
        // Some logic to determine whether you want to effectively "disable" the service
        if (Random.Shared.NextDouble() > 0.5)
        { 
            _service = service;
            return;
        }
        
        _service = new ExampleServiceDud();
    }
    
    partial void Interceptor([CallerMemberName]string callerName = null) {
        Console.Writeline("'{caller}' was called", callerName);
    }   
    
    partial void ExampleFunctionWithArgumentAndReturnInterceptor(int number) {
        if(number > 5) 
        {
            throw new Exception("Received number value '{number}' - too high!", number);
        }
    }

}

```
