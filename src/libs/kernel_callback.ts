import { WinTypes } from '../win_types.ts';

/**
 * Callback functions for kernel32.dll
 */
export const callbackFunctions = {
  EnumResNameProcW: {
    parameters: [
      WinTypes.HMODULE.ffi, // [in, optional] HMODULE hModule
      WinTypes.LPWSTR.ffi, // LPWSTR lpType
      WinTypes.LPWSTR.ffi, // LPWSTR lpName
      WinTypes.LONG_PTR.ffi, // [in] LONG_PTR lParam
    ],
    result: WinTypes.BOOL.ffi,
  },
  EnumResTypeProcW: {
    parameters: [
      WinTypes.HMODULE.ffi, // [in, optional] HMODULE hModule
      WinTypes.LPWSTR.ffi, // LPWSTR lpType
      WinTypes.LONG_PTR.ffi, // [in] LONG_PTR lParam
    ],
    result: WinTypes.BOOL.ffi,
  },
} as const satisfies Record<string, Deno.UnsafeCallbackDefinition>;
