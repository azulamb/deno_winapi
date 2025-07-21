/** Interface for a function with a callback  */
export interface WithCallback<T, S extends Deno.UnsafeCallbackDefinition> {
  result: T;
  callback?: Deno.UnsafeCallback<S>;
}

/** Windows API types */
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

/** ATOM in Deno */
export type ATOM = number;
/** BOOL in Deno */
export type BOOL = number;
/** DWORD in Deno */
export type DWORD = number;
/** ENUMRESNAMEPROCW in Deno */
export type ENUMRESNAMEPROCW = LPVOID;
/** ENUMRESTYPEPROCW in Deno */
export type ENUMRESTYPEPROCW = LPVOID;
/** int in Deno */
export type int = number;
/** HBRUSH in Deno */
export type HBRUSH = LPVOID;
/** HCURSOR in Deno */
export type HCURSOR = LPVOID;
/** HGLOBAL in Deno */
export type HGLOBAL = LPVOID;
/** HICON in Deno */
export type HICON = LPVOID;
/** HINSTANCE in Deno */
export type HINSTANCE = LPVOID;
/** HMENU in Deno */
export type HMENU = LPVOID;
/** HMODULE in Deno */
export type HMODULE = LPVOID;
/** HRESULT in Deno */
export type HRESULT = number;
/** HRSRC in Deno */
export type HRSRC = LPVOID;
/** HWND in Deno */
export type HWND = LPVOID;
/** LANGID in Deno */
export type LANGID = number;
/** LONG in Deno */
export type LONG = bigint;
/** LONG_PTR in Deno */
export type LONG_PTR = LPVOID;
/** LPARAM in Deno */
export type LPARAM = LPVOID;
/** LPCWSTR in Deno */
export type LPCWSTR = LPVOID;
/** LPMSG in Deno */
export type LPMSG = LPVOID;
/** LPRECT in Deno */
export type LPRECT = LPVOID;
/** LPVOID in Deno */
export type LPVOID = Deno.PointerValue;
/** LPWNDCLASSEXW in Deno */
export type LPWNDCLASSEXW = LPVOID;
/** LPWSTR in Deno */
export type LPWSTR = LPVOID;
/** LRESULT in Deno */
export type LRESULT = LPVOID;
/** MSG in Deno */
export type MSG = LPVOID;
/** PBYTE in Deno */
export type PBYTE = Deno.PointerValue<Uint8Array>;
/** POINT in Deno */
export type POINT = {
  readonly x: LONG;
  readonly y: LONG;
};
/** RECT in Deno */
export type RECT = {
  readonly left: LONG;
  readonly top: LONG;
  readonly right: LONG;
  readonly bottom: LONG;
};
/** UINT in Deno */
export type UINT = number;
/** DENO_CALLBACK_WNDPROC in Deno */
export type DENO_CALLBACK_WNDPROC = Deno.UnsafeCallbackDefinition<
  ['pointer', 'u32', 'pointer', 'pointer'],
  'pointer'
>;
/** WNDPROC in Deno */
export type WNDPROC = Deno.PointerValue<DENO_CALLBACK_WNDPROC>;
/** WPARAM in Deno */
export type WPARAM = LPVOID;
/** WORD in Deno */
export type WORD = number;

/** SafeNativeType */
export type SafeNativeType = Exclude<
  Deno.NativeType,
  { readonly struct: readonly Deno.NativeType[] }
>;

/** SafeNativeTypeMap Deno.ffi type */
export type SafeNativeTypeMap = {
  _POINTER: 'pointer';
  ATOM: 'u16';
  BOOL: 'i32';
  DWORD: 'u32';
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

/** WindowsStruct in Deno */
export interface WindowsStruct<T extends LPVOID> {
  data: Uint8Array;
  endian?: boolean;
  readonly pointer: T;
}

/** WindowMessageNames */
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

/** WindowsResourceTypes */
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
