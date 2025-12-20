using Silhouette;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace ProfilerDemo;

[Profiler("8AD62131-BF21-47C1-A4D4-3AEF5D7C75C6")]
internal class MyProfiler : CorProfilerCallback5Base
{
    protected override HResult Initialize(int iCorProfilerInfoVersion)
    {
        Console.WriteLine("[SilhouetteProf] Initialize");
        if (iCorProfilerInfoVersion < 5)
        {
            // we need at least ICorProfilerInfo5 and we got < 5
            return HResult.E_FAIL;
        }

        // Call SetEventMask to tell the .NET runtime which events we're interested in
        return ICorProfilerInfo5.SetEventMask(COR_PRF_MONITOR.COR_PRF_MONITOR_ALL);
    }
    protected override HResult ClassLoadStarted(ClassId classId)
    {
        try
        {
            ClassIdInfo classIdInfo = ICorProfilerInfo.GetClassIdInfo(classId).ThrowIfFailed();

            using ComPtr<IMetaDataImport>? metaDataImport = ICorProfilerInfo2
                                                                .GetModuleMetaDataImport(classIdInfo.ModuleId, CorOpenFlags.ofRead)
                                                                .ThrowIfFailed()
                                                                .Wrap();
            TypeDefPropsWithName classProps = metaDataImport.Value.GetTypeDefProps(classIdInfo.TypeDef).ThrowIfFailed();

            Console.WriteLine($"[SilhouetteProf] ClassLoadStarted: {classProps.TypeName}");
            return HResult.S_OK;
        }
        catch (Win32Exception ex)
        {
            Console.WriteLine($"[SilhouetteProf] ClassLoadStarted failed: {ex}");
            return ex.NativeErrorCode;
        }

    }
    protected override HResult Shutdown()
    {
        Console.WriteLine("[SilhouetteProf] Shutdown");
        return HResult.S_OK;
    }

}
