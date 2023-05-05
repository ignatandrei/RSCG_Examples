[GeneratedCode("AOPMethods", "2021.2.22.1125")]                                                                 
[CompilerGenerated]
public partial class Person{
          
     public  string FullName (
               
     [CallerMemberName] string memberName = "",
     [CallerFilePath] string sourceFilePath = "",
     [CallerLineNumber] int sourceLineNumber = 0){
          var sw=Stopwatch.StartNew();
          try{
               Console.WriteLine("--prvFullName start ");
               Console.WriteLine("called from class :"+memberName );
               Console.WriteLine("called from file :"+sourceFilePath );
               Console.WriteLine("called from line :"+sourceLineNumber );
                    prvFullName();
          }
          catch(Exception ex){
               Console.WriteLine("error in prvFullName:" + ex.Message);
               throw;
          }
          finally{
               Console.WriteLine($"--------prvFullName end in {sw.Elapsed.TotalMilliseconds}");
          }


     }//end FullName
     
     
}