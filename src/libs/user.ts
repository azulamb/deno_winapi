import { WinTypes } from '../win_types.ts';
import type { CALLBACK_FUNCTIONS, USER_FUNKS } from './user_types.ts';

export const callbackFunctions: CALLBACK_FUNCTIONS = {
  DefWindowProcW: {
    parameters: [
      WinTypes.HWND.ffi, // [in] HWND hWnd
      WinTypes.UINT.ffi, // [in] UINT Msg
      WinTypes.WPARAM.ffi, // [in] WPARAM wParam
      WinTypes.LPARAM.ffi, // [in] LPARAM lParam
    ],
    result: WinTypes.LRESULT.ffi,
  },
};

export const user: Deno.DynamicLibrary<USER_FUNKS> = Deno.dlopen(
  'C:\\Windows\\System32\\user32.dll',
  {
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
        WinTypes.LPARAM.ffi, // [in, optional] LPVOID lpParam
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
    ShowWindow: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-showwindow
      parameters: [
        WinTypes.HWND.ffi, // [in] HWND hWnd
        WinTypes.int.ffi, // [in] int nCmdShow
      ],
      result: WinTypes.BOOL.ffi,
    },
    TranslateMessage: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-translatemessage
      parameters: [
        WinTypes.LPVOID.ffi, // [in] const MSG *lpMsg
      ],
      result: WinTypes.BOOL.ffi,
    },
    UpdateWindow: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-updatewindow
      parameters: [
        WinTypes.HWND.ffi, // [in] HWND hWnd
      ],
      result: WinTypes.BOOL.ffi,
    },
  },
);
