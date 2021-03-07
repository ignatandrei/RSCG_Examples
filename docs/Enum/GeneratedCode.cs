  [GeneratedCode("AOPMethods", "")] 
  [CompilerGenerated]
  public  static partial class enumMathematicalOperation{ 
   /*
    public static int idMathematicalOperation(){
    System.Diagnostics.Debugger.Break();
    return 1;
    }
    */
    public static RSCG_Enum.MathematicalOperation ParseExactMathematicalOperation(this long value, RSCG_Enum.MathematicalOperation? defaultValue = null){
            if(0 == value)
                return RSCG_Enum.MathematicalOperation.None;
                    if(1 == value)
                return RSCG_Enum.MathematicalOperation.Add;
                    if(2 == value)
                return RSCG_Enum.MathematicalOperation.Multiplication;
        
        if(defaultValue != null)
            return defaultValue.Value;

        throw new ArgumentException("cannot find " + value +" for RSCG_Enum.MathematicalOperation  ");
    }
   
    public static RSCG_Enum.MathematicalOperation ParseExactMathematicalOperation(this string value, RSCG_Enum.MathematicalOperation? defaultValue = null){
        //trying to see if it is a value inside
        //if(!string.IsNullOrWhiteSpace)
        if(long.TryParse(value, out long valueParsed)){
            return ParseExactMathematicalOperation(valueParsed);
        }

            if(0==string.Compare("None" , value, StringComparison.InvariantCultureIgnoreCase))
                return RSCG_Enum.MathematicalOperation.None;
                    if(0==string.Compare("Add" , value, StringComparison.InvariantCultureIgnoreCase))
                return RSCG_Enum.MathematicalOperation.Add;
                    if(0==string.Compare("Multiplication" , value, StringComparison.InvariantCultureIgnoreCase))
                return RSCG_Enum.MathematicalOperation.Multiplication;
        

        if(defaultValue != null)
            return defaultValue.Value
        throw new ArgumentException("cannot find " + value +" for RSCG_Enum.MathematicalOperation  ");
    }
    /*
    
    */
    
  }