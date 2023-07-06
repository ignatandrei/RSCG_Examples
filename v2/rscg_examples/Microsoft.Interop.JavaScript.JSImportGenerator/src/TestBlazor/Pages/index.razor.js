export function getMessage(fromCSharp) {
    console.log('test');
    setMessage(' JavaSCript getMessage =>'+ fromCSharp);
    return "andrei";
}


export async function setMessage(message) {
    const { getAssemblyExports } = await globalThis.getDotnetRuntime(0);
    var exports = await getAssemblyExports("TestBlazor.dll");
    var fromJScript = " Javascript setMessage =>" + message;
    console.log(exports.TestBlazor.Pages.CallJavaScript1.GetMessageFromDotnet(fromJScript));
}