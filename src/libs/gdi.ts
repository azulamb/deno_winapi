import type { WindowsSignature } from './signature.ts';
import { WinTypes } from '../win_types.ts';
import { lazyLibrary } from './load.ts';

export const gdiDefinitions: {
  readonly CreateRectRgn: WindowsSignature<
    ['int', 'int', 'int', 'int'],
    'HRGN'
  >;
  readonly CreateSolidBrush: WindowsSignature<['COLORREF'], 'HBRUSH'>;
  readonly DeleteObject: WindowsSignature<['HGDIOBJ'], 'BOOL'>;
  readonly GetPixel: WindowsSignature<['HDC', 'int', 'int'], 'COLORREF'>;
  readonly GetStockObject: WindowsSignature<['int'], 'HGDIOBJ'>;
} = {
  CreateRectRgn: { // https://learn.microsoft.com/windows/win32/api/wingdi/nf-wingdi-createrectrgn
    parameters: [
      WinTypes.int.ffi,
      WinTypes.int.ffi,
      WinTypes.int.ffi,
      WinTypes.int.ffi,
    ],
    result: WinTypes.HRGN.ffi,
  },
  CreateSolidBrush: { // https://learn.microsoft.com/windows/win32/api/wingdi/nf-wingdi-createsolidbrush
    parameters: [WinTypes.COLORREF.ffi],
    result: WinTypes.HBRUSH.ffi,
  },
  DeleteObject: { // https://learn.microsoft.com/windows/win32/api/wingdi/nf-wingdi-deleteobject
    parameters: [WinTypes.HGDIOBJ.ffi],
    result: WinTypes.BOOL.ffi,
  },
  GetPixel: { // https://learn.microsoft.com/windows/win32/api/wingdi/nf-wingdi-getpixel
    parameters: [WinTypes.HDC.ffi, WinTypes.int.ffi, WinTypes.int.ffi],
    result: WinTypes.COLORREF.ffi,
  },
  GetStockObject: { // https://learn.microsoft.com/windows/win32/api/wingdi/nf-wingdi-getstockobject
    parameters: [WinTypes.int.ffi],
    result: WinTypes.HGDIOBJ.ffi,
  },
} as const satisfies Deno.ForeignLibraryInterface;

export const gdi: Deno.DynamicLibrary<typeof gdiDefinitions> = lazyLibrary(
  'gdi32.dll',
  gdiDefinitions,
);
