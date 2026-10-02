import { WinTypes } from '../win_types.ts';
import { lazyLibrary } from './load.ts';

export const userDefinitions = {
  CreateIconFromResourceEx: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-createiconfromresourceex
    parameters: [
      WinTypes.PBYTE.ffi as typeof WinTypes.PBYTE.ffi, // [in] PBYTE presbits
      WinTypes.DWORD.ffi as typeof WinTypes.DWORD.ffi, // [in] DWORD dwResSize,
      WinTypes.BOOL.ffi as typeof WinTypes.BOOL.ffi, // [in] BOOL fIcon,
      WinTypes.DWORD.ffi as typeof WinTypes.DWORD.ffi, // [in] DWORD dwVer,
      WinTypes.int.ffi as typeof WinTypes.int.ffi, // [in] int cxDesired,
      WinTypes.int.ffi as typeof WinTypes.int.ffi, // [in] int cyDesired,
      WinTypes.UINT.ffi as typeof WinTypes.UINT.ffi, // [in] UINT Flags
    ],
    result: WinTypes.HICON.ffi as typeof WinTypes.HICON.ffi, // [out] HICON
  },
  CreateWindowExW: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-createwindowexw
    parameters: [
      WinTypes.DWORD.ffi as typeof WinTypes.DWORD.ffi, // [in] DWORD dwExStyle
      WinTypes.LPCWSTR.ffi as typeof WinTypes.LPCWSTR.ffi, // [in, optional] LPCWSTR lpClassName
      WinTypes.LPCWSTR.ffi as typeof WinTypes.LPCWSTR.ffi, // [in, optional] LPCWSTR lpWindowName
      WinTypes.DWORD.ffi as typeof WinTypes.DWORD.ffi, // [in] DWORD dwStyle
      WinTypes.int.ffi as typeof WinTypes.int.ffi, // [in] int X
      WinTypes.int.ffi as typeof WinTypes.int.ffi, // [in] int Y
      WinTypes.int.ffi as typeof WinTypes.int.ffi, // [in] int nWidth
      WinTypes.int.ffi as typeof WinTypes.int.ffi, // [in] int nHeight
      WinTypes.HWND.ffi as typeof WinTypes.HWND.ffi, // [in, optional] HWND hWndParent
      WinTypes.HMENU.ffi as typeof WinTypes.HMENU.ffi, // [in, optional] HMENU hMenu
      WinTypes.HINSTANCE.ffi as typeof WinTypes.HINSTANCE.ffi, // [in, optional] HINSTANCE hInstance
      WinTypes.LPVOID.ffi as typeof WinTypes.LPVOID.ffi, // [in, optional] LPVOID lpParam
    ],
    result: WinTypes.HWND.ffi as typeof WinTypes.HWND.ffi,
  },
  DefWindowProcW: {
    parameters: [
      WinTypes.HWND.ffi as typeof WinTypes.HWND.ffi, // [in] HWND hWnd
      WinTypes.UINT.ffi as typeof WinTypes.UINT.ffi, // [in] UINT Msg
      WinTypes.WPARAM.ffi as typeof WinTypes.WPARAM.ffi, // [in] WPARAM wParam
      WinTypes.LPARAM.ffi as typeof WinTypes.LPARAM.ffi, // [in] LPARAM lParam
    ],
    result: WinTypes.LRESULT.ffi as typeof WinTypes.LRESULT.ffi,
  }, // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-defwindowprocw
  DispatchMessageW: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-dispatchmessagew
    parameters: [
      WinTypes.LPMSG.ffi as typeof WinTypes.LPMSG.ffi, //[in] const MSG *lpMsg
    ],
    result: WinTypes.LRESULT.ffi as typeof WinTypes.LRESULT.ffi,
  },
  GetClientRect: {
    parameters: [
      WinTypes.HWND.ffi as typeof WinTypes.HWND.ffi, // [in] HWND hWnd
      WinTypes.LPRECT.ffi as typeof WinTypes.LPRECT.ffi, // [out] LPRECT lpRect
    ],
    result: WinTypes.BOOL.ffi as typeof WinTypes.BOOL.ffi,
  },
  GetMessageW: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-getmessagew
    parameters: [
      WinTypes.LPMSG.ffi as typeof WinTypes.LPMSG.ffi, // [out] LPMSG lpMsg
      WinTypes.HWND.ffi as typeof WinTypes.HWND.ffi, // [in, optional] HWND hWnd
      WinTypes.UINT.ffi as typeof WinTypes.UINT.ffi, // [in] UINT wMsgFilterMin
      WinTypes.UINT.ffi as typeof WinTypes.UINT.ffi, // [in] UINT wMsgFilterMax
    ],
    result: WinTypes.BOOL.ffi as typeof WinTypes.BOOL.ffi,
  },
  LoadIconW: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-loadiconw
    parameters: [
      WinTypes.HINSTANCE.ffi as typeof WinTypes.HINSTANCE.ffi, // [in, optional] HINSTANCE hInstance
      WinTypes.LPCWSTR.ffi as typeof WinTypes.LPCWSTR.ffi, // [in] LPCWSTR lpIconName
    ],
    result: WinTypes.HICON.ffi as typeof WinTypes.HICON.ffi,
  },
  MessageBoxExW: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-messageboxexw
    parameters: [
      WinTypes.HWND.ffi as typeof WinTypes.HWND.ffi, // [in, optional] HWND hWnd
      WinTypes.LPCWSTR.ffi as typeof WinTypes.LPCWSTR.ffi, // [in] LPCWSTR lpText
      WinTypes.LPCWSTR.ffi as typeof WinTypes.LPCWSTR.ffi, // [in, optional] LPCWSTR lpCaption
      WinTypes.UINT.ffi as typeof WinTypes.UINT.ffi, // [in] UINT uType
      WinTypes.DWORD.ffi as typeof WinTypes.DWORD.ffi, // [in] DWORD dwLanguageId
    ],
    result: WinTypes.int.ffi as typeof WinTypes.int.ffi,
  },
  PostQuitMessage: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-postquitmessage
    parameters: [
      WinTypes.int.ffi as typeof WinTypes.int.ffi, // [in] int nExitCode
    ],
    result: 'void',
  },
  RegisterClassExW: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-registerclassexw
    parameters: [
      WinTypes.LPWNDCLASSEXW.ffi as typeof WinTypes.LPWNDCLASSEXW.ffi, // [in] const WNDCLASSEXW *unnamedParam1
    ],
    result: WinTypes.ATOM.ffi as typeof WinTypes.ATOM.ffi,
  },
  SendMessageW: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-sendmessage
    parameters: [
      WinTypes.HWND.ffi as typeof WinTypes.HWND.ffi, // [in] HWND hWnd,
      WinTypes.UINT.ffi as typeof WinTypes.UINT.ffi, // [in] UINT Msg,
      WinTypes.WPARAM.ffi as typeof WinTypes.WPARAM.ffi, // [in] WPARAM wParam,
      WinTypes.LPARAM.ffi as typeof WinTypes.LPARAM.ffi, // [in] LPARAM lParam
    ],
    result: WinTypes.LRESULT.ffi as typeof WinTypes.LRESULT.ffi,
  },
  SetWindowTextW: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-setwindowtextw
    parameters: [
      WinTypes.HWND.ffi as typeof WinTypes.HWND.ffi, // [in] HWND hWnd
      WinTypes.LPCWSTR.ffi as typeof WinTypes.LPCWSTR.ffi, // [in] LPCWSTR lpString
    ],
    result: WinTypes.BOOL.ffi as typeof WinTypes.BOOL.ffi,
  },
  ShowWindow: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-showwindow
    parameters: [
      WinTypes.HWND.ffi as typeof WinTypes.HWND.ffi, // [in] HWND hWnd
      WinTypes.int.ffi as typeof WinTypes.int.ffi, // [in] int nCmdShow
    ],
    result: WinTypes.BOOL.ffi as typeof WinTypes.BOOL.ffi,
  },
  TranslateMessage: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-translatemessage
    parameters: [
      WinTypes.LPMSG.ffi as typeof WinTypes.LPMSG.ffi, // [in] const MSG *lpMsg
    ],
    result: WinTypes.BOOL.ffi as typeof WinTypes.BOOL.ffi,
  },
  UpdateWindow: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-updatewindow
    parameters: [
      WinTypes.HWND.ffi as typeof WinTypes.HWND.ffi, // [in] HWND hWnd
    ],
    result: WinTypes.BOOL.ffi as typeof WinTypes.BOOL.ffi,
  },

  PeekMessageW: {
    parameters: [
      WinTypes.LPMSG.ffi as typeof WinTypes.LPMSG.ffi,
      WinTypes.HWND.ffi as typeof WinTypes.HWND.ffi,
      WinTypes.UINT.ffi as typeof WinTypes.UINT.ffi,
      WinTypes.UINT.ffi as typeof WinTypes.UINT.ffi,
      WinTypes.UINT.ffi as typeof WinTypes.UINT.ffi,
    ],
    result: WinTypes.BOOL.ffi as typeof WinTypes.BOOL.ffi,
  },
  DestroyWindow: {
    parameters: [WinTypes.HWND.ffi as typeof WinTypes.HWND.ffi],
    result: WinTypes.BOOL.ffi as typeof WinTypes.BOOL.ffi,
  },
  UnregisterClassW: {
    parameters: [
      WinTypes.LPCWSTR.ffi as typeof WinTypes.LPCWSTR.ffi,
      WinTypes.HINSTANCE.ffi as typeof WinTypes.HINSTANCE.ffi,
    ],
    result: WinTypes.BOOL.ffi as typeof WinTypes.BOOL.ffi,
  },
  PostMessageW: {
    parameters: [
      WinTypes.HWND.ffi as typeof WinTypes.HWND.ffi,
      WinTypes.UINT.ffi as typeof WinTypes.UINT.ffi,
      WinTypes.WPARAM.ffi as typeof WinTypes.WPARAM.ffi,
      WinTypes.LPARAM.ffi as typeof WinTypes.LPARAM.ffi,
    ],
    result: WinTypes.BOOL.ffi as typeof WinTypes.BOOL.ffi,
  },
} as const satisfies Deno.ForeignLibraryInterface;

export const user: Deno.DynamicLibrary<typeof userDefinitions> = lazyLibrary(
  'user32.dll',
  userDefinitions,
);
