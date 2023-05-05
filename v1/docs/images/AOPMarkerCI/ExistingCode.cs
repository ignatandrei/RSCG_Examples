using AOPMethodsCommon;
using System;
using System.Threading.Tasks;

namespace AOPMarkerCI
{
    [AutoMethods(template = TemplateMethod.CustomTemplateFile, MethodPrefix = "auto", CustomTemplateFileName = "../AutoMethod.txt")]
    partial class UnderTest
    {
        [AOPMarkerMethod]
        public async Task<int> Method1()
        {
            await Task.Delay(1000);
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