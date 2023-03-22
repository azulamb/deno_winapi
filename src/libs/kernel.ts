import { winTypes } from '../win_types.ts';

export const kernel = Deno.dlopen(
	'kernel32.dll',
	{
		EnumResourceTypesExW: { // https://learn.microsoft.com/ja-jp/windows-hardware/drivers/kernel/the-new-data-types
			parameters: [
				winTypes.HMODULE, // [in, optional] HMODULE hModule,
				winTypes.ENUMRESTYPEPROCW, // [in] ENUMRESTYPEPROCW lpEnumFunc,
				winTypes.LONG_PTR, //[in] LONG_PTR lParam,
				winTypes.DWORD, // [in] DWORD dwFlags,
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
