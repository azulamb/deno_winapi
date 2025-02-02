import { RECT } from './structs/rect.ts';
import type {
  HMODULE,
  HWND,
  LONG_PTR,
  LPARAM,
  LPMSG,
  LPRECT,
  LPVOID,
  LPWNDCLASSEXW,
  LPWSTR,
  LRESULT,
  SafeNativeType,
  SafeNativeTypeMap,
  WIN_TYPES,
  WPARAM,
} from './win_types.d.ts';

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

export type WIN_TYPES_INFO = {
  [key in WIN_TYPES]: { ffi: SafeNativeTypeMap[key]; size: number };
};

// https://deno.land/manual/runtime/ffi_api#supported-types
export const WinTypes: WIN_TYPES_INFO = {
  ATOM: { ffi: 'u16', size: 0 },
  BOOL: { ffi: 'i32', size: 0 },
  DWORD: { ffi: 'i32', size: 0 },
  ENUMRESNAMEPROCW: { ffi: 'pointer', size: 0 },
  ENUMRESTYPEPROCW: { ffi: 'pointer', size: 0 },
  HBRUSH: { ffi: 'pointer', size: 0 },
  HCURSOR: { ffi: 'pointer', size: 0 },
  HICON: { ffi: 'pointer', size: 0 },
  HINSTANCE: { ffi: 'pointer', size: 0 },
  HMODULE: { ffi: 'pointer', size: 0 },
  HMENU: { ffi: 'pointer', size: 0 },
  HRESULT: { ffi: 'i32', size: 0 },
  HWND: { ffi: 'pointer', size: 0 },
  int: { ffi: 'i32', size: 0 },
  LANGID: { ffi: 'u16', size: 0 },
  LONG: { ffi: 'i64', size: 0 },
  LONG_PTR: { ffi: 'pointer', size: 0 },
  LPARAM: { ffi: 'pointer', size: 0 },
  LPCWSTR: { ffi: 'pointer', size: 0 },
  LPMSG: { ffi: 'pointer', size: 0 },
  LPRECT: { ffi: 'pointer', size: 0 },
  LPVOID: { ffi: 'pointer', size: 0 },
  LPWNDCLASSEXW: { ffi: 'pointer', size: 0 },
  LPWSTR: { ffi: 'pointer', size: 0 },
  LRESULT: { ffi: 'pointer', size: 0 },
  RECT: { ffi: 'buffer', size: 0 },
  UINT: { ffi: 'u32', size: 0 },
  WNDCLASSEXW: { ffi: 'buffer', size: 0 },
  WNDPROC: { ffi: 'pointer', size: 0 },
  WPARAM: { ffi: 'pointer', size: 0 },
};

// Size of types.
Object.keys(WinTypes).forEach((k) => {
  const key = <WIN_TYPES> k;
  WinTypes[key].size = ffiTypeSizes[WinTypes[key].ffi];
});

function Pointer<T>(pointer: Deno.PointerValue): T {
  return <T> Converter.pointer(pointer);
}

export const Converter = {
  // FFI to JS
  pointer: <T extends LPVOID>(pointer: Deno.PointerValue): T => {
    return <T> pointer;
  },

  // Windows types to JS
  ATOM: (value: number): number => {
    // TODO: convert u16
    return value;
  },

  BOOL: (value: number): boolean => {
    return value !== 0;
  },

  DWORD: (value: number): number => {
    // TODO: convert i32
    return value;
  },

  HMODULE: Pointer<HMODULE>,

  HRESULT: (value: number): number => {
    // TODO: convert i32
    return value;
  },

  HWND: Pointer<HWND>,

  int: (value: number): number => {
    // TODO: convert i32
    return value;
  },

  LANGID: (value: number): number => {
    // TODO: convert u16
    return value;
  },

  LONG_PTR: Pointer<LONG_PTR>,

  LPARAM: Pointer<LPARAM>,

  LPMSG: Pointer<LPMSG>,

  LPRECT: Pointer<LPRECT>,

  LPWSTR: Pointer<LPWSTR>,

  LRESULT: Pointer<LRESULT>,

  LPWNDCLASSEXW: Pointer<LPWNDCLASSEXW>,

  RECT: (left?: number, top?: number, right?: number, bottom?: number) => {
    return new RECT(left, top, right, bottom);
  },

  UINT: (value: number) => {
    // TODO: convert u32
    return value;
  },

  WPARAM: Pointer<WPARAM>,
};
