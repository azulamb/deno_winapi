import { callbackFunctions, kernel } from '../libs/kernel.ts';
import { Converter } from '../win_types.ts';
import type {
  BOOL,
  DWORD,
  ENUMRESNAMEPROCW,
  ENUMRESTYPEPROCW,
  HMODULE,
  LANGID,
  LONG_PTR,
  LPCWSTR,
  LPWSTR,
  SafeNativeTypeMap,
  WithCallback,
} from '../types.ts';

export class Kernel {
  public libs = kernel;

  public EnumResourceNamesEx(
    hModule: HMODULE | null,
    lpType: LPCWSTR,
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

  public GetLastError(): DWORD {
    return Converter.DWORD(this.libs.symbols.GetLastError());
  }

  public GetModuleHandle(lpModuleName: LPCWSTR | null = null): HMODULE {
    return Converter.HMODULE(this.libs.symbols.GetModuleHandleW(lpModuleName));
  }

  public FreeConsole(): boolean {
    return Converter.BOOL(this.libs.symbols.FreeConsole());
  }
}
