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
