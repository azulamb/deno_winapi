import type { WindowsSignature } from './signature.ts';
import { WinTypes } from '../win_types.ts';
import { lazyLibrary } from './load.ts';

export const userDefinitions: {
  readonly SetThreadDpiAwarenessContext: WindowsSignature<
    ['DPI_AWARENESS_CONTEXT'],
    'DPI_AWARENESS_CONTEXT'
  >;
  readonly GetThreadDpiAwarenessContext: WindowsSignature<
    [],
    'DPI_AWARENESS_CONTEXT'
  >;
  readonly AreDpiAwarenessContextsEqual: WindowsSignature<
    ['DPI_AWARENESS_CONTEXT', 'DPI_AWARENESS_CONTEXT'],
    'BOOL'
  >;
  readonly GetDpiForWindow: WindowsSignature<['HWND'], 'UINT'>;
  readonly AdjustWindowRectExForDpi: WindowsSignature<
    ['LPRECT', 'DWORD', 'BOOL', 'DWORD', 'UINT'],
    'BOOL'
  >;
  readonly SetWindowPos: WindowsSignature<
    ['HWND', 'HWND', 'int', 'int', 'int', 'int', 'UINT'],
    'BOOL'
  >;
  readonly GetWindowRect: WindowsSignature<['HWND', 'LPRECT'], 'BOOL'>;
  readonly FindWindowW: WindowsSignature<['LPCWSTR', 'LPCWSTR'], 'HWND'>;
  readonly GetDC: WindowsSignature<['HWND'], 'HDC'>;
  readonly ReleaseDC: WindowsSignature<['HWND', 'HDC'], 'int'>;
  readonly FillRect: WindowsSignature<['HDC', 'LPRECT', 'HBRUSH'], 'int'>;
  readonly CreateIconFromResourceEx: WindowsSignature<
    ['PBYTE', 'DWORD', 'BOOL', 'DWORD', 'int', 'int', 'UINT'],
    'HICON'
  >;
  readonly CreateWindowExW: WindowsSignature<
    [
      'DWORD',
      'LPCWSTR',
      'LPCWSTR',
      'DWORD',
      'int',
      'int',
      'int',
      'int',
      'HWND',
      'HMENU',
      'HINSTANCE',
      'LPVOID',
    ],
    'HWND'
  >;
  readonly DefWindowProcW: WindowsSignature<
    ['HWND', 'UINT', 'WPARAM', 'LPARAM'],
    'LRESULT'
  >;
  readonly DispatchMessageW: WindowsSignature<['LPMSG'], 'LRESULT'>;
  readonly GetClientRect: WindowsSignature<['HWND', 'LPRECT'], 'BOOL'>;
  readonly GetMessageW: WindowsSignature<
    ['LPMSG', 'HWND', 'UINT', 'UINT'],
    'BOOL'
  >;
  readonly LoadIconW: WindowsSignature<['HINSTANCE', 'LPCWSTR'], 'HICON'>;
  readonly MessageBoxExW: WindowsSignature<
    ['HWND', 'LPCWSTR', 'LPCWSTR', 'UINT', 'DWORD'],
    'int'
  >;
  readonly PostQuitMessage: WindowsSignature<['int'], 'void'>;
  readonly RegisterClassExW: WindowsSignature<['LPWNDCLASSEXW'], 'ATOM'>;
  readonly SendMessageW: WindowsSignature<
    ['HWND', 'UINT', 'WPARAM', 'LPARAM'],
    'LRESULT'
  >;
  readonly SetWindowTextW: WindowsSignature<['HWND', 'LPCWSTR'], 'BOOL'>;
  readonly ShowWindow: WindowsSignature<['HWND', 'int'], 'BOOL'>;
  readonly TranslateMessage: WindowsSignature<['LPMSG'], 'BOOL'>;
  readonly UpdateWindow: WindowsSignature<['HWND'], 'BOOL'>;
  readonly PeekMessageW: WindowsSignature<
    ['LPMSG', 'HWND', 'UINT', 'UINT', 'UINT'],
    'BOOL'
  >;
  readonly DestroyWindow: WindowsSignature<['HWND'], 'BOOL'>;
  readonly UnregisterClassW: WindowsSignature<['LPCWSTR', 'HINSTANCE'], 'BOOL'>;
  readonly PostMessageW: WindowsSignature<
    ['HWND', 'UINT', 'WPARAM', 'LPARAM'],
    'BOOL'
  >;
} = {
  SetThreadDpiAwarenessContext: {
    parameters: [WinTypes.DPI_AWARENESS_CONTEXT.ffi],
    result: WinTypes.DPI_AWARENESS_CONTEXT.ffi,
  },
  GetThreadDpiAwarenessContext: {
    parameters: [],
    result: WinTypes.DPI_AWARENESS_CONTEXT.ffi,
  },
  AreDpiAwarenessContextsEqual: {
    parameters: [
      WinTypes.DPI_AWARENESS_CONTEXT.ffi,
      WinTypes.DPI_AWARENESS_CONTEXT.ffi,
    ],
    result: WinTypes.BOOL.ffi,
  },
  GetDpiForWindow: {
    parameters: [WinTypes.HWND.ffi],
    result: WinTypes.UINT.ffi,
  },
  AdjustWindowRectExForDpi: {
    parameters: [
      WinTypes.LPRECT.ffi,
      WinTypes.DWORD.ffi,
      WinTypes.BOOL.ffi,
      WinTypes.DWORD.ffi,
      WinTypes.UINT.ffi,
    ],
    result: WinTypes.BOOL.ffi,
  },
  SetWindowPos: {
    parameters: [
      WinTypes.HWND.ffi,
      WinTypes.HWND.ffi,
      WinTypes.int.ffi,
      WinTypes.int.ffi,
      WinTypes.int.ffi,
      WinTypes.int.ffi,
      WinTypes.UINT.ffi,
    ],
    result: WinTypes.BOOL.ffi,
  },
  GetWindowRect: {
    parameters: [WinTypes.HWND.ffi, WinTypes.LPRECT.ffi],
    result: WinTypes.BOOL.ffi,
  },
  FindWindowW: {
    parameters: [WinTypes.LPCWSTR.ffi, WinTypes.LPCWSTR.ffi],
    result: WinTypes.HWND.ffi,
  },
  GetDC: {
    parameters: [WinTypes.HWND.ffi],
    result: WinTypes.HDC.ffi,
  },
  ReleaseDC: {
    parameters: [WinTypes.HWND.ffi, WinTypes.HDC.ffi],
    result: WinTypes.int.ffi,
  },
  FillRect: {
    parameters: [WinTypes.HDC.ffi, WinTypes.LPRECT.ffi, WinTypes.HBRUSH.ffi],
    result: WinTypes.int.ffi,
  },
  CreateIconFromResourceEx: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-createiconfromresourceex
    parameters: [
      WinTypes.PBYTE.ffi, // [in] PBYTE presbits
      WinTypes.DWORD.ffi, // [in] DWORD dwResSize,
      WinTypes.BOOL.ffi, // [in] BOOL fIcon,
      WinTypes.DWORD.ffi, // [in] DWORD dwVer,
      WinTypes.int.ffi, // [in] int cxDesired,
      WinTypes.int.ffi, // [in] int cyDesired,
      WinTypes.UINT.ffi, // [in] UINT Flags
    ],
    result: WinTypes.HICON.ffi, // [out] HICON
  },
  CreateWindowExW: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-createwindowexw
    parameters: [
      WinTypes.DWORD.ffi, // [in] DWORD dwExStyle
      WinTypes.LPCWSTR.ffi, // [in, optional] LPCWSTR lpClassName
      WinTypes.LPCWSTR.ffi, // [in, optional] LPCWSTR lpWindowName
      WinTypes.DWORD.ffi, // [in] DWORD dwStyle
      WinTypes.int.ffi, // [in] int X
      WinTypes.int.ffi, // [in] int Y
      WinTypes.int.ffi, // [in] int nWidth
      WinTypes.int.ffi, // [in] int nHeight
      WinTypes.HWND.ffi, // [in, optional] HWND hWndParent
      WinTypes.HMENU.ffi, // [in, optional] HMENU hMenu
      WinTypes.HINSTANCE.ffi, // [in, optional] HINSTANCE hInstance
      WinTypes.LPVOID.ffi, // [in, optional] LPVOID lpParam
    ],
    result: WinTypes.HWND.ffi,
  },
  DefWindowProcW: {
    parameters: [
      WinTypes.HWND.ffi, // [in] HWND hWnd
      WinTypes.UINT.ffi, // [in] UINT Msg
      WinTypes.WPARAM.ffi, // [in] WPARAM wParam
      WinTypes.LPARAM.ffi, // [in] LPARAM lParam
    ],
    result: WinTypes.LRESULT.ffi,
  }, // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-defwindowprocw
  DispatchMessageW: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-dispatchmessagew
    parameters: [
      WinTypes.LPMSG.ffi, //[in] const MSG *lpMsg
    ],
    result: WinTypes.LRESULT.ffi,
  },
  GetClientRect: {
    parameters: [
      WinTypes.HWND.ffi, // [in] HWND hWnd
      WinTypes.LPRECT.ffi, // [out] LPRECT lpRect
    ],
    result: WinTypes.BOOL.ffi,
  },
  GetMessageW: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-getmessagew
    parameters: [
      WinTypes.LPMSG.ffi, // [out] LPMSG lpMsg
      WinTypes.HWND.ffi, // [in, optional] HWND hWnd
      WinTypes.UINT.ffi, // [in] UINT wMsgFilterMin
      WinTypes.UINT.ffi, // [in] UINT wMsgFilterMax
    ],
    result: WinTypes.BOOL.ffi,
  },
  LoadIconW: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-loadiconw
    parameters: [
      WinTypes.HINSTANCE.ffi, // [in, optional] HINSTANCE hInstance
      WinTypes.LPCWSTR.ffi, // [in] LPCWSTR lpIconName
    ],
    result: WinTypes.HICON.ffi,
  },
  MessageBoxExW: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-messageboxexw
    parameters: [
      WinTypes.HWND.ffi, // [in, optional] HWND hWnd
      WinTypes.LPCWSTR.ffi, // [in] LPCWSTR lpText
      WinTypes.LPCWSTR.ffi, // [in, optional] LPCWSTR lpCaption
      WinTypes.UINT.ffi, // [in] UINT uType
      WinTypes.DWORD.ffi, // [in] DWORD dwLanguageId
    ],
    result: WinTypes.int.ffi,
  },
  PostQuitMessage: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-postquitmessage
    parameters: [
      WinTypes.int.ffi, // [in] int nExitCode
    ],
    result: 'void',
  },
  RegisterClassExW: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-registerclassexw
    parameters: [
      WinTypes.LPWNDCLASSEXW.ffi, // [in] const WNDCLASSEXW *unnamedParam1
    ],
    result: WinTypes.ATOM.ffi,
  },
  SendMessageW: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-sendmessage
    parameters: [
      WinTypes.HWND.ffi, // [in] HWND hWnd,
      WinTypes.UINT.ffi, // [in] UINT Msg,
      WinTypes.WPARAM.ffi, // [in] WPARAM wParam,
      WinTypes.LPARAM.ffi, // [in] LPARAM lParam
    ],
    result: WinTypes.LRESULT.ffi,
  },
  SetWindowTextW: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-setwindowtextw
    parameters: [
      WinTypes.HWND.ffi, // [in] HWND hWnd
      WinTypes.LPCWSTR.ffi, // [in] LPCWSTR lpString
    ],
    result: WinTypes.BOOL.ffi,
  },
  ShowWindow: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-showwindow
    parameters: [
      WinTypes.HWND.ffi, // [in] HWND hWnd
      WinTypes.int.ffi, // [in] int nCmdShow
    ],
    result: WinTypes.BOOL.ffi,
  },
  TranslateMessage: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-translatemessage
    parameters: [
      WinTypes.LPMSG.ffi, // [in] const MSG *lpMsg
    ],
    result: WinTypes.BOOL.ffi,
  },
  UpdateWindow: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-updatewindow
    parameters: [
      WinTypes.HWND.ffi, // [in] HWND hWnd
    ],
    result: WinTypes.BOOL.ffi,
  },

  PeekMessageW: {
    parameters: [
      WinTypes.LPMSG.ffi,
      WinTypes.HWND.ffi,
      WinTypes.UINT.ffi,
      WinTypes.UINT.ffi,
      WinTypes.UINT.ffi,
    ],
    result: WinTypes.BOOL.ffi,
  },
  DestroyWindow: {
    parameters: [WinTypes.HWND.ffi],
    result: WinTypes.BOOL.ffi,
  },
  UnregisterClassW: {
    parameters: [
      WinTypes.LPCWSTR.ffi,
      WinTypes.HINSTANCE.ffi,
    ],
    result: WinTypes.BOOL.ffi,
  },
  PostMessageW: {
    parameters: [
      WinTypes.HWND.ffi,
      WinTypes.UINT.ffi,
      WinTypes.WPARAM.ffi,
      WinTypes.LPARAM.ffi,
    ],
    result: WinTypes.BOOL.ffi,
  },
} as const satisfies Deno.ForeignLibraryInterface;

export const user: Deno.DynamicLibrary<typeof userDefinitions> = lazyLibrary(
  'user32.dll',
  userDefinitions,
);
