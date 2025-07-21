import { WinTypes } from '../win_types.ts';
import type { KERNEL_FUNKS } from './kernel_types.ts';

/**
 * Kernel class provides methods to interact with the Windows kernel32.dll.
 */
export const kernel: Deno.DynamicLibrary<KERNEL_FUNKS> = Deno.dlopen(
  'C:\\Windows\\System32\\kernel32.dll',
  {
    EnumResourceNamesExW: { // https://learn.microsoft.com/ja-jp/windows/win32/api/libloaderapi/nf-libloaderapi-enumresourcenamesexw
      parameters: [
        WinTypes.HMODULE.ffi, // [in, optional] HMODULE hModule
        WinTypes.LPCWSTR.ffi, // LPCWSTR lpType
        WinTypes.ENUMRESNAMEPROCW.ffi, // [in]  ENUMRESNAMEPROCW lpEnumFunc
        WinTypes.LONG_PTR.ffi, //[in] LONG_PTR lParam
        WinTypes.DWORD.ffi, // [in] DWORD dwFlags
        WinTypes.LANGID.ffi, // [in] LANGID LangId
      ],
      result: WinTypes.BOOL.ffi,
    },
    EnumResourceTypesExW: { // https://learn.microsoft.com/ja-jp/windows-hardware/drivers/kernel/the-new-data-types
      parameters: [
        WinTypes.HMODULE.ffi, // [in, optional] HMODULE hModule
        WinTypes.ENUMRESTYPEPROCW.ffi, // [in] ENUMRESTYPEPROCW lpEnumFunc
        WinTypes.LONG_PTR.ffi, //[in] LONG_PTR lParam
        WinTypes.DWORD.ffi, // [in] DWORD dwFlags
        WinTypes.LANGID.ffi, // [in] LANGID LangId
      ],
      result: WinTypes.BOOL.ffi,
    },
    FindResourceExW: { // https://learn.microsoft.com/ja-jp/windows/win32/api/libloaderapi/nf-libloaderapi-findresourceexw
      parameters: [
        WinTypes.HMODULE.ffi, // [in, optional] HMODULE hModule
        WinTypes.LPCWSTR.ffi, // LPCWSTR lpType
        WinTypes.LPCWSTR.ffi, // LPCWSTR lpName
        WinTypes.WORD.ffi, // [in] WORD wLanguage
      ],
      result: WinTypes.HRSRC.ffi, // [out] HRSRC
    },
    FreeConsole: { // https://learn.microsoft.com/ja-jp/windows/console/freeconsole
      parameters: [],
      result: WinTypes.BOOL.ffi,
    },
    GetLastError: { // https://learn.microsoft.com/ja-jp/windows/win32/api/errhandlingapi/nf-errhandlingapi-getlasterror
      parameters: [],
      result: WinTypes.DWORD.ffi,
    },
    GetModuleFileNameW: { // https://learn.microsoft.com/ja-jp/windows/win32/api/libloaderapi/nf-libloaderapi-getmodulefilenamew
      parameters: [
        WinTypes.HMODULE.ffi, // [in, optional] HMODULE hModule
        WinTypes.LPWSTR.ffi, // [out] LPWSTR lpFilename
        WinTypes.DWORD.ffi, // [in] DWORD nSize
      ],
      result: WinTypes.DWORD.ffi, // [out] DWORD
    },
    GetModuleHandleW: { // https://learn.microsoft.com/ja-jp/windows/win32/api/libloaderapi/nf-libloaderapi-getmodulehandlew
      parameters: [
        WinTypes.LPCWSTR.ffi, // [in, optional] LPCWSTR lpModuleName
      ],
      result: WinTypes.HMODULE.ffi,
    },
    LoadResource: { // https://learn.microsoft.com/ja-jp/windows/win32/api/libloaderapi/nf-libloaderapi-loadresource
      parameters: [
        WinTypes.HMODULE.ffi, // [in] HMODULE hModule
        WinTypes.HRSRC.ffi, // [in] HRSRC hResInfo
      ],
      result: WinTypes.HGLOBAL.ffi, // [out] HGLOBAL
    },
    LockResource: { // https://learn.microsoft.com/ja-jp/windows/win32/api/libloaderapi/nf-libloaderapi-lockresource
      parameters: [
        WinTypes.HGLOBAL.ffi, // [in] HGLOBAL hResData
      ],
      result: WinTypes.LPVOID.ffi, // [out] LPVOID
    },
    SizeofResource: { // https://learn.microsoft.com/ja-jp/windows/win32/api/libloaderapi/nf-libloaderapi-sizeofresource
      parameters: [
        WinTypes.HMODULE.ffi, // [in] HMODULE hModule
        WinTypes.HRSRC.ffi, // [in] HRSRC hResInfo
      ],
      result: WinTypes.DWORD.ffi, // [out] DWORD
    },
  },
);
