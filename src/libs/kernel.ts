import { winTypes } from '../win_types.ts';

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
			winTypes.HMODULE, // [in, optional] HMODULE hModule
			winTypes.LPWSTR, // LPWSTR lpType
			winTypes.LPWSTR, // LPWSTR lpName
			winTypes.LONG_PTR, // [in] LONG_PTR lParam
		],
		result: winTypes.BOOL,
		nonblocking: false,
	},
	EnumResTypeProcW: {
		parameters: [
			winTypes.HMODULE, // [in, optional] HMODULE hModule
			winTypes.LPWSTR, // LPWSTR lpType
			winTypes.LONG_PTR, // [in] LONG_PTR lParam
		],
		result: winTypes.BOOL,
		nonblocking: false,
	},
};

export const kernel = Deno.dlopen(
	'kernel32.dll',
	{
		EnumResourceNamesExW: { // https://learn.microsoft.com/ja-jp/windows/win32/api/libloaderapi/nf-libloaderapi-enumresourcenamesexw
			parameters: [
				winTypes.HMODULE, // [in, optional] HMODULE hModule
				winTypes.LPCWSTR, // LPCWSTR lpType
				winTypes.ENUMRESNAMEPROCW, // [in]  ENUMRESNAMEPROCW lpEnumFunc
				winTypes.LONG_PTR, //[in] LONG_PTR lParam
				winTypes.DWORD, // [in] DWORD dwFlags
				winTypes.LANGID, // [in] LANGID LangId
			],
			result: winTypes.BOOL,
		},
		EnumResourceTypesExW: { // https://learn.microsoft.com/ja-jp/windows-hardware/drivers/kernel/the-new-data-types
			parameters: [
				winTypes.HMODULE, // [in, optional] HMODULE hModule
				winTypes.ENUMRESTYPEPROCW, // [in] ENUMRESTYPEPROCW lpEnumFunc
				winTypes.LONG_PTR, //[in] LONG_PTR lParam
				winTypes.DWORD, // [in] DWORD dwFlags
				winTypes.LANGID, // [in] LANGID LangId
			],
			result: winTypes.BOOL,
		},
		FreeConsole: { // https://learn.microsoft.com/ja-jp/windows/console/freeconsole
			parameters: [],
			result: winTypes.BOOL,
		},
		GetLastError: { // https://learn.microsoft.com/ja-jp/windows/win32/api/errhandlingapi/nf-errhandlingapi-getlasterror
			parameters: [],
			result: winTypes.DWORD,
		},
		GetModuleHandleW: { // https://learn.microsoft.com/ja-jp/windows/win32/api/libloaderapi/nf-libloaderapi-getmodulehandlew
			parameters: [
				winTypes.LPCWSTR, // [in, optional] LPCWSTR lpModuleName
			],
			result: winTypes.HMODULE,
		},
	},
);
