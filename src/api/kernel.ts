import { kernel } from '../libs/kernel.ts';
import { Converter, winTypes } from '../win_types.ts';

export class Kernel {
	public libs = kernel;

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
	) {
		if (typeof lpEnumFunc === 'function') {
			const func = lpEnumFunc;
			const callback = new Deno.UnsafeCallback(
				{
					parameters: [
						winTypes.HMODULE, // [in, optional] HMODULE hModule
						winTypes.LPWSTR, // LPWSTR lpType,
						winTypes.LONG_PTR, // [in] LONG_PTR lParam
					],
					result: winTypes.BOOL,
				},
				(
					hModule: Deno.PointerValue,
					lpType: Deno.PointerValue,
					lParam: Deno.PointerValue,
				) => {
					return func(Converter.HMODULE(hModule), Converter.LPWSTR(lpType), Converter.LONG_PTR(lParam));
				},
			);
			lpEnumFunc = callback.pointer;
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

		return kernel.symbols.EnumResourceTypesExW(hModule, lpEnumFunc, lParam, dwFlagsNum, LangId);
	}

	public GetLastError(): DWORD {
		return Converter.DWORD(this.libs.symbols.GetLastError());
	}

	public GetModuleHandle(lpModuleName: LPCWSTR | null = null): HMODULE {
		return Converter.HMODULE(this.libs.symbols.GetModuleHandleW(lpModuleName));
	}

	public FreeConsole() {
		return Converter.BOOL(this.libs.symbols.FreeConsole());
	}
}
