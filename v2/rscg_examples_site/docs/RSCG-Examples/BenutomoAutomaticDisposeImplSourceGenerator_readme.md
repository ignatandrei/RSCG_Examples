# RoslynComponents

C#のRoslynコンパイラ用のアナライザ/ソースジェネレータです。

## 一覧

- [AutomaticDisposeImpl](#automaticdisposeimpl)<br>
  C#で`IDisposable`と`IAsyncDisposable`の実装パターンに対応するメソッドを自動実装するソースジェネレータ
- [AutomaticNotifyPropertyChangedImpl](#automaticnotifypropertychangedimpl)<br>
  C#で`INotifyPropertyChanged`などの変更通知付きプロパティの実装を補助するソースジェネレータ
- [CancellationAnalyzer](#cancellationanalyzer)<br>
  キャンセルトークンの適切な引き渡しとキャンセルトークン付きのシグネチャのメソッドの優先的使用を補助するためのアナライザ
- [Cs0436Relaxation](#cs0436relaxation)<br>
  ソースジェネレータが生成したクラス等を含むアセンブリ同士でInternalsVisbleTo属性が指定されている場合に発生する場合があるCS0436警告を適切に緩和(ソースジェネレータ起因でない報告のみを別IDで再警告)するためのアナライザ

## AutomaticDisposeImpl

C#で`IDisposable`と`IAsyncDisposable`の実装パターンに対応するメソッドを自動実装するソースジェネレータです。

### Introduction

以下のサンプルで示すように、`IDisposable`と`IAsyncDisposable`インターフェイスの少なくとも一方を実装するクラスに`partial`キーワードと`AutomaticDisposeImpl`属性を付与すると、クラス内に含まれる`IDisposable`と`IAsyncDisposable`インターフェイスを実装している型を持つメンバを破棄する`Dispose()`と`DisposeAsync()`が自動実装されるようになります。

#### サンプルコード

```cs
using System;
using System.Threading.Tasks;
using Benutomo;

namespace SampleCode
{
    // 自動実装を適用するクラス
    [AutomaticDisposeImpl]
    public partial class DisposeableTest : IDisposable, IAsyncDisposable
    {
        // DisposeableTestのDipose()とDiposeAsync()は自動実装されるため、定義不要

        // IDisposable.Dispose()による破棄が可能なフィールド
        [EnableAutomaticDispose]
        ConsoleOutputDisposable consoleOutputDisposable = new ConsoleOutputDisposable();

        // IDisposable.Dispose()とIAsyncDisposable.DisposeAsync()のどちらでも破棄が可能なプロパティ
        [EnableAutomaticDispose]
        ConsoleOutputAsyncDisposable consoleOutputAsyncDisposable { get; } = new ConsoleOutputAsyncDisposable();

        public DisposeableTest()
        {
            Console.WriteLine("Created new DisposeableTest");
        }
    }

    // 以降は、出力例のためのコード

    class Program
    {
        public static async Task Main()
        {
            var disposeTestInstance = new DisposeableTest();

            Console.WriteLine("Begin disposeTestInstance.Dispose()");
            disposeTestInstance.Dispose();
            Console.WriteLine("End disposeTestInstance.Dispose()");
            Console.WriteLine();

            var asyncDisposeTestInstance = new DisposeableTest();

            Console.WriteLine("Begin disposeTestInstance.DisposeAsync()");
            await asyncDisposeTestInstance.DisposeAsync();
            Console.WriteLine("End disposeTestInstance.DisposeAsync()");
            Console.WriteLine();
        }
    }

    class ConsoleOutputDisposable : IDisposable
    {
        public void Dispose()
        {
            Console.WriteLine("    Called Dispose() of ConsoleOutputDisposable.");
        }
    }

    class ConsoleOutputAsyncDisposable : IDisposable, IAsyncDisposable
    {
        public void Dispose()
        {
            Console.WriteLine("    Called Dispose() of ConsoleOutputAsyncDisposable.");
        }

        public ValueTask DisposeAsync()
        {
            Console.WriteLine("    Called DisposeAsync() of ConsoleOutputAsyncDisposable.");
            return default;
        }
    }
}
```

#### サンプルコードを実行した際の出力例

以下のようにクラス内に含まれる`IDisposable`または`IAsyncDisposable`を実装したメンバの`Dispose()`と`DisposeAsync()`は、自動実装されたコードから呼び出されます。
自動実装クラスの`DisposeAsync()`は基本的にメンバの破棄にも`DisposeAsync()`を呼び出しますが、メンバが`IDisposable`しか実装していない場合は`Dispose()`を使用して破棄します。
```
Created new DisposeableTest
Begin disposeTestInstance.Dispose()
    Called Dispose() of ConsoleOutputDisposable.
    Called Dispose() of ConsoleOutputAsyncDisposable.
End disposeTestInstance.Dispose()

Created new DisposeableTest
Begin disposeTestInstance.DisposeAsync()
    Called DisposeAsync() of ConsoleOutputAsyncDisposable.
    Called Dispose() of ConsoleOutputDisposable.
End disposeTestInstance.DisposeAsync()

```

### 使用方法

#### インストール

⚠️ VisualStudioを利用する場合は2022の最新版が必要です。

[Nuget](https://www.nuget.org/packages/Benutomo.AutomaticDisposeImpl.SourceGenerator/)などを利用してプロジェクトのアナライザにBenutomo.AutomaticDisposeImpl.SourceGenerator.dllを追加します。

```ps
Install-Package Benutomo.AutomaticDisposeImpl.SourceGenerator
```

#### 基本

以下のように、破棄の自動実装を使用したいクラスを含むC#のソースコードの先頭部に`using Benutomo;`を追加し、`IDisposable`と`IAsyncDisposable`の少なくとも一方を実装しているクラスに`partial`キーワードと`[AutomaticDisposeImpl]`属性を追加します。
`EnableDisposeImpl`属性を追加したフィールドまはたプロパティはメンバを含むクラスが破棄と同時に自動的に破棄されます。
`DisnableDisposeImpl`属性を追加したフィールドまはたプロパティは自動的な破棄の対象外となります。
自動実装する意味がありませんが、メンバは空でも問題ありません。

```cs
using Benutomo;
using System;

// 同期的な破棄(IDisposable)を自動実装
[AutomaticDisposeImpl]
partial class Sample1 : IDisposable
{
    // 自動破棄するメンバにはEnableAutomaticDispose属性を付与
    [EnableAutomaticDispose]
    IDisposable _disposable;

    // 自動破棄しないメンバにはDisableAutomaticDispose属性を付与
    [DisableAutomaticDispose]
    IDisposable Disposable => _disposable;
}

// 非同期的な破棄(IAsyncDisposable)を自動実装
[AutomaticDisposeImpl]
partial class Sample2 : IAsyncDisposable
{
}

// 同期的な破棄(IDisposable)と非同期的な破棄(IAsyncDisposable)を自動実装
[AutomaticDisposeImpl]
partial class Sample3 : IDisposable, IAsyncDisposable
{
}

// インターフェイスが明示的に実装されていないため、NG。IDisposableとIAsyncDisposableの少なくとどちらか一方の実装が必要。
[AutomaticDisposeImpl]
partial class Sample4
{
}
```

ℹ 自動実装コードからメンバの破棄が行われるのは呼び出し方に関わらず(自動実装クラスの`Dispose()`と`DisposeAysnc()`のどちらが先に何回呼び出されても)、最大１回です。標準の[Disposeパターン](https://docs.microsoft.com/ja-jp/dotnet/standard/garbage-collection/implementing-dispose#implement-the-dispose-pattern)と同様に重複する呼び出しは無視されます。

ℹ 自動実装されたメンバの破棄で生じた例外は、リリースビルド時は無視され、デバッグビルド時はDebug.Fail()によってデバッガを停止させます。標準的な`Dispose()`等は例外を発生させることなく複数回の呼び出しが可能である必要があります([Disposeメソッドの実装](https://docs.microsoft.com/ja-jp/dotnet/standard/garbage-collection/implementing-dispose))。自動実装されるコードはそれが守られていることを期待しているため、破棄で例外を発生させるメンバが存在する場合は、自動実装対象から除外し、独自処理メソッドの中で破棄と例外のハンドリングを行って下さい。

#### Dispose()などが呼び出されるタイミングで自動実装されるメンバの破棄と同時に独自の処理も実行する

`[ManagedObjectDisposeMethod]`属性と`[ManagedObjectAsyncDisposeMethod]`属性を使用すると、自動実装される`Dispose()`および、`DisposeAsync()`の中からユーザ側のコードで実装されるメソッドを呼び出させることができます。

```cs
[AutomaticDisposeImpl]
partial class UserDefinedDisposeImplSample : IDisposable, IAsyncDisposable
{
    [ManagedObjectDisposeMethod]
    void ManagedObjectDisposeMethod() { } // 自動実装のDispose()から呼び出される。メンバの自動破棄以外のユーザ独自の処理はここで実装することができる。

    [ManagedObjectAsyncDisposeMethod]
    ValueTask ManagedObjectDisposeMethodAsync() => default; // 自動実装のDisposeAsync()から呼び出される。メンバの自動破棄以外のユーザ独自の処理はここで実装することができる。
}
```

`[ManagedObjectDisposeMethod]`属性を付与するメソッドは戻り値が`void`かつ引数の存在しないインスタンスメソッドである必要があります。

`[ManagedObjectAsyncDisposeMethod]`属性を付与するメソッドは戻り値が`ValueTask`または`Task`かつ引数の存在しないインスタンスメソッドである必要があります。

どちらの場合も、一つのクラス内で同じ属性を複数のメソッドに付与することはできません。

ℹ この機能の仕様として、自動実装コードが実行する破棄は同期的な破棄と非同期な破棄を含めて最大１回のみであることにご注意下さい。

例えば、自動実装したクラスのメソッドが

```cs
var sample = new UserDefinedDisposeImplSample();
sample.Dipose(); // この破棄のみが有効。以降の重複呼び出しは無視される。
await sample.DiposeAsync();
sample.Dipose();
```

のように呼び出された場合、ユーザのメソッドが呼ばれるのは最初の`sample.Dispose()`のタイミングで`ManagedObjectDisposeMethod()`が呼び出される１回のみです。そのあとに続く`await sample.DiposeAsync()`と２回目の`sample.Dispose()`は完全に無視されます。上記の例で`ManagedObjectDisposeMethodAsync()`が呼び出されることはありません。

もし、最初の破棄が`await sample.DiposeAsync()`で行われた場合は、`ManagedObjectDisposeMethodAsync()`が１回のみ呼び出され、それ以降は同様に無視されます。

⚠ **自動実装のメンバ破棄と独自の処理の実行順は不確定です**。将来のバージョンでは順番が入れ替わる可能性がありますので、現在の自動実装の順番に依存しないように注意して下さい。

#### アンマネージドリソースの破棄

`IDisposable.Dipose()`などで自動破棄できるメンバのほかに、`System.IntPtr`等を利用してアンマネージドリソースのハンドルなどを保持している場合は`[UnmanagedResourceReleaseMethod]`属性を利用することで、アンマネージドリソースの破棄を行うメソッドを自動実装されるコードから呼び出させることができます。

```cs
[AutomaticDisposeImpl]
partial class UserDefinedFinalizeImplSample : IDisposable, IAsyncDisposable
{
    [UnmanagedResourceReleaseMethod]
    void UnmanagedResourceReleaseMethod() { } // 自動実装のDispose(),DiposeAsync(),~UserDefinedFinalizeImplSample()から呼び出される。アンマネージドリソースの破棄はここで実装することができる。
}
```

ℹ `[UnmanagedResourceReleaseMethod]`属性を使用したクラスはファイナライザも自動実装されます。そのため、明示的に`Dispose()`または`DisposeAsync()`の呼び出しがされずにオブジェクトがガーベジコレクトされた場合もガーベジコレクタのファイナライズのタイミングで自動実装されたファイナライザを経由して`[UnmanagedResourceReleaseMethod]`属性を付与したメソッドが呼び出されます。

ℹ `[ManagedObjectDisposeMethod]`属性で破棄を自動実装したクラスは`IDisposable`と`IAsyncDisposable`を直接実装している`seald`クラスであるか、継承関係にある親クラス・子クラスが[同期](https://docs.microsoft.com/ja-jp/dotnet/standard/garbage-collection/implementing-dispose#implement-the-dispose-pattern)および[非同期](https://docs.microsoft.com/ja-jp/dotnet/standard/garbage-collection/implementing-disposeasync#implement-the-async-dispose-pattern)の破棄パターンを正しく実装している限り、`[UnmanagedResourceReleaseMethod]`属性を付与したメソッドはオブジェクトが生成されてから消滅するまでに、その間の明示的な破棄の有無や回数に関わらず、自動実装側からの呼び出し回数が必ず１回なることが保証されます。

## AutomaticNotifyPropertyChangedImpl

TODO

## CancellationAnalyzer

TODO

## Cs0436Relaxation

ソースジェネレータが生成したクラス等を含むアセンブリ同士でInternalsVisbleTo属性が指定されている場合に発生する場合がある[CS0436](https://docs.microsoft.com/dotnet/csharp/misc/cs0436)警告を適切に緩和するためのアナライザです。

### Introduction

ソースジェネレータを利用するアセンブリ同士の参照にInternalsVisbleTo属性が適用されていると、InternalsVisbleToに指定されたアセンブリからソースジェネレータが生成した属性などを利用する箇所で、CS0436警告が発生する場合があります。

ソースジェネレータを利用する場合、ソースジェネレータが属性などをinternalなクラスとしてソース生成し、ユーザコード内でそれらをソース生成に関するマークとして使用する場合があります。通常、internalなクラスは異なるアセンブリを跨いで直接参照することが出来ないため問題となりませんが、InternalsVisbleTo属性が指定されている場合はinternalクラスも参照できてしまうため、ソースジェネレータが生成した型が、自分自身と参照アセンブリの両方に全く同一の名前空間と識別子で存在する状態となってしまい、以下の例の中にあるような形で競合(CS0436)が発生します。

```cs
// この例で、A.dll,B.dll,C.dllアセンブリに対してソースジェネレータが暗黙的に生成している属性クラス

namespace SourceGen;

internal ExampleMarkerAttribute : Attribute
{}
```

```cs
// A.dll

[assembly: InternalsVisibleTo("C")]

namespace A;

// A.dllでは自分自身の中で生成されているソースが
// 唯一のExampleMarker属性の定義であるので、
// ExampleMarkerが競合することはない
[SourceGen.ExampleMarker]
class ClassA {}
```

```cs
// B.dll (A.dllを参照アセンブリに含む)

namespace B;

// B.dllでは、自分自身と参照アセンブリのA.dllで
// ExampleMarkerの定義が重複しているが、
// ExampleMarkerがinternalでB.dllからアクセスが出来ないため、
// A.dllとB.dllのExampleMarkerは競合しない
[SourceGen.ExampleMarker]
class ClassB {}
```

```cs
// C.dll (A.dllを参照アセンブリに含む)

namespace C;

// C.dllでは、自分自身と参照アセンブリのA.dllで
// ExampleMarkerの定義が重複している上に、
// C.dllからA.dllのinternalな型やメンバにもアクセスが出来てしまうため、
// A.dllとC.dllのExampleMarkerが競合する
[SourceGen.ExampleMarker] // CS0436が発生する
class ClassC {}
```

Cs0436Relaxationは、CS0436を一旦抑止(suggestion化)する代わりに、Cs0436Relaxationgaが上記の様なソースジェネレータ都合以外で発生する抑止する必要のなかったCS0436を別のID(RX_CS0436_1)のwarningとして報告することで、実質的にソースジェネレータに関わるCS0436だけを抑止することが出来ます。

### インストール

⚠️ VisualStudioを利用する場合は2022の最新版が必要です。

Cs0436Relaxationを利用するためにはCs0436Relaxation自体をプロジェクトのPackageReferenceに加えるだけでなく、生のCS0436をwarningからsuggestionに変更するeditorconfigの設定も必要になります。また、Cs0436Relaxationが機能していないプロジェクトでeditorconfigの設定の方だけが有効となってしまうとそのプロジェクトでは単純にCS0436が警告対象から外れたままとなってしまうので、どちらの設定も全てのプロジェクトで共通化されるように設定することをお勧めします。

以下の手順は、全てのプロジェクトに共通で設定する前提のものです。

#### 手順１ Directory.Build.propsの配置(編集)

以下のDirectory.Build.propsを全てのプロジェクトを含むルートフォルダに配置します。

```xml
<Project>
  <ItemGroup>
    <PackageReference Include="Benutomo.Cs0436Relaxation" Version="1.0.0-alpha9" PrivateAssets="true" />
  </ItemGroup>
</Project>
```

既にDirectory.Build.propsが存在している場合は、既存のDirectory.Build.propsの中に上記のPackageReferenceを加えます。

最新のバージョンは[NuGet](https://www.nuget.org/packages/Benutomo.Cs0436Relaxation/)をご参照ください。

##### 参考

- [ビルドのカスタマイズ](https://docs.microsoft.com/visualstudio/msbuild/customize-your-build)

#### 手順２ editorconfigの配置(編集)

以下の.editorconfigを全てのプロジェクトを含むルートフォルダに配置します。

```conf
# CS0436(型がインポートされた型と競合しています)を抑止。ソースジェネレータ起因以外のCS0436はCs0436RelaxationがRX_CS0436_1としてwarning。
dotnet_diagnostic.CS0436.severity = suggestion
```

既存の.editorconfigが既に存在する場合はその中に付け加えます。Cs0436Relaxationが働くプロジェクトに対してCS0436の重要度をwarningからsuggestionまで落とします。

##### 参考

- [EditorConfig.org](https://editorconfig.org/)
- [EditorConfig で移植可能なカスタム エディター設定を作成する](https://docs.microsoft.com/visualstudio/ide/create-portable-custom-editor-options)

### Cs0436Relaxationが正しく機能している場合の警告について

Cs0436Relaxationが機能している環境では以下の警告が発生します。下記の通り、ソースジェネレータ起因でないCS0436のみが、RX_CS0436_1として報告されるようになります。

| ID | 概要 |
|---------|--|
| RX_CS0436_0 | Cs0436Relaxationが機能しているプロジェクトのコンパイルでCS0436がwarningとして発生した場合に発生するwarningです。Cs0436Relaxationを取り除くか.editroconfigを編集してCS0436をsuggestionにする必要があります。 |
| RX_CS0436_1 | ソースジェネレータに起因する定義以外に対してCS0436が発生したことをwarningで知らせます。生のCS0436が発生した場合と同様の対処が必要です。 |
