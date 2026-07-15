using EnumDemo;

CarTypes carType = CarTypes.Dacia;
TypesCar typesCar = Mapper.ToTypesCar(carType); 
Console.WriteLine($"CarTypes: {carType} {typesCar}");