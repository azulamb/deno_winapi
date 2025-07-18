export interface WithCallback<T, S extends Deno.UnsafeCallbackDefinition> {
  result: T;
  callback?: Deno.UnsafeCallback<S>;
}

export type WIN_TYPES =
  | 'ATOM'
  | 'BOOL'
  | 'DWORD'
  | 'ENUMRESNAMEPROCW'
  | 'ENUMRESTYPEPROCW'
  | 'HBRUSH'
  | 'HCURSOR'
  | 'HGLOBAL'
  | 'HICON'
  | 'HINSTANCE'
  | 'HMENU'
  | 'HMODULE'
  | 'HRESULT'
  | 'HRSRC'
  | 'HWND'
  | 'int'
  | 'LANGID'
  | 'LONG'
  | 'LONG_PTR'
  | 'LPARAM'
  | 'LPCWSTR'
  | 'LPMSG'
  | 'LPRECT'
  | 'LPVOID'
  | 'LPWNDCLASSEXW'
  | 'LPWSTR'
  | 'LRESULT'
  | 'PBYTE'
  | 'RECT'
  | 'UINT'
  | 'WNDCLASSEXW'
  | 'WNDPROC'
  | 'WORD'
  | 'WPARAM';

export type ATOM = number;
export type BOOL = number;
export type DWORD = number;
export type ENUMRESNAMEPROCW = LPVOID;
export type ENUMRESTYPEPROCW = LPVOID;
export type int = number;
export type HBRUSH = LPVOID;
export type HCURSOR = LPVOID;
export type HGLOBAL = LPVOID;
export type HICON = LPVOID;
export type HINSTANCE = LPVOID;
export type HMENU = LPVOID;
export type HMODULE = LPVOID;
export type HRESULT = number;
export type HRSRC = LPVOID;
export type HWND = LPVOID;
export type LANGID = number;
export type LONG = bigint;
export type LONG_PTR = LPVOID;
export type LPARAM = LPVOID;
export type LPCWSTR = LPVOID;
export type LPMSG = LPVOID;
export type LPRECT = LPVOID;
export type LPVOID = Deno.PointerValue;
export type LPWNDCLASSEXW = LPVOID;
export type LPWSTR = LPVOID;
export type LRESULT = LPVOID;
export type MSG = LPVOID;
export type PBYTE = Deno.PointerValue<Uint8Array>;
export type POINT = {
  readonly x: LONG;
  readonly y: LONG;
};
export type RECT = {
  readonly left: LONG;
  readonly top: LONG;
  readonly right: LONG;
  readonly bottom: LONG;
};
export type UINT = number;
export type DENO_CALLBACK_WNDPROC = Deno.UnsafeCallbackDefinition<
  ['pointer', 'u32', 'pointer', 'pointer'],
  'pointer'
>;
export type WNDPROC = Deno.PointerValue<DENO_CALLBACK_WNDPROC>;
export type WPARAM = LPVOID;
export type WORD = number;

export type SafeNativeType = Exclude<
  Deno.NativeType,
  { readonly struct: readonly Deno.NativeType[] }
>;

export type SafeNativeTypeMap = {
  _POINTER: 'pointer';
  ATOM: 'u16';
  BOOL: 'i32';
  DWORD: 'i32';
  ENUMRESNAMEPROCW: 'pointer';
  ENUMRESTYPEPROCW: 'pointer';
  HBRUSH: 'pointer';
  HCURSOR: 'pointer';
  HGLOBAL: 'pointer';
  HICON: 'pointer';
  HINSTANCE: 'pointer';
  HMODULE: 'pointer';
  HMENU: 'pointer';
  HRESULT: 'i32';
  HRSRC: 'pointer';
  HWND: 'pointer';
  int: 'i32';
  LANGID: 'u16';
  LONG: 'i64';
  LONG_PTR: 'pointer';
  LPARAM: 'pointer';
  LPCWSTR: 'pointer';
  LPMSG: 'pointer';
  LPRECT: 'pointer';
  LPVOID: 'pointer';
  LPWNDCLASSEXW: 'pointer';
  LPWSTR: 'pointer';
  LRESULT: 'pointer';
  PBYTE: 'pointer';
  RECT: 'buffer';
  UINT: 'u32';
  void: 'void';
  WNDCLASSEXW: 'buffer';
  WNDPROC: 'pointer';
  WORD: 'u16';
  WPARAM: 'pointer';
};

export interface WindowsStruct<T extends LPVOID> {
  data: Uint8Array;
  endian?: boolean;
  readonly pointer: T;
}

export type WindowMessageName =
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
  | 'WM_SETICON'
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

export type WindowsResourceType =
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
