namespace Zomp.SyncMethodGeneratorDemo;

partial class Writer
{
    [Zomp.SyncMethodGenerator.CreateSyncVersion]
    public static async Task WriteAsync(string file, string contents,
CancellationToken ct)
    {
        await File.WriteAllTextAsync(file, contents, ct).ConfigureAwait(true);
    }
    [Zomp.SyncMethodGenerator.CreateSyncVersion]
    public static async Task HahaAsync(ReadOnlyMemory<byte> buffer, Stream stream,
CancellationToken ct)
    => await stream.WriteAsync(buffer, ct).ConfigureAwait(true);
}
