using NativeObjectsDemo;
Person p = new Person();

p.DateOfBirth= new DateTime(1970,4,16);
using (var nativ = NativeObjects.IPerson.Wrap(p))
{
    SomeNativeCode((IntPtr)nativ.Object);
}

static void SomeNativeCode(IntPtr nativePerson)
{
    var p = NativeObjects.IPerson.Wrap(nativePerson);
    Console.WriteLine($"Age: {p.CalculateAge()}");

}
