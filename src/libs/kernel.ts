import { WinTypes } from '../win_types.ts';

export const callbackFunctions: {
	EnumResNameProcW: ForeignFunction<
		SafeNativeTypeMap['BOOL'],
		[SafeNativeTypeMap['HMODULE'], SafeNativeTypeMap['LPWSTR'], SafeNativeTypeMap['LPWSTR'], SafeNativeTypeMap['LONG_PTR']]
	>;
	EnumResTypeProcW: ForeignFunction<
		SafeNativeTypeMap['BOOL'],
		[SafeNativeTypeMap['HMODULE'], SafeNativeTypeMap['LPWSTR'], SafeNativeTypeMap['LONG_PTR']]
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
		nonblocking: false,
	},
	EnumResTypeProcW: {
		parameters: [
			WinTypes.HMODULE.ffi, // [in, optional] HMODULE hModule
			WinTypes.LPWSTR.ffi, // LPWSTR lpType
			WinTypes.LONG_PTR.ffi, // [in] LONG_PTR lParam
		],
		result: WinTypes.BOOL.ffi,
		nonblocking: false,
	},
};

export const kernel = Deno.dlopen(
	'kernel32.dll',
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
		FreeConsole: { // https://learn.microsoft.com/ja-jp/windows/console/freeconsole
			parameters: [],
			result: WinTypes.BOOL.ffi,
		},
		GetLastError: { // https://learn.microsoft.com/ja-jp/windows/win32/api/errhandlingapi/nf-errhandlingapi-getlasterror
			parameters: [],
			result: WinTypes.DWORD.ffi,
		},
		GetModuleHandleW: { // https://learn.microsoft.com/ja-jp/windows/win32/api/libloaderapi/nf-libloaderapi-getmodulehandlew
			parameters: [
				WinTypes.LPCWSTR.ffi, // [in, optional] LPCWSTR lpModuleName
			],
			result: WinTypes.HMODULE.ffi,
		},
	},
);
