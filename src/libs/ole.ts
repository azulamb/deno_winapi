import type { WindowsSignature } from './signature.ts';
import { WinTypes } from '../win_types.ts';
import { lazyLibrary } from './load.ts';

export const oleDefinitions: {
  readonly CoInitializeEx: WindowsSignature<['LPVOID', 'DWORD'], 'HRESULT'>;
  readonly CoUninitialize: WindowsSignature<[], 'void'>;
} = {
  CoInitializeEx: {
    parameters: [WinTypes.LPVOID.ffi, WinTypes.DWORD.ffi],
    result: WinTypes.HRESULT.ffi,
  },
  CoUninitialize: {
    parameters: [],
    result: 'void',
  },
} as const satisfies Deno.ForeignLibraryInterface;

export const ole: Deno.DynamicLibrary<typeof oleDefinitions> = lazyLibrary(
  'ole32.dll',
  oleDefinitions,
);
