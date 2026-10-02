import { Rect } from './structs/rect.ts';
import type {
  HGLOBAL,
  HICON,
  HMODULE,
  HRSRC,
  HWND,
  LONG_PTR,
  LPARAM,
  LPMSG,
  LPRECT,
  LPVOID,
  LPWNDCLASSEXW,
  LPWSTR,
  LRESULT,
  PBYTE,
  SafeNativeType,
  SafeNativeTypeMap,
  WIN_TYPES,
  WPARAM,
} from './types.ts';

const POINTER = 8;
const ffiTypeSizes: { [key in SafeNativeType]: number } = {
  bool: 1, // ?
  i8: 1,
  u8: 1,
  i16: 2,
  u16: 2,
  f32: 4,
  i32: 4,
  u32: 4,
  f64: 8,
  i64: 8,
  u64: 8,
  isize: 8,
  usize: 8,
  buffer: POINTER,
  function: POINTER,
  pointer: POINTER,
};

/** Windows types information */
export type WIN_TYPES_INFO = {
  [key in WIN_TYPES]: { ffi: SafeNativeTypeMap[key]; size: number };
};

/**
 * WinTypes contains information about Windows types.
 * https://deno.land/manual/runtime/ffi_api#supported-types
 */
export const WinTypes: WIN_TYPES_INFO = {
  ATOM: { ffi: 'u16', size: 0 },
  BOOL: { ffi: 'i32', size: 0 },
  DWORD: { ffi: 'u32', size: 0 },
  ENUMRESNAMEPROCW: { ffi: 'pointer', size: 0 },
  ENUMRESTYPEPROCW: { ffi: 'pointer', size: 0 },
  HBRUSH: { ffi: 'pointer', size: 0 },
  HCURSOR: { ffi: 'pointer', size: 0 },
  HGLOBAL: { ffi: 'pointer', size: 0 },
  HICON: { ffi: 'pointer', size: 0 },
  HINSTANCE: { ffi: 'pointer', size: 0 },
  HMODULE: { ffi: 'pointer', size: 0 },
  HMENU: { ffi: 'pointer', size: 0 },
  HRESULT: { ffi: 'i32', size: 0 },
  HRSRC: { ffi: 'pointer', size: 0 },
  HWND: { ffi: 'pointer', size: 0 },
  int: { ffi: 'i32', size: 0 },
  LANGID: { ffi: 'u16', size: 0 },
  LONG: { ffi: 'i32', size: 0 },
  LONG_PTR: { ffi: 'i64', size: 0 },
  LPARAM: { ffi: 'i64', size: 0 },
  LPCWSTR: { ffi: 'pointer', size: 0 },
  LPMSG: { ffi: 'pointer', size: 0 },
  LPRECT: { ffi: 'pointer', size: 0 },
  LPVOID: { ffi: 'pointer', size: 0 },
  LPWNDCLASSEXW: { ffi: 'pointer', size: 0 },
  LPWSTR: { ffi: 'pointer', size: 0 },
  LRESULT: { ffi: 'i64', size: 0 },
  PBYTE: { ffi: 'pointer', size: 0 },
  RECT: { ffi: 'buffer', size: 0 },
  UINT: { ffi: 'u32', size: 0 },
  WNDCLASSEXW: { ffi: 'buffer', size: 0 },
  WNDPROC: { ffi: 'pointer', size: 0 },
  WORD: { ffi: 'u16', size: 0 },
  WPARAM: { ffi: 'u64', size: 0 },
};

// Size of types.
Object.keys(WinTypes).forEach((k) => {
  const key = <WIN_TYPES> k;
  WinTypes[key].size = ffiTypeSizes[WinTypes[key].ffi];
});

// Aggregate sizes describe native storage, not the size of an FFI buffer argument.
WinTypes.RECT.size = 16;
WinTypes.WNDCLASSEXW.size = 80;

function Pointer<T>(pointer: Deno.PointerValue): T {
  return <T> Converter.pointer(pointer);
}

/** Explicit public signatures for the Windows value converters. */
export type WindowsConverter = {
  pointer: <T extends LPVOID>(pointer: Deno.PointerValue) => T;
  BOOL: (value: number) => boolean;
  RECT: (left?: number, top?: number, right?: number, bottom?: number) => Rect;
  ATOM: (value: number) => number;
  DWORD: (value: number) => number;
  HRESULT: (value: number) => number;
  int: (value: number) => number;
  LANGID: (value: number) => number;
  UINT: (value: number) => number;
  HGLOBAL: (value: Deno.PointerValue) => HGLOBAL;
  HMODULE: (value: Deno.PointerValue) => HMODULE;
  HRSRC: (value: Deno.PointerValue) => HRSRC;
  HICON: (value: Deno.PointerValue) => HICON;
  HWND: (value: Deno.PointerValue) => HWND;
  LPMSG: (value: Deno.PointerValue) => LPMSG;
  LPRECT: (value: Deno.PointerValue) => LPRECT;
  LPWSTR: (value: Deno.PointerValue) => LPWSTR;
  LPWNDCLASSEXW: (value: Deno.PointerValue) => LPWNDCLASSEXW;
  LPVOID: (value: Deno.PointerValue) => LPVOID;
  PBYTE: (value: Deno.PointerValue) => PBYTE;
  LONG_PTR: (value: number | bigint) => LONG_PTR;
  LPARAM: (value: number | bigint) => LPARAM;
  LRESULT: (value: number | bigint) => LRESULT;
  WPARAM: (value: number | bigint) => WPARAM;
};

/** Converter for Windows types to Deno types. */
export const Converter: WindowsConverter = {
  // FFI to JS
  pointer: <T extends LPVOID>(pointer: Deno.PointerValue): T => {
    return <T> pointer;
  },

  // Windows types to JS
  ATOM: (value: number): number => {
    return value & 0xffff;
  },

  BOOL: (value: number): boolean => {
    return value !== 0;
  },

  DWORD: (value: number): number => {
    return value >>> 0;
  },

  HGLOBAL: Pointer<HGLOBAL>,

  HMODULE: Pointer<HMODULE>,

  HRESULT: (value: number): number => {
    return value | 0;
  },

  HRSRC: Pointer<HRSRC>,

  HICON: Pointer<HICON>,

  HWND: Pointer<HWND>,

  int: (value: number): number => {
    return value | 0;
  },

  LANGID: (value: number): number => {
    return value & 0xffff;
  },

  LONG_PTR: (value: number | bigint): LONG_PTR =>
    BigInt.asIntN(64, BigInt(value)),

  LPARAM: (value: number | bigint): LPARAM => BigInt.asIntN(64, BigInt(value)),

  LPMSG: Pointer<LPMSG>,

  LPRECT: Pointer<LPRECT>,

  LPWSTR: Pointer<LPWSTR>,

  LRESULT: (value: number | bigint): LRESULT =>
    BigInt.asIntN(64, BigInt(value)),

  LPWNDCLASSEXW: Pointer<LPWNDCLASSEXW>,

  LPVOID: Pointer<LPVOID>,

  PBYTE: Pointer<PBYTE>,

  RECT: (left?: number, top?: number, right?: number, bottom?: number) => {
    return new Rect(left, top, right, bottom);
  },

  UINT: (value: number) => {
    return value >>> 0;
  },

  WPARAM: (value: number | bigint): WPARAM => BigInt.asUintN(64, BigInt(value)),
};
