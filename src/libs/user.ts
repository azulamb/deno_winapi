import { winTypes } from '../win_types.ts';

export const callbackFunctions: {
	DefWindowProcW: ForeignFunction<
		SafeNativeTypeMap['LRESULT'],
		[SafeNativeTypeMap['HWND'], SafeNativeTypeMap['UINT'], SafeNativeTypeMap['WPARAM'], SafeNativeTypeMap['LPARAM']]
	>;
} = {
	DefWindowProcW: {
		parameters: [
			winTypes.HWND, // [in] HWND hWnd
			winTypes.UINT, // [in] UINT Msg
			winTypes.WPARAM, // [in] WPARAM wParam
			winTypes.LPARAM, // [in] LPARAM lParam
		],
		result: winTypes.LRESULT,
		nonblocking: false,
	},
};

export const user = Deno.dlopen(
	'user32.dll',
	{
		CreateWindowExW: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-createwindowexw
			parameters: [
				winTypes.DWORD, // [in] DWORD dwExStyle
				winTypes.LPCWSTR, // [in, optional] LPCWSTR lpClassName
				winTypes.LPCWSTR, // [in, optional] LPCWSTR lpWindowName
				winTypes.DWORD, // [in] DWORD dwStyle
				winTypes.int, // [in] int X
				winTypes.int, // [in] int Y
				winTypes.int, // [in] int nWidth
				winTypes.int, // [in] int nHeight
				winTypes.HWND, // [in, optional] HWND hWndParent
				winTypes.HMENU, // [in, optional] HMENU hMenu
				winTypes.HINSTANCE, // [in, optional] HINSTANCE hInstance
				winTypes.LPVOID, // [in, optional] LPVOID lpParam
			],
			result: winTypes.HWND,
		},
		DefWindowProcW: callbackFunctions.DefWindowProcW, // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-defwindowprocw
		DispatchMessageW: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-dispatchmessagew
			parameters: [
				winTypes._POINTER, //[in] const MSG *lpMsg
			],
			result: winTypes.LRESULT,
		},
		GetMessageW: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-getmessagew
			parameters: [
				winTypes.LPMSG, // [out] LPMSG lpMsg
				winTypes.HWND, // [in, optional] HWND hWnd
				winTypes.UINT, // [in] UINT wMsgFilterMin
				winTypes.UINT, // [in] UINT wMsgFilterMax
			],
			result: winTypes.BOOL,
		},
		LoadIconW: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-loadiconw
			parameters: [
				winTypes.HINSTANCE, // [in, optional] HINSTANCE hInstance
				winTypes.LPCWSTR, // [in] LPCWSTR lpIconName
			],
			result: winTypes.HICON,
		},
		PostQuitMessage: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-postquitmessage
			parameters: [
				winTypes.int, // [in] int nExitCode
			],
			result: 'void',
		},
		RegisterClassExW: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-registerclassexw
			parameters: [
				winTypes.WNDCLASSEXW, // [in] const WNDCLASSEXW *unnamedParam1
			],
			result: winTypes.ATOM,
		},
		ShowWindow: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-showwindow
			parameters: [
				winTypes.HWND, // [in] HWND hWnd
				winTypes.int, // [in] int nCmdShow
			],
			result: winTypes.BOOL,
		},
		TranslateMessage: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-translatemessage
			parameters: [
				winTypes._POINTER, // [in] const MSG *lpMsg
			],
			result: winTypes.BOOL,
		},
		UpdateWindow: { // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-updatewindow
			parameters: [
				winTypes.HWND, // [in] HWND hWnd
			],
			result: winTypes.BOOL,
		},
	},
);
