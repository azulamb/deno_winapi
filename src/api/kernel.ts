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
  WithCallback,
  WORD,
} from '../types.ts';
import { Create } from '../support/create.ts';
import { Max } from '../support/constant.ts';

/**
 * Kernel class provides methods to interact with the Windows kernel32.dll.
 */
export class Kernel {
  constructor(public libs: typeof kernel = kernel) {}

  /** Enumeration callbacks are synchronous and are released before returning. */
  public EnumResourceNamesEx(
    hModule: HMODULE,
    lpType: string | LPCWSTR,
    lpEnumFunc:
      | ENUMRESNAMEPROCW
      | ((
        module: HMODULE,
        type: LPWSTR,
        name: LPWSTR,
        param: LONG_PTR,
      ) => BOOL),
    lParam: LONG_PTR = 0n,
    dwFlags: {
      RESOURCE_ENUM_MUI?: boolean;
      RESOURCE_ENUM_LN?: boolean;
      RESOURCE_ENUM_VALIDATE?: boolean;
    } = {},
    LangId: LANGID = 0,
  ): WithCallback<boolean, typeof callbackFunctions.EnumResNameProcW> {
    const callback = typeof lpEnumFunc === 'function'
      ? new Deno.UnsafeCallback(callbackFunctions.EnumResNameProcW, lpEnumFunc)
      : undefined;
    try {
      return {
        result: this.libs.symbols.EnumResourceNamesExW(
          hModule,
          typeof lpType === 'string' ? Create.stringPointer(lpType) : lpType,
          callback?.pointer ?? lpEnumFunc as ENUMRESNAMEPROCW,
          lParam,
          this.resourceFlags(dwFlags),
          LangId,
        ) !== 0,
      };
    } finally {
      callback?.close();
    }
  }

  public EnumResourceTypesEx(
    hModule: HMODULE,
    lpEnumFunc:
      | ENUMRESTYPEPROCW
      | ((module: HMODULE, type: LPWSTR, param: LONG_PTR) => BOOL),
    lParam: LONG_PTR = 0n,
    dwFlags: {
      RESOURCE_ENUM_MUI?: boolean;
      RESOURCE_ENUM_LN?: boolean;
      RESOURCE_ENUM_VALIDATE?: boolean;
    } = {},
    LangId: LANGID = 0,
  ): WithCallback<boolean, typeof callbackFunctions.EnumResTypeProcW> {
    const callback = typeof lpEnumFunc === 'function'
      ? new Deno.UnsafeCallback(callbackFunctions.EnumResTypeProcW, lpEnumFunc)
      : undefined;
    try {
      return {
        result: this.libs.symbols.EnumResourceTypesExW(
          hModule,
          callback?.pointer ?? lpEnumFunc as ENUMRESTYPEPROCW,
          lParam,
          this.resourceFlags(dwFlags),
          LangId,
        ) !== 0,
      };
    } finally {
      callback?.close();
    }
  }

  private resourceFlags(
    flags: {
      RESOURCE_ENUM_MUI?: boolean;
      RESOURCE_ENUM_LN?: boolean;
      RESOURCE_ENUM_VALIDATE?: boolean;
    },
  ): number {
    return (flags.RESOURCE_ENUM_LN ? 1 : 0) |
      (flags.RESOURCE_ENUM_MUI ? 2 : 0) |
      (flags.RESOURCE_ENUM_VALIDATE ? 8 : 0);
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

  public GetModuleFileName(
    hModule: HMODULE = null,
    nSize: number = 0,
  ): string {
    let capacity = nSize <= 0 ? Max.MAX_PATH : nSize;
    if (!Number.isInteger(capacity) || capacity > 32768) {
      throw new RangeError('Invalid module path buffer size.');
    }
    while (true) {
      const buffer = new Uint16Array(capacity);
      const length = this.libs.symbols.GetModuleFileNameW(
        hModule,
        Deno.UnsafePointer.of(buffer),
        capacity,
      );
      if (length === 0) {
        throw new Error(
          `GetModuleFileNameW failed: ${this.libs.symbols.GetLastError()}`,
        );
      }
      if (length < capacity) {
        return String.fromCharCode(...buffer.subarray(0, length));
      }
      if (capacity === 32768) {
        throw new Error('Module path exceeds the supported limit.');
      }
      capacity = Math.min(capacity * 2, 32768);
    }
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
