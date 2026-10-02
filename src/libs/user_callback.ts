import { WinTypes } from '../win_types.ts';

/**
 * Callback functions for user32.dll
 */
export const callbackFunctions = {
  DefWindowProcW: {
    parameters: [
      WinTypes.HWND.ffi, // [in] HWND hWnd
      WinTypes.UINT.ffi, // [in] UINT Msg
      WinTypes.WPARAM.ffi, // [in] WPARAM wParam
      WinTypes.LPARAM.ffi, // [in] LPARAM lParam
    ],
    result: WinTypes.LRESULT.ffi,
  },
} as const satisfies Record<string, Deno.UnsafeCallbackDefinition>;
