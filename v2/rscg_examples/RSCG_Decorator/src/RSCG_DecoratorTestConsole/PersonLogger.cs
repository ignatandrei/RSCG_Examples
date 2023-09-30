﻿using RSCG_DecoratorCommon;

namespace RSCG_DecoratorTestConsole;
public partial class Person : IDecoratorMethodV1
{
    public void EndMethod(MethodRecognizer recognizer)
    {
        logger.LogInformation("end "+recognizer.UniqueId);
    }

   
    public void ExceptionMethod(Exception ex, MethodRecognizer recognizer)
    {
        logger.LogError(ex, "exception on " + recognizer.UniqueId+ " Value Parameters:" + recognizer.ValueTypeParametersString); 
    }


    public void StartMethod(MethodRecognizer recognizer)
    {
        logger.LogInformation("start " + recognizer.UniqueId + " Value Parameters:"+recognizer.ValueTypeParametersString);
   }
}
