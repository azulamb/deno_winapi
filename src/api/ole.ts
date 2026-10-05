import { ole } from '../libs/ole.ts';
import type { DWORD, HRESULT, LPVOID } from '../types.ts';

/** Methods for Windows ole32.dll. */
export class Ole {
  constructor(public libs: typeof ole = ole) {}

  /** Initialize COM on the calling thread. Every successful call, including S_FALSE, must be paired with CoUninitialize. */
  public CoInitializeEx(reserved: LPVOID = null, flags: DWORD = 2): HRESULT {
    return this.libs.symbols.CoInitializeEx(reserved, flags);
  }
  /** Balance a successful initialization on the same thread. */
  public CoUninitialize(): void {
    this.libs.symbols.CoUninitialize();
  }
}
