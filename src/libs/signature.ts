import type { SafeNativeTypeMap, WIN_TYPES } from '../types.ts';

/** Reuses the Windows-to-FFI mapping while preserving exact parameter tuples. */
export type WindowsSignature<
  Parameters extends readonly WIN_TYPES[],
  Result extends WIN_TYPES | 'void',
> = {
  readonly parameters: {
    readonly [Index in keyof Parameters]: SafeNativeTypeMap[Parameters[Index]];
  };
  readonly result: SafeNativeTypeMap[Result];
};
