import { Converter } from '../win_types.ts';
import { Create } from '../create.ts';
import type { LANGID, WORD } from '../types.ts';

export type WINDOWS_MACRO = {
  IS_INTRESOURCE: (value: Deno.PointerValue | bigint) => boolean;
  MAKEINTRESOURCE: (
    value: Deno.PointerValue | bigint,
  ) => Deno.PointerValue<unknown>;
  MAKELANGID: (p: WORD, s: WORD) => LANGID;
};

export const macro: WINDOWS_MACRO = {
  IS_INTRESOURCE: (value) => {
    if (typeof value !== 'bigint') {
      value = Create.rawPointer(value);
    }
    return (value >> 16n) === 0n;
  },
  MAKEINTRESOURCE: (value) => {
    if (typeof value === 'bigint') {
      value = Deno.UnsafePointer.create(value);
    }
    return value;
  },
  MAKELANGID: (p, s) => {
    return Converter.LANGID((s << 10) | p);
  },
};
