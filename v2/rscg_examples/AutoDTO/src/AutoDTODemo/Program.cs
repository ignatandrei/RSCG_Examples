﻿// See https://aka.ms/new-console-template for more information
using AutoDTODemo;

var d = new Department();
d.Name = "IT";
d.ID = 1;
d.Employees=new Employee[] { new Employee() };

var dto= new DepartmentDTO();
//it will be beneficial if it will have also a constructor
//for transfer properties
dto.Name = d.Name;
dto.ID = d.ID;