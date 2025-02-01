import { WinTypes } from '../win_types.ts';

export const callbackFunctions: {
  DefWindowProcW: Deno.UnsafeCallbackDefinition<
    [
      SafeNativeTypeMap['HWND'],
      SafeNativeTypeMap['UINT'],
      SafeNativeTypeMap['WPARAM'],
      SafeNativeTypeMap['LPARAM'],
    ],
    SafeNativeTypeMap['LRESULT']
  >;
} = {
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

export const user = Deno.dlopen(
  'C:\\Windows\\System32\\user32.dll',
  {
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
    DefWindowProcW: callbackFunctions.DefWindowProcW, // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-defwindowprocw
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
