# RSGC Name: IFormattable

Nuget :
    https://www.nuget.org/packages/AOPMethodsCommon/
    https://www.nuget.org/packages/AOPMethodsGenerator/


link : http://msprogrammer.serviciipeweb.ro/category/roslyn/ 


author :Andrei Ignat


## What can do

This will generate code to add IFormattable to any class, based on the properties of the class

## The code that you start with is 

```

    [AutoMethods(CustomTemplateFileName = "CreateFormattable.txt", template = TemplateMethod.CustomTemplateFile)]                    

    partial class Department

    {

        public int ID { get; set; }

        public string Name { get; set; }

    

    }

    [AutoMethods(CustomTemplateFileName = "CreateFormattable.txt", template = TemplateMethod.CustomTemplateFile)]

    partial class Employee

    {

        public int ID { get; set; }

        public string Name { get; set; }

    

        public Department dep { get; set; }

        

    }
```

The code that you will use is

```csharp


    var e = new Employee();

    e.ID = 1;

    e.Name = "Andrei";

    e.dep = new Department();

    e.dep.Name = "IT";

    

    Console.WriteLine(e.ToString("for employee with id = {id} the name is {name} and department is {dep?.Name}", null)); 

    

    e.dep = null;

    

    Console.WriteLine(e.ToString("for employee with id = {id} the name is {name} and department is {dep?.Name}", null));

    

```

The code that is generated is
```csharp


    [GeneratedCode("AOPMethods", "2021.2.27.640")]                                             

    [DebuggerDisplay(" ID = {ID} Name = {Name} dep = {dep}")]

    partial class Employee: IFormattable{

        public object ValueProperty(string val){

            val = val.Replace("?","");

                if(string.Compare("ID",val,StringComparison.CurrentCultureIgnoreCase)==0) {

                    return this.ID;

                }

                if(string.Compare("Name",val,StringComparison.CurrentCultureIgnoreCase)==0) {

                    return this.Name;

                }

                if(string.Compare("dep",val,StringComparison.CurrentCultureIgnoreCase)==0) {

                    return this.dep;

                }

            throw new ArgumentException("cannot find "+ val);

        }

        

        //adapted from https://haacked.com/archive/2009/01/14/named-formats-redux.aspx/

        private object Eval(string expression,IFormatProvider formatProvider)

        {

            if (expression.Contains("."))

            {

                var splut = expression.Split(".");

                bool canBeNull=splut[0].Contains("?");

                dynamic d = ValueProperty(splut[0]);

                if(canBeNull && d == null)

                    return null;

                for(var i=1; i<splut.Length;i++){

                    canBeNull=splut[i].Contains("?");

                    d=d.ToString("{"+splut[i]+"}",formatProvider);

                    if(canBeNull && d == null)

                        return null;

                }

                return d;

                

            }

    

            return ValueProperty(expression);

    

        }

    

    

        

        public string ToString(string format, IFormatProvider formatProvider)

        {

            if (format == null)

                throw new ArgumentNullException("format");

    

            List<object> values = new List<object>();

            string rewrittenFormat = Regex.Replace(format,

                delegate (Match m)

                {

                    Group startGroup = m.Groups["start"];

                    Group propertyGroup = m.Groups["property"];

                    Group formatGroup = m.Groups["format"];

                    Group endGroup = m.Groups["end"];

    

                    values.Add((propertyGroup.Value == "0")

            ? this

            : Eval(propertyGroup.Value, formatProvider));

    

                    int openings = startGroup.Captures.Count;

                    int closings = endGroup.Captures.Count;

    

                    return openings > closings || openings % 2 == 0

                ? m.Value

                : new string('{', openings) + (values.Count - 1)

                + formatGroup.Value

                + new string('}', closings);

                },

                RegexOptions.Compiled

                | RegexOptions.CultureInvariant

                | RegexOptions.IgnoreCase);

    

            return string.Format(formatProvider, rewrittenFormat, values.ToArray());

        }

    

    }

```


Example Code: <a href="https://github.com/ignatandrei/RSCG_Examples/tree/main/IFormattable" rel="noopener" target="_blank">https://github.com/ignatandrei/RSCG_Examples/tree/main/IFormattable</a>

All Generators: <a href="https://github.com/ignatandrei/RSCG_Examples/">https://github.com/ignatandrei/RSCG_Examples/</a>