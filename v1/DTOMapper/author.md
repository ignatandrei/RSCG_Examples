
### Short info about you , Thomas Bleijendaal
 
 I'm Thomas Bleijendaal, I'm a .NET developer working for Triple in Alkmaar, The Netherlands. 

### Why did you start this GeneratedMapper ?

I've started GeneratedMapper to get more familiar with source generation. While the tooling is a bit rough now, I do believe that this feature can really bring a lot of value to .NET.

I've been burned before by a lot of hard-to-find bugs caused by badly behaving mappers and runtime surprises from badly handled null-references. I wanted to create a object-to-object mapper that would be very picky and raise compilation errors instead of runtime exceptions. Being able to see what the mapper will do by simply inspecting the code is very handy, and makes you trust your mapper even more.

### How do yourself use your GeneratedMapper ?

I use the GeneratedMapper in a project where I map models coming from Contentful to DTOs that are used in views. I've also tried to use it in another project, but because that targeted an older runtime I could not make that work. But, since I could copy all the generated mappers and maintain those manually, switching away from it wasn't that bad. I think that is also very valuable of code generation, you still have a copy of what a generator made for you.


### What other RSCG do you use ?

I haven't really used any other RSCGs yet, other than a metadata generator that Microsoft made for the out-of-process .NET-based Azure Functions (https://github.com/Azure/azure-functions-dotnet-worker/). That stuff is all very preview still, so it could be removed from the product, but it's cool to see Microsoft starting to use it too.

### Any other feedback ?

Cool book!

