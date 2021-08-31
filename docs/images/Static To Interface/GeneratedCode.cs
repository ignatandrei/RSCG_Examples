namespace RSCG_Static_Console { 
public interface ISystem_DateTime {
System.DateTime Now  {get;}
System.DateTime UtcNow  {get;}
System.DateTime Today  {get;}
}// interface
//now the partial class
public record recISystem_DateTime (System.DateTime Now,System.DateTime UtcNow,System.DateTime Today) : ISystem_DateTime
{ 
public static recISystem_DateTime MakeNew() {
return new recISystem_DateTime(System.DateTime.Now,System.DateTime.UtcNow,System.DateTime.Today);
} //end makenew
} //end record
public class clsISystem_DateTime : ISystem_DateTime 
{ 
public  System.DateTime Now  {get { return System.DateTime.Now; } }
public  System.DateTime UtcNow  {get { return System.DateTime.UtcNow; } }
public  System.DateTime Today  {get { return System.DateTime.Today; } }
} //end record
partial class Program {
public partial ISystem_DateTime FromStaticDate() {
return recISystem_DateTime.MakeNew();
} // method
} // class
} // namespace