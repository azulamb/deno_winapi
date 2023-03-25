// lib.deno.unstable.d.ts
interface ForeignFunction<T extends SafeNativeType | 'void', A extends readonly SafeNativeType[]> extends Deno.ForeignFunction {
	parameters: A;
	result: T;
	nonblocking: false;
}

interface WithCallback<T, S extends Deno.UnsafeCallbackDefinition> {
	result: T;
	callback?: Deno.UnsafeCallback<S>;
}

type WIN_TYPES =
	| '_POINTER'
	| 'ATOM'
	| 'BOOL'
	| 'DWORD'
	| 'ENUMRESNAMEPROCW'
	| 'ENUMRESTYPEPROCW'
	| 'HBRUSH'
	| 'HCURSOR'
	| 'HICON'
	| 'HINSTANCE'
	| 'HMENU'
	| 'HMODULE'
	| 'HWND'
	| 'int'
	| 'LANGID'
	| 'LONG'
	| 'LONG_PTR'
	| 'LPARAM'
	| 'LPCWSTR'
	| 'LPMSG'
	| 'LPVOID'
	| 'LPWSTR'
	| 'LRESULT'
	| 'UINT'
	| 'WNDCLASSEXW'
	| 'WNDPROC'
	| 'WPARAM';

type ATOM = number;
type BOOL = number;
type DWORD = number;
type ENUMRESNAMEPROCW = LPVOID;
type ENUMRESTYPEPROCW = LPVOID;
type int = number;
type HBRUSH = LPVOID;
type HCURSOR = LPVOID;
type HICON = LPVOID;
type HINSTANCE = LPVOID;
type HMENU = LPVOID;
type HMODULE = LPVOID;
type HWND = LPVOID;
type LANGID = number;
type LONG = bigint;
type LONG_PTR = LPVOID;
type LPARAM = LPVOID;
type LPCWSTR = LPVOID;
type LPMSG = LPVOID;
type LPVOID = Deno.PointerValue;
type LPWNDCLASSEXW = LPVOID;
type LPWSTR = LPVOID;
type LRESULT = LPVOID;
type POINT = {
	readonly x: LONG;
	readonly y: LONG;
};
type UINT = number;
type WNDPROC = LPVOID;
type WPARAM = LPVOID;
type WORD = number;

type SafeNativeType = Exclude<Deno.NativeType, { readonly struct: readonly Deno.NativeType[] }>;

interface SafeNativeTypeMap {
	_POINTER: 'pointer';
	ATOM: 'u16';
	BOOL: 'i32';
	DWORD: 'i32';
	ENUMRESNAMEPROCW: 'pointer';
	ENUMRESTYPEPROCW: 'pointer';
	HBRUSH: 'pointer';
	HCURSOR: 'pointer';
	HICON: 'pointer';
	HINSTANCE: 'pointer';
	HMODULE: 'pointer';
	HMENU: 'pointer';
	HWND: 'pointer';
	int: 'i32';
	LANGID: 'u16';
	LONG: 'i64';
	LONG_PTR: 'pointer';
	LPARAM: 'pointer';
	LPCWSTR: 'pointer';
	LPMSG: 'pointer';
	LPVOID: 'pointer';
	LPWSTR: 'pointer';
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

type WindowsResourceType =
	| 'RT_CURSOR'
	| 'RT_BITMAP'
	| 'RT_ICON'
	| 'RT_MENU'
	| 'RT_DIALOG'
	| 'RT_STRING'
	| 'RT_FONTDIR'
	| 'RT_FONT'
	| 'RT_ACCELERATOR'
	| 'RT_RCDATA'
	| 'RT_MESSAGETABLE'
	| 'RT_GROUP_CURSOR'
	| 'RT_GROUP_ICON'
	| 'RT_VERSION'
	| 'RT_DLGINCLUDE'
	| 'RT_PLUGPLAY'
	| 'RT_VXD'
	| 'RT_ANICURSOR'
	| 'RT_ANIICON'
	| 'RT_HTML'
	| 'RT_MANIFEST';
