type WIN_TYPES =
	| '_POINTER'
	| 'ATOM'
	| 'BOOL'
	| 'DWORD'
	| 'HBRUSH'
	| 'HCURSOR'
	| 'HICON'
	| 'HINSTANCE'
	| 'HMENU'
	| 'HMODULE'
	| 'HWND'
	| 'int'
	| 'LONG'
	| 'LPARAM'
	| 'LPCWSTR'
	| 'LPMSG'
	| 'LPVOID'
	| 'LRESULT'
	| 'UINT'
	| 'WNDCLASSEXW'
	| 'WNDPROC'
	| 'WPARAM';

type ATOM = number;
type DWORD = number;
type int = number;
type HINSTANCE = LPVOID;
type HMENU = LPVOID;
type HMODULE = LPVOID;
type HWND = LPVOID;
type LPARAM = LPVOID;
type LPCWSTR = LPVOID;
type LPMSG = LPVOID;
type LPVOID = bigint;
type LPWNDCLASSEXW = bigint;
type LRESULT = LPVOID;
type UINT = number;
type WPARAM = LPVOID;

type SafeNativeType = Exclude<Deno.NativeType, { readonly struct: readonly Deno.NativeType[] }>;

interface SafeNativeTypeMap {
	_POINTER: 'pointer';
	ATOM: 'u16';
	BOOL: 'i32';
	DWORD: 'i32';
	HBRUSH: 'pointer';
	HCURSOR: 'pointer';
	HICON: 'pointer';
	HINSTANCE: 'pointer';
	HMODULE: 'pointer';
	HMENU: 'pointer';
	HWND: 'pointer';
	int: 'i32';
	LONG: 'i64';
	LPARAM: 'pointer';
	LPCWSTR: 'pointer';
	LPMSG: 'pointer';
	LPVOID: 'pointer';
	LRESULT: 'pointer';
	UINT: 'u32';
	WNDCLASSEXW: 'pointer';
	WNDPROC: 'pointer';
	WPARAM: 'pointer';
}

interface WindowsStruct<T extends LPVOID> {
	data: Uint8Array;
	endian?: boolean;
	readonly pointer: T;
}

type WindowMessageName =
	| 'WM_ACTIVATEAPP'
	| 'WM_CANCELMODE'
	| 'WM_CHILDACTIVATE'
	| 'WM_CLOSE'
	| 'WM_COMPACTING'
	| 'WM_CREATE'
	| 'WM_DESTROY'
	| 'WM_DPICHANGED'
	| 'WM_ENABLE'
	| 'WM_ENTERSIZEMOVE'
	| 'WM_EXITSIZEMOVE'
	| 'WM_GETICON'
	| 'WM_GETMINMAXINFO'
	| 'WM_INPUTLANGCHANGE'
	| 'WM_INPUTLANGCHANGEREQUEST'
	| 'WM_MOVE'
	| 'WM_MOVING'
	| 'WM_NCACTIVATE'
	| 'WM_NCCALCSIZE'
	| 'WM_NCCREATE'
	| 'WM_NCDESTROY'
	| 'WM_NULL'
	| 'WM_QUERYDRAGICON'
	| 'WM_QUERYOPEN'
	| 'WM_QUIT'
	| 'WM_SHOWWINDOW'
	| 'WM_SIZE'
	| 'WM_SIZING'
	| 'WM_STYLECHANGED'
	| 'WM_STYLECHANGING'
	| 'WM_THEMECHANGED'
	| 'WM_USERCHANGED'
	| 'WM_WINDOWPOSCHANGED'
	| 'WM_WINDOWPOSCHANGING';