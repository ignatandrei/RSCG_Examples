public partial class PersonBuilder                                         
     {
          private string? _firstName;
          private string? _middleNames;
          private string? _lastName;
          public PersonBuilder()
          {
          }

          public PersonBuilder(PersonBuilder otherBuilder)
          {
               _firstName = otherBuilder._firstName;
               _middleNames = otherBuilder._middleNames;
               _lastName = otherBuilder._lastName;
          }

          public PersonBuilder(Person existingInstance)
          {
               _firstName = existingInstance.FirstName;
               _middleNames = existingInstance.MiddleNames;
               _lastName = existingInstance.LastName;
          }

          public PersonBuilder WithFirstName(string firstName)
          {
               var mutatedBuilder = new PersonBuilder(this);
               mutatedBuilder._firstName = firstName;
               return mutatedBuilder;
          }

          public PersonBuilder WithMiddleNames(string? middleNames)
          {
               var mutatedBuilder = new PersonBuilder(this);
               mutatedBuilder._middleNames = middleNames;
               return mutatedBuilder;
          }

          public PersonBuilder WithoutMiddleNames()
          {
               var mutatedBuilder = new PersonBuilder(this);
               mutatedBuilder._middleNames = null;
               return mutatedBuilder;
          }

          public PersonBuilder WithLastName(string lastName)
          {
               var mutatedBuilder = new PersonBuilder(this);
               mutatedBuilder._lastName = lastName;
               return mutatedBuilder;
          }

          public Person Build()
          {
               var instance = new Person();
               if (!(_firstName is null))
                    instance.FirstName = _firstName;
               if (!(_middleNames is null))
                    instance.MiddleNames = _middleNames;
               if (!(_lastName is null))
                    instance.LastName = _lastName;
               return instance;
          }
     }