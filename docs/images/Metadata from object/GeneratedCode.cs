public enum Person_EnumProps{                                                                  
    None
    ,FirstName // Public 
    ,LastName // Public 
}
partial class Person{
    public object ValueProperty(Person_EnumProps val){
        if(val == Person_EnumProps.FirstName) {
            return this.FirstName;
        }
        if(val == Person_EnumProps.LastName) {
            return this.LastName;
        }
    throw new ArgumentException("cannot find "+ val);
    }
    public object ValueProperty(string val){
        if(string.Compare("FirstName",val,StringComparison.CurrentCultureIgnoreCase)==0) {
            return this.FirstName;
        }
        if(string.Compare("LastName",val,StringComparison.CurrentCultureIgnoreCase)==0) {
            return this.LastName;
        }
    throw new ArgumentException("cannot find "+ val);
    }
}