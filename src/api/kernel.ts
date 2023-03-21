import { kernel } from '../libs/kernel.ts';
import { Converter } from '../win_types.ts';

export class Kernel {
	public libs = kernel;

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
