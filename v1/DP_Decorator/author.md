
###  Short info about you , beakona

I am a dad and software developer with more than 15 years of working experience in various industries and technologies. I am working mostly on embedded and desktop solutions mainly in C and C#.

###  Why did you start this AutoInterface ?

After the Source Generator public announcement, I decided to give them a try. I realized that Source Generators would allow us to explore composition-over-inheritance in its new form (from C# perspective). Technically, this approach uses interface invocation (which impacts performance) but one can view it as one form of composition. I consider myself a language designer and I wanted to explore the mechanics of this approach (regardless of poor performance) on existing and reputable language that I use daily.

###  How do yourself use your AutoInterface ?

I use it experimentally as a tool that allows a class to be composed-of-members and yet acts as inherited-as. Young and experimental languages have similar concepts as an alternative to inheritance. Those who find this interesting can explore the approach chosen by Jonathan Blow in its language Jai


###  What other RSCG do you use ?

There is only one Source Generator that I use in production; AutoCoder and it is not public because I didn't find time to make it configurable and polished. It automatically implements ICoding interface for the target class (Bridge pattern). I have been using this approach for years because the existing infrastructure does not work for me. The main concept is inspired by Foundation framework class NSCoder but is implemented in the C# way. Abstraction-side has two directions IEncoding/IDecoding and there are two implementers: IEncoder<IEncoding> and IDecoder<IDecoding>. AutoCoder acts on behalf of the abstraction side by offering targeted fields/properties to IEncoder/IDecoder. The author of IEncoder/IDecoder can decide what, how, when, and in which context to encode/decode. In other words, AutoCoder automates boring stuff and does not make typos.


###  Any other feedback ?

If you have special, funny, or helpful paragraphs that acts like mentor or life coach concept I think there is worth mentioning TED talk: Why you will fail to have a great career by Larry Smith
or book: "Hold on to Your Kids: Why Parents Need to Matter More Than Peers", 2019, by Dr. Gabor Maté and Gordon Neufeld.