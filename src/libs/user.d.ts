import type { SafeNativeTypeMap } from '../win_types.d.ts';

// TODO: Generate
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

export type USER_FUNKS = {
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
