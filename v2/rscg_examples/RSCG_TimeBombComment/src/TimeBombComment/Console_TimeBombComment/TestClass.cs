namespace Console_TimeBombComment;

 internal partial class TestClass
{
    [Obsolete("this will be obsolete",TB_20230508)]
    public int DataObsolete()
    {
        return 5;
    }

    public int CommentsWithErrors()
    {
        //JFD: test
        //TB: 2021-09-13 this is a comment transformed into an error
        //TB: and this is a warning
        //TB: 2050-12-30 and this should not appear yet
        return 5;
    }
}
