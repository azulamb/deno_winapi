import { dwm } from '../libs/dwm.ts';
import type { HRESULT, HWND, LPVOID } from '../types.ts';

/** Methods for Windows dwmapi.dll. */
export class Dwm {
  constructor(public libs: typeof dwm = dwm) {}

  /** Pass a pointer to a native DWM_BLURBEHIND structure. */
  public DwmEnableBlurBehindWindow(window: HWND, blurBehind: LPVOID): HRESULT {
    return this.libs.symbols.DwmEnableBlurBehindWindow(window, blurBehind);
  }
  public DwmFlush(): HRESULT {
    return this.libs.symbols.DwmFlush();
  }
}
