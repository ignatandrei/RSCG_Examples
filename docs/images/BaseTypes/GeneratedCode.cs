[System.ComponentModel.TypeConverter(typeof(AD.BaseTypes.Converters.BaseTypeTypeConverter<DepartmentId, int>))]
[System.Text.Json.Serialization.JsonConverter(typeof(AD.BaseTypes.Json.BaseTypeJsonConverter<DepartmentId, int>))]
sealed partial record DepartmentId : System.IComparable<DepartmentId>, System.IComparable, AD.BaseTypes.IBaseType<int>
{
    public DepartmentId(int value)
    {
        this.Value = value;
    }
    public int Value { get; }
    public override string ToString() => Value.ToString();
    public int CompareTo(object? obj) => CompareTo(obj as DepartmentId);
    public int CompareTo(DepartmentId? other) => other is null ? 1 : System.Collections.Generic.Comparer<int>.Default.Compare(Value, other.Value);
    public static implicit operator int(DepartmentId item) => item.Value;
    public static DepartmentId Create(int value) => new(value);
}