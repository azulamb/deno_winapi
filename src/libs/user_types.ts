import type { SafeNativeTypeMap } from '../types.ts';

// TODO: Generate

/**
 * Callback functions for user32.dll
 */
export type CALLBACK_FUNCTIONS = {
  DefWindowProcW: Deno.UnsafeCallbackDefinition<
    [
      SafeNativeTypeMap['HWND'],
      SafeNativeTypeMap['UINT'],
      SafeNativeTypeMap['WPARAM'],
      SafeNativeTypeMap['LPARAM'],
    ],
    SafeNativeTypeMap['LRESULT']
  >;
};

/**
 * User function signatures.
 */
export type USER_FUNKS = {
  readonly CreateIconFromResourceEx: {
    readonly parameters: [
      SafeNativeTypeMap['PBYTE'],
      SafeNativeTypeMap['DWORD'],
      SafeNativeTypeMap['BOOL'],
      SafeNativeTypeMap['DWORD'],
      SafeNativeTypeMap['int'],
      SafeNativeTypeMap['int'],
      SafeNativeTypeMap['UINT'],
    ];
    readonly result: SafeNativeTypeMap['HICON'];
  };
  readonly CreateWindowExW: {
    readonly parameters: [
      SafeNativeTypeMap['DWORD'],
      SafeNativeTypeMap['LPCWSTR'],
      SafeNativeTypeMap['LPCWSTR'],
      SafeNativeTypeMap['DWORD'],
      SafeNativeTypeMap['int'],
      SafeNativeTypeMap['int'],
      SafeNativeTypeMap['int'],
      SafeNativeTypeMap['int'],
      SafeNativeTypeMap['HWND'],
      SafeNativeTypeMap['HMENU'],
      SafeNativeTypeMap['HINSTANCE'],
      SafeNativeTypeMap['LPARAM'],
    ];
    readonly result: SafeNativeTypeMap['HWND'];
  };
  readonly DefWindowProcW: {
    readonly parameters: [
      SafeNativeTypeMap['HWND'],
      SafeNativeTypeMap['UINT'],
      SafeNativeTypeMap['WPARAM'],
      SafeNativeTypeMap['LPARAM'],
    ];
    result: SafeNativeTypeMap['LRESULT'];
  };
  readonly DispatchMessageW: {
    readonly parameters: [
      SafeNativeTypeMap['LPMSG'],
    ];
    readonly result: SafeNativeTypeMap['LRESULT'];
  };
  readonly GetClientRect: {
    readonly parameters: [
      SafeNativeTypeMap['HWND'],
      SafeNativeTypeMap['LPRECT'],
    ];
    readonly result: SafeNativeTypeMap['BOOL'];
  };
  readonly GetMessageW: {
    readonly parameters: [
      SafeNativeTypeMap['LPMSG'],
      SafeNativeTypeMap['HWND'],
      SafeNativeTypeMap['UINT'],
      SafeNativeTypeMap['UINT'],
    ];
    readonly result: SafeNativeTypeMap['BOOL'];
  };
  readonly LoadIconW: {
    readonly parameters: [
      SafeNativeTypeMap['HINSTANCE'],
      SafeNativeTypeMap['LPCWSTR'],
    ];
    readonly result: SafeNativeTypeMap['HICON'];
  };
  readonly MessageBoxExW: {
    readonly parameters: [
      SafeNativeTypeMap['HWND'],
      SafeNativeTypeMap['LPCWSTR'],
      SafeNativeTypeMap['LPCWSTR'],
      SafeNativeTypeMap['UINT'],
      SafeNativeTypeMap['DWORD'],
    ];
    readonly result: SafeNativeTypeMap['int'];
  };
  readonly PostQuitMessage: {
    readonly parameters: [
      SafeNativeTypeMap['int'],
    ];
    readonly result: SafeNativeTypeMap['void'];
  };
  readonly RegisterClassExW: {
    readonly parameters: [
      SafeNativeTypeMap['LPWNDCLASSEXW'],
    ];
    readonly result: SafeNativeTypeMap['ATOM'];
  };
  readonly SendMessageW: {
    readonly parameters: [
      SafeNativeTypeMap['HWND'],
      SafeNativeTypeMap['UINT'],
      SafeNativeTypeMap['WPARAM'],
      SafeNativeTypeMap['LPARAM'],
    ];
    readonly result: SafeNativeTypeMap['LRESULT'];
  };
  readonly ShowWindow: {
    readonly parameters: [
      SafeNativeTypeMap['HWND'],
      SafeNativeTypeMap['int'],
    ];
    readonly result: SafeNativeTypeMap['BOOL'];
  };
  readonly TranslateMessage: {
    readonly parameters: [
      SafeNativeTypeMap['LPVOID'],
    ];
    readonly result: SafeNativeTypeMap['BOOL'];
  };
  readonly UpdateWindow: {
    readonly parameters: [
      SafeNativeTypeMap['HWND'],
    ];
    readonly result: SafeNativeTypeMap['BOOL'];
  };
};
