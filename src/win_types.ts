// https://deno.land/manual/runtime/ffi_api#supported-types
export const winTypes: { [key in WIN_TYPES]: SafeNativeTypeMap[key] } = {
	_POINTER: 'pointer',
	ATOM: 'u16',
	BOOL: 'i32',
	DWORD: 'i32',
	HBRUSH: 'pointer',
	HCURSOR: 'pointer',
	HICON: 'pointer',
	HINSTANCE: 'pointer',
	HMODULE: 'pointer',
	HMENU: 'pointer',
	HWND: 'pointer',
	int: 'i32',
	LONG: 'i64',
	LPARAM: 'pointer',
	LPCWSTR: 'pointer',
	LPMSG: 'pointer',
	LPVOID: 'pointer',
	LRESULT: 'pointer',
	UINT: 'u32',
	WNDCLASSEXW: 'pointer',
	WNDPROC: 'pointer',
	WPARAM: 'pointer',
};

const POINTER = 8;
const ffiTypeSizes: { [key in SafeNativeType]: number } = {
	bool: 1, // ?
	i8: 1,
	u8: 1,
	i16: 2,
	u16: 2,
	i32: 4,
	u32: 4,
	f32: 4,
	i64: 8,
	f64: 8,
	u64: 8,
	isize: 8,
	usize: 8,
	buffer: POINTER,
	function: POINTER,
	pointer: POINTER,
};

// Size of types.
// deno-lint-ignore no-explicit-any
export const winTypeSizes: { [key in WIN_TYPES]: number } = <any> {};
Object.keys(winTypes).forEach((k) => {
	const key = <WIN_TYPES> k;
	winTypeSizes[key] = ffiTypeSizes[winTypes[key]];
});

// https://learn.microsoft.com/ja-jp/windows/win32/winmsg/window-notifications
export const winMassage: { [key in WindowMessageName]: number } = {
	WM_NULL: 0x0000,
	WM_CREATE: 0x0001,
	WM_DESTROY: 0x0002,
	WM_MOVE: 0x0003,
	WM_SIZE: 0x0005,
	WM_ENABLE: 0x000A,
	WM_CLOSE: 0x0010,
	WM_QUIT: 0x0012,
	WM_QUERYOPEN: 0x0013,
	WM_SHOWWINDOW: 0x0018,
	WM_ACTIVATEAPP: 0x001C,
	WM_CANCELMODE: 0x001F,
	WM_CHILDACTIVATE: 0x0022,
	WM_GETMINMAXINFO: 0x0024,
	WM_QUERYDRAGICON: 0x0037,
	WM_COMPACTING: 0x0041,
	WM_WINDOWPOSCHANGING: 0x0046,
	WM_WINDOWPOSCHANGED: 0x0047,
	WM_INPUTLANGCHANGEREQUEST: 0x0050,
	WM_INPUTLANGCHANGE: 0x0051,
	WM_USERCHANGED: 0x0054,
	WM_STYLECHANGING: 0x007C,
	WM_STYLECHANGED: 0x007D,
	WM_GETICON: 0x007F,
	WM_NCCREATE: 0x0081,
	WM_NCDESTROY: 0x0082,
	WM_NCCALCSIZE: 0x0083,
	WM_NCACTIVATE: 0x0086,
	WM_SIZING: 0x0214,
	WM_MOVING: 0x0216,
	WM_ENTERSIZEMOVE: 0x0231,
	WM_EXITSIZEMOVE: 0x0232,
	WM_DPICHANGED: 0x02E0,
	WM_THEMECHANGED: 0x031A,
};

export const constant = {
	CW_USEDEFAULT: -2147483648, // CW_USEDEFAULT = 0x80000000
};

export class Converter {
	// FFI to JS
	static pointer(pointer: Deno.PointerValue): LPVOID {
		return BigInt(pointer);
	}

	// Windows types to JS
	static ATOM(value: number) {
		// TODO: convert u16
		return value;
	}

	static BOOL(value: number) {
		return value !== 0;
	}

	static DWORD(value: number) {
		// TODO: convert i32
		return value;
	}

	static HMODULE(pointer: Deno.PointerValue): HMODULE {
		return this.pointer(pointer);
	}

	static HWND(pointer: Deno.PointerValue): HWND {
		return this.pointer(pointer);
	}

	static int(value: number) {
		// TODO: convert i32
		return value;
	}

	static LPARAM(pointer: Deno.PointerValue): LPARAM {
		return this.pointer(pointer);
	}

	static LPMSG(pointer: Deno.PointerValue): LPMSG {
		return this.pointer(pointer);
	}

	static LRESULT(pointer: Deno.PointerValue): LRESULT {
		return this.pointer(pointer);
	}

	static LPWNDCLASSEXW(pointer: Deno.PointerValue): LPWNDCLASSEXW {
		return this.pointer(pointer);
	}

	static UINT(value: number) {
		// TODO: convert u32
		return value;
	}

	static WPARAM(pointer: Deno.PointerValue): WPARAM {
		return this.pointer(pointer);
	}
}

// lib.deno.unstable.d.ts
export interface ForeignFunction<T extends SafeNativeType | 'void', A extends readonly SafeNativeType[]> extends Deno.ForeignFunction {
	parameters: A;
	result: T;
	nonblocking: false;
}
