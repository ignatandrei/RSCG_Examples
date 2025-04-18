[CompilerGenerated]                                                                                                                                                
public partial class Metadata_Person{

    
    
    //public const string prop_ID = "ID";    
    //public static readonly Func<Person,int> func_ID = (it=>it.ID);
    //public static readonly Expression<Func<Person,int>> expr_ID = (it=>it.ID);
    public static Expression<Func<Person,bool>> expr_ID_Equal(int value)=> (it=>it.ID == value);
    public static Expression<Func<Person,bool>> expr_ID_Diff(int value)=> (it=>it.ID != value);
    public static Expression<Func<Person,bool>> expr_ID_Contains(params int[] value)=> (it=> value.Contains(it.ID) );
    
    //int
    
    
    
    
    
        
    public static Expression<Func<Person,bool>> expr_ID_Greater(int value)=> (it=>it.ID > value);
    public static Expression<Func<Person,bool>> expr_ID_GreaterOrEqual(int value)=> (it=>it.ID >= value);
    public static Expression<Func<Person,bool>> expr_ID_Less(int value)=> (it=>it.ID < value);
    public static Expression<Func<Person,bool>> expr_ID_LessOrEqual(int value)=> (it=>it.ID <= value);
    
    
            
    
    //public const string prop_FirstName = "FirstName";    
    //public static readonly Func<Person,string> func_FirstName = (it=>it.FirstName);
    //public static readonly Expression<Func<Person,string>> expr_FirstName = (it=>it.FirstName);
    public static Expression<Func<Person,bool>> expr_FirstName_Equal(string value)=> (it=>it.FirstName == value);
    public static Expression<Func<Person,bool>> expr_FirstName_Diff(string value)=> (it=>it.FirstName != value);
    public static Expression<Func<Person,bool>> expr_FirstName_Contains(params string[] value)=> (it=> value.Contains(it.FirstName) );
    
    //string
    
    
        
    public static Expression<Func<Person,bool>> expr_FirstName_Null()=> (it=>it.FirstName == null);            
    
        
    

    public static Expression<Func<Person,bool>> expr_FirstName_NullOrWhite()=> (it=>string.IsNullOrWhiteSpace(it.FirstName));

    public static Expression<Func<Person,bool>> expr_FirstName_Ends(string value)=> (it=>it.FirstName.StartsWith (value));
    public static Expression<Func<Person,bool>> expr_FirstName_Starts(string value)=> (it=>it.FirstName.EndsWith(value));
    public static Expression<Func<Person,bool>> expr_FirstName_Contains(string value)=> (it=>it.FirstName.Contains(value));    
    
    
    
    
            
    
    //public const string prop_LastName = "LastName";    
    //public static readonly Func<Person,string> func_LastName = (it=>it.LastName);
    //public static readonly Expression<Func<Person,string>> expr_LastName = (it=>it.LastName);
    public static Expression<Func<Person,bool>> expr_LastName_Equal(string value)=> (it=>it.LastName == value);
    public static Expression<Func<Person,bool>> expr_LastName_Diff(string value)=> (it=>it.LastName != value);
    public static Expression<Func<Person,bool>> expr_LastName_Contains(params string[] value)=> (it=> value.Contains(it.LastName) );
    
    //string
    
    
        
    public static Expression<Func<Person,bool>> expr_LastName_Null()=> (it=>it.LastName == null);            
    
        
    

    public static Expression<Func<Person,bool>> expr_LastName_NullOrWhite()=> (it=>string.IsNullOrWhiteSpace(it.LastName));

    public static Expression<Func<Person,bool>> expr_LastName_Ends(string value)=> (it=>it.LastName.StartsWith (value));
    public static Expression<Func<Person,bool>> expr_LastName_Starts(string value)=> (it=>it.LastName.EndsWith(value));
    public static Expression<Func<Person,bool>> expr_LastName_Contains(string value)=> (it=>it.LastName.Contains(value));    
    
    
    
    
            
    
    //public const string prop_DateOfBirth = "DateOfBirth";    
    //public static readonly Func<Person,System.DateTime?> func_DateOfBirth = (it=>it.DateOfBirth);
    //public static readonly Expression<Func<Person,System.DateTime?>> expr_DateOfBirth = (it=>it.DateOfBirth);
    public static Expression<Func<Person,bool>> expr_DateOfBirth_Equal(System.DateTime? value)=> (it=>it.DateOfBirth == value);
    public static Expression<Func<Person,bool>> expr_DateOfBirth_Diff(System.DateTime? value)=> (it=>it.DateOfBirth != value);
    public static Expression<Func<Person,bool>> expr_DateOfBirth_Contains(params System.DateTime?[] value)=> (it=> value.Contains(it.DateOfBirth) );
    
    //System.DateTime?
    
    
        
    public static Expression<Func<Person,bool>> expr_DateOfBirth_Null()=> (it=>it.DateOfBirth == null);            
    
    
    
        
    public static Expression<Func<Person,bool>> expr_DateOfBirth_Greater(System.DateTime? value)=> (it=>it.DateOfBirth > value);
    public static Expression<Func<Person,bool>> expr_DateOfBirth_GreaterOrEqual(System.DateTime? value)=> (it=>it.DateOfBirth >= value);
    public static Expression<Func<Person,bool>> expr_DateOfBirth_Less(System.DateTime? value)=> (it=>it.DateOfBirth < value);
    public static Expression<Func<Person,bool>> expr_DateOfBirth_LessOrEqual(System.DateTime? value)=> (it=>it.DateOfBirth <= value);
    
    
    

    public static Expression<Func<Person,bool>> FindEx(string nameProp, SearchCriteria search, object value = null)
    {
        
        
        
        if(string.Compare("ID",nameProp,StringComparison.CurrentCultureIgnoreCase) == 0)
        switch(search){
            case SearchCriteria.None:
                return null;
            
            case SearchCriteria.Equal:
                var orig= (int) value;
                return expr_ID_Equal(orig);
            default:
                throw new ArgumentException("cannot find for ID case  "+search);
        }
        
                    
        
        if(string.Compare("FirstName",nameProp,StringComparison.CurrentCultureIgnoreCase) == 0)
        switch(search){
            case SearchCriteria.None:
                return null;
            
            case SearchCriteria.FindNull:
                return expr_FirstName_Null();
            
            case SearchCriteria.Equal:
                var orig= (string) value;
                return expr_FirstName_Equal(orig);
            default:
                throw new ArgumentException("cannot find for FirstName case  "+search);
        }
        
                    
        
        if(string.Compare("LastName",nameProp,StringComparison.CurrentCultureIgnoreCase) == 0)
        switch(search){
            case SearchCriteria.None:
                return null;
            
            case SearchCriteria.FindNull:
                return expr_LastName_Null();
            
            case SearchCriteria.Equal:
                var orig= (string) value;
                return expr_LastName_Equal(orig);
            default:
                throw new ArgumentException("cannot find for LastName case  "+search);
        }
        
                    
        
        if(string.Compare("DateOfBirth",nameProp,StringComparison.CurrentCultureIgnoreCase) == 0)
        switch(search){
            case SearchCriteria.None:
                return null;
            
            case SearchCriteria.FindNull:
                return expr_DateOfBirth_Null();
            
            case SearchCriteria.Equal:
                var orig= (System.DateTime?) value;
                return expr_DateOfBirth_Equal(orig);
            default:
                throw new ArgumentException("cannot find for DateOfBirth case  "+search);
        }
        
        
        throw new ArgumentException("cannot find property  "+nameProp);
        
    }

}