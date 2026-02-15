namespace UnionTypesDemo;

public class SaveToDatabase
{
    public static ResultSave Save(int i)
    {

        if (i == 0)
        {
            return ResultSave._NotFound;
        }
        return ResultSave._Ok(i); 
    }
}


