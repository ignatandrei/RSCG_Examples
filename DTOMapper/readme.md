# RSCG number 5 : GeneratedMapper

Nuget :
    https://www.nuget.org/packages/GeneratedMapper/


link : https://github.com/ThomasBleijendaal/GeneratedMapper 


author :Thomas Bleijendaal


## What can do

AutoMapping from a POCO to a DTO. Lots of customizations

## The code that you start with is 

```

    public class Department                                    

        {

            public int ID { get; set; }

            public string Name { get; set; }

            

            public List<string> Employees { get; set; }

        }

    

        [IgnoreInTarget("Employees")]

        [MapFrom(typeof(Department))]

        public class DepartmentDTO

        {

            public int ID { get; set; }

            public string Name{get; set;}

    

            [MapWith("Employees",typeof(ResolverLength))]

            public int EmployeesNr { get; set; }

    

        }

        public class ResolverLength

        {

            public int Resolve(List<string> input)

            {

                return ((input?.Count) ?? 0);

            }

        }
```

The code that you will use is

```csharp


    static void Main(string[] args)                                

    {

        var dep = new Department();

        dep.Name = "IT";

        dep.ID = 1;

        dep.Employees = new List<string>();

        dep.Employees.Add("Andrei");

        var dto = dep.MapToDepartmentDTO();

        Console.WriteLine(dto.Name+"=>"+ dto.EmployeesNr);

    }

```

The code that is generated is
```csharp


    namespace DTOMapper                                                                                                                                                                                                        

    {

        public static partial class DepartmentMapToExtensions

        {

            public static DTOMapper.DepartmentDTO MapToDepartmentDTO(this DTOMapper.Department self)

            {

                if (self is null)

                {

                    throw new ArgumentNullException(nameof(self), "DTOMapper.Department -> DTOMapper.DepartmentDTO: Source is null.");

                }

                

                var resolverLength = new DTOMapper.ResolverLength();

                

                var target = new DTOMapper.DepartmentDTO

                {

                    ID = self.ID,

                    Name = (self.Name ?? throw new GeneratedMapper.Exceptions.PropertyNullException("DTOMapper.Department -> DTOMapper.DepartmentDTO: Property Name is null.")),

                    EmployeesNr = resolverLength.Resolve((self.Employees ?? throw new GeneratedMapper.Exceptions.PropertyNullException("DTOMapper.Department -> DTOMapper.DepartmentDTO: Property Employees is null."))),

                };

                

                return target;

            }

        }

    }

    

```


Example Code: <a href="https://github.com/ignatandrei/RSCG_Examples/tree/main/DTOMapper" rel="noopener" target="_blank">https://github.com/ignatandrei/RSCG_Examples/tree/main/DTOMapper</a>

All Generators: <a href="https://github.com/ignatandrei/RSCG_Examples/">https://github.com/ignatandrei/RSCG_Examples/</a>