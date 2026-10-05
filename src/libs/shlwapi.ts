import type { WindowsSignature } from './signature.ts';
import { WinTypes } from '../win_types.ts';
import { lazyLibrary } from './load.ts';

export const shlwapiDefinitions: {
  readonly SHCreateMemStream: WindowsSignature<['PBYTE', 'UINT'], 'LPSTREAM'>;
} = {
  SHCreateMemStream: {
    parameters: [WinTypes.PBYTE.ffi, WinTypes.UINT.ffi],
    result: WinTypes.LPSTREAM.ffi,
  },
} as const satisfies Deno.ForeignLibraryInterface;

export const shlwapi: Deno.DynamicLibrary<typeof shlwapiDefinitions> =
  lazyLibrary('shlwapi.dll', shlwapiDefinitions);
