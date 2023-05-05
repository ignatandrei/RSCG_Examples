partial class Person
{
    /// <inheritdoc/>
    public override string ToString()
    {
        var sb = new StringBuilder();
        sb.Append("Person ");
        sb.Append("{ ");
        if (PrintMembers(sb))
        {
            sb.Append(" ");
        }

        sb.Append("}");
        return sb.ToString(0, Math.Min(sb.Length, /*String rep limit*/ 1024));
    }

    /// <summary>
    /// Prints the content of the instance into a given string builder.
    /// </summary>
    protected virtual bool PrintMembers(StringBuilder sb)
    {
        sb.Append("s = ");
        sb.Append((object)s);
        sb.Append(", ");
        sb.Append("ID = ");
        sb.Append(ID);
        sb.Append(", ");
        sb.Append("FirstName = ");
        sb.Append((object)FirstName);
        sb.Append(", ");
        sb.Append("LastName = ");
        sb.Append((object)LastName);
        return true;
    }
}