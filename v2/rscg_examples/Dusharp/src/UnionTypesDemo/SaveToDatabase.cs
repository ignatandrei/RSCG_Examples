namespace UnionTypesDemo;

public class SaveToDatabase
{
    public static ResultSave Save(int i)
    {

        if (i == 0)
        {
            return ResultSave.NotFound();
        }
        return ResultSave.Ok(i); ;
    }
}


