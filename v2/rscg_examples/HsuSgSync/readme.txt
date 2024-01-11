# Hsu.Sg

[![dev](https://github.com/hsu-net/source-generators/actions/workflows/build.yml/badge.svg?branch=dev)](https://github.com/hsu-net/source-generators/actions/workflows/build.yml)
[![preview](https://github.com/hsu-net/source-generators/actions/workflows/deploy.yml/badge.svg?branch=preview)](https://github.com/hsu-net/source-generators/actions/workflows/deploy.yml)
[![main](https://github.com/hsu-net/source-generators/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/hsu-net/source-generators/actions/workflows/deploy.yml)
[![nuke build](https://img.shields.io/badge/nuke-build-yellow.svg)](https://github.com/nuke-build/nuke)

.NET source generators

## Package Version

| Name | Source | Stable | Preview |
|---|---|---|---|
| Hsu.Sg.Sync | Nuget | [![NuGet](https://img.shields.io/nuget/v/Hsu.Sg.Sync?style=flat-square)](https://www.nuget.org/packages/Hsu.Sg.Sync) | [![NuGet](https://img.shields.io/nuget/vpre/Hsu.Sg.Sync?style=flat-square)](https://www.nuget.org/packages/Hsu.Sg.Sync) |
| Hsu.Sg.Sync | MyGet | [![MyGet](https://img.shields.io/myget/godsharp/v/Hsu.Sg.Sync?style=flat-square&label=myget)](https://www.myget.org/feed/godsharp/package/nuget/Hsu.Sg.Sync) | [![MyGet](https://img.shields.io/myget/godsharp/vpre/Hsu.Sg.Sync?style=flat-square&label=myget)](https://www.myget.org/feed/godsharp/package/nuget/Hsu.Sg.Sync) |
| Hsu.Sg.Proxy | Nuget | [![NuGet](https://img.shields.io/nuget/v/Hsu.Sg.Proxy?style=flat-square)](https://www.nuget.org/packages/Hsu.Sg.Proxy) | [![NuGet](https://img.shields.io/nuget/vpre/Hsu.Sg.Proxy?style=flat-square)](https://www.nuget.org/packages/Hsu.Sg.Proxy) |
| Hsu.Sg.Proxy | MyGet | [![MyGet](https://img.shields.io/myget/godsharp/v/Hsu.Sg.Proxy?style=flat-square&label=myget)](https://www.myget.org/feed/godsharp/package/nuget/Hsu.Sg.Proxy) | [![MyGet](https://img.shields.io/myget/godsharp/vpre/Hsu.Sg.Proxy?style=flat-square&label=myget)](https://www.myget.org/feed/godsharp/package/nuget/Hsu.Sg.Proxy) |
| Hsu.Sg.FluentMember| Nuget | [![NuGet](https://img.shields.io/nuget/v/Hsu.Sg.FluentMember?style=flat-square)](https://www.nuget.org/packages/Hsu.Sg.FluentMember) | [![NuGet](https://img.shields.io/nuget/vpre/Hsu.Sg.FluentMember?style=flat-square)](https://www.nuget.org/packages/Hsu.Sg.FluentMember) |
| Hsu.Sg.FluentMember| MyGet | [![MyGet](https://img.shields.io/myget/godsharp/v/Hsu.Sg.FluentMember?style=flat-square&label=myget)](https://www.myget.org/feed/godsharp/package/nuget/Hsu.Sg.FluentMember) | [![MyGet](https://img.shields.io/myget/godsharp/vpre/Hsu.Sg.FluentMember?style=flat-square&label=myget)](https://www.myget.org/feed/godsharp/package/nuget/Hsu.Sg.FluentMember) |

## Package Features

### Hsu.Sg.Sync

Generate a synchronous method from an asynchronous method.

Usages see [README](https://github.com/hsu-net/source-generators/Hsu.Sg.Sync/README.md)

### Hsu.Sg.Proxy

Generate a proxy object from a `struct` or `class` or `interface`.

Usages see [README](https://github.com/hsu-net/source-generators/Hsu.Sg.Proxy/README.md)

### Hsu.Sg.FluentMember

Generate a fluent method from a `struct` or `class`.

Usages see [README](https://github.com/hsu-net/source-generators/Hsu.Sg.FluentMember/README.md)

## References

- [Source Generators Cookbook](https://github.com/dotnet/roslyn/blob/main/docs/features/source-generators.cookbook.md)
- [Incremental Generators](https://github.com/dotnet/roslyn/blob/main/docs/features/incremental-generators.md)

## License

[MIT](./LICENSE)