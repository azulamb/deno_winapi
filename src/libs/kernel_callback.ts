import type { WindowsSignature } from './signature.ts';
import { WinTypes } from '../win_types.ts';
/**
 * Callback functions for kernel32.dll
 */
export const callbackFunctions: {
  readonly EnumResNameProcW: WindowsSignature<
    ['HMODULE', 'LPWSTR', 'LPWSTR', 'LONG_PTR'],
    'BOOL'
  >;
  readonly EnumResTypeProcW: WindowsSignature<
    ['HMODULE', 'LPWSTR', 'LONG_PTR'],
    'BOOL'
  >;
} = {
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
