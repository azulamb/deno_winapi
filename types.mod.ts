/**
 * Windows handle, integer, callback and structure types, with FFI type metadata
 * and conversion helpers. Importing this module does not load native DLLs.
 * @module
 */
export type * from './src/types.ts';
export { Converter, WinTypes } from './src/win_types.ts';
