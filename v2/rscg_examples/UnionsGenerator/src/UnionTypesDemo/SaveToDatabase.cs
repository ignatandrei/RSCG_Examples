﻿namespace UnionTypesDemo;

public class SaveToDatabase
{
    public static ResultSave Save(int i)
    {
        if(i ==0)
        {
            return new ValidationError(" cannot save 0");
        }
        return new Success(i);
    }
}


