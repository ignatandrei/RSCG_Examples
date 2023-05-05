public Person (){                                                          
   OnConstructor();
}
public Person(IPerson other):base(){ 
     BeforeCopyConstructor(other);
     CopyPropertiesFrom(other);
     AfterCopyConstructor(other);
          
}
public void CopyPropertiesFrom(IPerson other){

     this.FirstName = other.FirstName;            
     this.LastName = other.LastName;            
}    



 public void Deconstruct( out string FirstName, out string LastName)
 {
     FirstName = this.FirstName;            
     LastName = this.LastName;            
 }