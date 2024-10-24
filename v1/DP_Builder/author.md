
### Short info about you ,  Martin Andreas Ulrich

I am a software engineer working on diverse tech stacks but focusing mostly on .NET in C#, Web Technologies and iOS/Swift.

I am a technology enthusiast who always works on improving development and DevOps processes at our company to make life easier for developers and help deliver high. I was awarded Microsoft MVP for community and open-source work around .NET Core.

###  Why did you start this data-builder-generator  ?
###  How do yourself use your data-builder-generator  ?

In "enterprise" contexts (I hate that term) one usually has to deal with business logic working on data objects. Writing tests is really important in these contexts but creating lots of test data for various scenarios can be quite cumbersome. You usually have some set of defaults (e.g. a base order with a dummy customer and items, an insurance application from a dummy customer etc.) and then deviate from it a little for each scenario.
This is where C# 9 records would come in handy, but they were at the time not released and adopting them could be challenging (e.g. proper EF support while we're still on EF Core 3.1 anyway) so we opted for a test data builder approach where the builder classes would be generated. I did something similar a few years back at a previous company based on https://github.com/AArnott/CodeGeneration.Roslyn (which is now archived in favor of rolsyn source generators) and decided that for a current project I'll have a go and try to create something similar based on roslyn.
While there are still a few bugs in the generator (get-only properties for example), this works quite well just annotating all EF model POCOs and then creating a few default builders that can be used from tests (Think TestData.DefaultOrder.WithoutCustomerAddress().Build() - extension methods are useful here as well to reuse builder functions that have a business meaning (.WithChecksumMismatchingIBAN())).
I hope that many of these concerns can be solved with records in the future, so each .WithXYZ() can be done as a proper with-expression. But until then, autogenerating builder patterns is a good approach.
I wanted to hold off refactoring / fixing bugs for advanced use cases until a few first-party generators exist and we know what performance pitfalls to look out for. Since we were using them when generators were in preview, we also had to deal with breaking changes in the API which was a bit of pain.

###  What other RSCG do you use ?

Currently this is the only one. I hope that OpenAPI processing / generation will be a source generator soon - this is currently patched in via NSwag/MSBuild for some projects.


###  Any other feedback ?

As mentioned I hope that some patterns of how to implement fast source generators emerge. This one likely isn't the best but I wanted to hold off a few months before refactoring. I don't plan on making a huge deal out of it, I just thought it's good to put useful tools we're building on GitHub for discussion and maybe it helps someone else as well.

