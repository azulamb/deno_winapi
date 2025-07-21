import { WinTypes } from '../win_types.ts';
import type { CALLBACK_FUNCTIONS } from './user_types.ts';

/**
 * Callback functions for user32.dll
 */
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
