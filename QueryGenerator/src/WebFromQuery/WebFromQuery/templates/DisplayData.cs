using RoslynQueryGenerator;
using System.Collections.Generic;
//TODO : modify namespace
namespace WebFromQuery.Classes
{
    public class FieldDescription
    {
        public string ItemName { get; set; }
        public string QueryName { get; set; }

        public string FieldName { get; set; }
        public string FieldType { get; set; }

        public SearchField DefaultValue { get; set; }
    }
    public class DisplayData
    {
        public string QueryName { get; set; }
        public string ItemName { get; set; }
        public FieldDescription[] FieldNames { get; set; }
        public Dictionary<string, object>[] Values { get; set; }
    }
  
}
