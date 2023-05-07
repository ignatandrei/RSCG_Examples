var mock = (IMatOps)new MatOpsMock
{
    MockAdd = (a, b) => a+b,
    MockDivision = (a,b)=> a/b
};