
# RSCG number 17 : HttpClientGenerator 


## What RSCG HttpClientGenerator can do

HttpClientGenerator is a tool that uses Roslyn code generator feature to write boilerplate HttpClient code for you.

## Example code 

### Here is the csproj with the references for RSCG HttpClientGenerator

![csprj](http://ignatandrei.github.io/RSCG_Examples/images/HttpClientGenerator/The.csproj.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/HttpClientGenerator/The.csproj)
</small>


### The initial code that you start with is 


![start](http://ignatandrei.github.io/RSCG_Examples/images/HttpClientGenerator/ExistingCode.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/HttpClientGenerator/ExistingCode.cs)
</small>

### The code below will use the RSCG HttpClientGenerator 

![usage](http://ignatandrei.github.io/RSCG_Examples/images/HttpClientGenerator/Usage.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/HttpClientGenerator/Usage.cs)
<small>


###  The code that is generated by RSCG HttpClientGenerator

![gc](http://ignatandrei.github.io/RSCG_Examples/images/HttpClientGenerator/GeneratedCode.cs.png)
<small>
[code](http://ignatandrei.github.io/RSCG_Examples/images/HttpClientGenerator/GeneratedCode.cs)
</small>


## More details about RSCG HttpClientGenerator

The author of **RSCG HttpClientGenerator** is *Jalal Amini Robati*

You cand find **RSCG HttpClientGenerator** at Nuget.org :    https://www.nuget.org/packages/HttpClientGenerator/
and the sources at https://github.com/Jalalx/HttpClientCodeGenerator

For more usage features please read : https://github.com/Jalalx/HttpClientCodeGenerator 


### Link to Example Code: 

[https://github.com/ignatandrei/RSCG_Examples/tree/main/HttpClientCodeGenerator](https://github.com/ignatandrei/RSCG_Examples/tree/main/HttpClientCodeGenerator)



 
## Author of HttpClientGenerator ,  Jalal Amini Robati

1. Short info about you , Jalal Amini Robati

I am working as a senior software engineer at Alibaba Travels. 

2. Why did you start this HttpClientGenerator  ?

I built HttpClientGenerator to help users stop writing HttpClient code. Currently, some users use tools like swaggergen which generates too much code that is hard to maintain. 

3. How do yourself use your HttpClientGenerator ?

I am going to use it in a high-traffic website on production when it gets mature enough. I mostly use it on my personal projects and look for feedback from developers for now.

4. What other RSCG do you use ? 

Since the RSCG is in the early stages, I don't know that many tools but I think it can be applied to many areas like DI, ORMs. Currently Dapper.AOT is using this feature that would make writing database code so much faster.






