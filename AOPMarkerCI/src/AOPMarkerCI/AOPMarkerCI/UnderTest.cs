using AOPMethodsCommon;
using System;

namespace AOPMarkerCI
{
    [AutoMethods(template = TemplateMethod.CustomTemplateFile, MethodPrefix = "auto", CustomTemplateFileName = "../AutoMethod.txt")]
    partial class UnderTest
    {
        [AOPMarkerMethod]
        public int Method1()
        {
            var ret = Method2(DateTime.Now);
            return ret % 2 == 0 ? 1 : 0;
        }
        [AOPMarkerMethod]
        private int Method2(DateTime now)
        {
            return now.Second;
        }

    }
}
