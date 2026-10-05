import type { WindowsSignature } from './signature.ts';
import { WinTypes } from '../win_types.ts';
import { lazyLibrary } from './load.ts';

export const dwmDefinitions: {
  readonly DwmEnableBlurBehindWindow: WindowsSignature<
    ['HWND', 'LPVOID'],
    'HRESULT'
  >;
  readonly DwmFlush: WindowsSignature<[], 'HRESULT'>;
} = {
  DwmEnableBlurBehindWindow: {
    parameters: [WinTypes.HWND.ffi, WinTypes.LPVOID.ffi],
    result: WinTypes.HRESULT.ffi,
  },
  DwmFlush: {
    parameters: [],
    result: WinTypes.HRESULT.ffi,
  },
} as const satisfies Deno.ForeignLibraryInterface;

export const dwm: Deno.DynamicLibrary<typeof dwmDefinitions> = lazyLibrary(
  'dwmapi.dll',
  dwmDefinitions,
);
