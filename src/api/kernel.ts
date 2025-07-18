import { kernel } from '../libs/kernel.ts';
import { callbackFunctions } from '../libs/kernel_callback.ts';
import { Converter } from '../win_types.ts';
import type {
  BOOL,
  DWORD,
  ENUMRESNAMEPROCW,
  ENUMRESTYPEPROCW,
  HGLOBAL,
  HMODULE,
  HRSRC,
  LANGID,
  LONG_PTR,
  LPCWSTR,
  LPVOID,
  LPWSTR,
  SafeNativeTypeMap,
  WithCallback,
  WORD,
} from '../types.ts';
import { Create } from '../support/create.ts';

export class Kernel {
  public libs = kernel;

  public EnumResourceNamesEx(
    hModule: HMODULE | null,
    lpType: string | LPCWSTR,
    lpEnumFunc:
      | ENUMRESNAMEPROCW
      | ((
        hModule: HMODULE, // [in, optional]
        lpType: LPWSTR,
        lpName: LPWSTR,
        lParam: LONG_PTR, // [in]
      ) => BOOL),
    lParam: LONG_PTR = null,
    dwFlags: {
      RESOURCE_ENUM_MUI?: boolean;
      RESOURCE_ENUM_LN?: boolean;
      RESOURCE_ENUM_VALIDATE?: boolean;
    } = {},
    LangId: LANGID = 0,
  ): WithCallback<
    boolean,
    Deno.UnsafeCallbackDefinition<
      [
        SafeNativeTypeMap['HMODULE'],
        SafeNativeTypeMap['LPWSTR'],
        SafeNativeTypeMap['LPWSTR'],
        SafeNativeTypeMap['LONG_PTR'],
      ],
      SafeNativeTypeMap['BOOL']
    >
  > {
    const result: WithCallback<
      boolean,
      Deno.UnsafeCallbackDefinition<
        [
          SafeNativeTypeMap['HMODULE'],
          SafeNativeTypeMap['LPWSTR'],
          SafeNativeTypeMap['LPWSTR'],
          SafeNativeTypeMap['LONG_PTR'],
        ],
        SafeNativeTypeMap['BOOL']
      >
    > = {
      result: false,
      callback: undefined,
    };
    if (typeof lpEnumFunc === 'function') {
      const func = lpEnumFunc;
      result.callback = new Deno.UnsafeCallback(
        callbackFunctions.EnumResNameProcW,
        (
          hModule: HMODULE,
          lpType: LPWSTR,
          lpName: LPWSTR,
          lParam: LONG_PTR,
        ) => {
          return func(
            Converter.HMODULE(hModule),
            Converter.LPWSTR(lpType),
            Converter.LPWSTR(lpName),
            Converter.LONG_PTR(lParam),
          );
        },
      );
      lpEnumFunc = result.callback.pointer;
    }

    let dwFlagsNum = 0;
    if (dwFlags.RESOURCE_ENUM_LN) {
      dwFlagsNum |= 1;
    }
    if (dwFlags.RESOURCE_ENUM_MUI) {
      dwFlagsNum |= 2;
    }
    if (dwFlags.RESOURCE_ENUM_VALIDATE) {
      dwFlagsNum |= 8;
    }

    if (typeof lpType === 'string') {
      lpType = Create.stringPointer(lpType);
    }

    result.result = !!kernel.symbols.EnumResourceNamesExW(
      hModule,
      lpType,
      lpEnumFunc,
      lParam,
      dwFlagsNum,
      LangId,
    );
    return result;
  }

  public EnumResourceTypesEx(
    hModule: HMODULE | null,
    lpEnumFunc:
      | ENUMRESTYPEPROCW
      | ((
        hModule: HMODULE, // [in, optional]
        lpType: LPWSTR,
        lParam: LONG_PTR, // [in]
      ) => BOOL),
    lParam: LONG_PTR = null,
    dwFlags: {
      RESOURCE_ENUM_MUI?: boolean;
      RESOURCE_ENUM_LN?: boolean;
      RESOURCE_ENUM_VALIDATE?: boolean;
    } = {},
    LangId: LANGID = 0,
  ): WithCallback<
    boolean,
    Deno.UnsafeCallbackDefinition<
      [
        SafeNativeTypeMap['HMODULE'],
        SafeNativeTypeMap['LPWSTR'],
        SafeNativeTypeMap['LONG_PTR'],
      ],
      SafeNativeTypeMap['BOOL']
    >
  > {
    const result: WithCallback<
      boolean,
      Deno.UnsafeCallbackDefinition<
        [
          SafeNativeTypeMap['HMODULE'],
          SafeNativeTypeMap['LPWSTR'],
          SafeNativeTypeMap['LONG_PTR'],
        ],
        SafeNativeTypeMap['BOOL']
      >
    > = {
      result: false,
      callback: undefined,
    };
    if (typeof lpEnumFunc === 'function') {
      const func = lpEnumFunc;
      result.callback = new Deno.UnsafeCallback(
        callbackFunctions.EnumResTypeProcW,
        (
          hModule: HMODULE,
          lpType: LPWSTR,
          lParam: LONG_PTR,
        ) => {
          return func(
            Converter.HMODULE(hModule),
            Converter.LPWSTR(lpType),
            Converter.LONG_PTR(lParam),
          );
        },
      );
      lpEnumFunc = result.callback.pointer;
    }

    let dwFlagsNum = 0;
    if (dwFlags.RESOURCE_ENUM_LN) {
      dwFlagsNum |= 1;
    }
    if (dwFlags.RESOURCE_ENUM_MUI) {
      dwFlagsNum |= 2;
    }
    if (dwFlags.RESOURCE_ENUM_VALIDATE) {
      dwFlagsNum |= 8;
    }

    result.result = !!kernel.symbols.EnumResourceTypesExW(
      hModule,
      lpEnumFunc,
      lParam,
      dwFlagsNum,
      LangId,
    );

    return result;
  }

  public FindResourceEx(
    hModule: HMODULE | null,
    lpType: number | bigint | string | LPCWSTR,
    lpName: string | LPCWSTR,
    wLanguage: WORD = 0,
  ): HRSRC {
    if (typeof lpName === 'string') {
      lpName = Create.stringPointer(lpName);
    }

    return Converter.HRSRC(this.libs.symbols.FindResourceExW(
      hModule,
      Create.typePointerValue(lpType),
      lpName,
      wLanguage,
    ));
  }

  public FreeConsole(): boolean {
    return Converter.BOOL(this.libs.symbols.FreeConsole());
  }

  public GetLastError(): DWORD {
    return Converter.DWORD(this.libs.symbols.GetLastError());
  }

  public GetModuleHandle(
    lpModuleName: string | LPCWSTR | null = null,
  ): HMODULE {
    if (typeof lpModuleName === 'string') {
      lpModuleName = Create.stringPointer(lpModuleName);
    }
    return Converter.HMODULE(this.libs.symbols.GetModuleHandleW(lpModuleName));
  }

  public LoadResource(hModule: HMODULE = null, hResInfo: HRSRC): HGLOBAL {
    return Converter.HGLOBAL(this.libs.symbols.LoadResource(hModule, hResInfo));
  }

  public LockResource(hResData: HGLOBAL): LPVOID {
    return Converter.LPVOID(this.libs.symbols.LockResource(hResData));
  }

  public SizeofResource(hModule: HMODULE = null, hResInfo: HRSRC): DWORD {
    return Converter.DWORD(this.libs.symbols.SizeofResource(hModule, hResInfo));
  }
}
