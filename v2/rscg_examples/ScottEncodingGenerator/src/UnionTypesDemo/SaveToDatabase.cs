namespace UnionTypesDemo;

public class SaveToDatabase
{
    public static ResultSave<int> Save(int i)
    {

        if (i == 0)
        {
            return new ResultSave<int>.None();
        }
        return new ResultSave<int>.Ok(i); 
    }
}


