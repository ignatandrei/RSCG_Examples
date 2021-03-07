# RSCG number 11 : PartiallyApplied

Nuget :
    https://www.nuget.org/packages/PartiallyApplied/


link : https://github.com/JasonBock/PartiallyApplied 


author :Andrei Ignat


## What can do

This will generate curry for your functions 

## The code that you start with is 


<img src='http://ignatandrei.github.io/RSCG_Examples/images/PartiallyApplied/ExistingCode.cs.png' />

<a href='http://ignatandrei.github.io/RSCG_Examples/images/PartiallyApplied/ExistingCode.cs' target='_blank'>code</a>


```

    public class Accounting                                            

    {

        public static float Discount( float discount, float price)

        {

            var val= price * (1- discount);

            return val;

        }

    }
```

The code that you will use is

```csharp


    var disc10Percent = Partially.Apply(Accounting.Discount, 1/10f);

    Console.WriteLine(disc10Percent(disc10Percent(100)));

```

The code that is generated is
```csharp


    public static partial class Partially

    {

           public static Func<float, float> Apply(Func<float, float, float> method, float discount) =>

                  new((price) => method(discount, price));

    }

```


Example Code: <a href="https://github.com/ignatandrei/RSCG_Examples/tree/main/PartiallyFunction" rel="noopener" target="_blank">https://github.com/ignatandrei/RSCG_Examples/tree/main/PartiallyFunction</a>

All Generators: <a href="https://github.com/ignatandrei/RSCG_Examples/">https://github.com/ignatandrei/RSCG_Examples/</a>