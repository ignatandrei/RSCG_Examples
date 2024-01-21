namespace BlazorApp2;

[JSAutoGenericInterop(
    TypeName = "Storage",
    Implementation = "window.localStorage",
    Url = "https://developer.mozilla.org/docs/Web/API/Window/localStorage",
    GenericMethodDescriptors = new[]
    {
        "getItem",
        "setItem:value"
    })]

public partial interface ILocalStorageService
{
}


