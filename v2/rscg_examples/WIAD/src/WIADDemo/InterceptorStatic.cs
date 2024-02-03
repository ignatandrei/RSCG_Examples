using RSCG_WhatIAmDoing;
using RSCG_WhatIAmDoing_Common;

namespace WIADDemo;
//[ExposeClass(typeof(Encoding), nameof(Encoding.EncodingName))]
[InterceptStatic("System.Console.*")] // regex
internal class InterceptorMethodStatic : InterceptorMethodStaticBase, IInterceptorMethodStatic
{

}