﻿using AutoDto.Setup;

namespace AutoDTODemo;

[DtoFrom(typeof(Department))]
[DtoIgnore(nameof(Department.Employees))]
public partial class DepartmentDTO { 
}
