import { Converter } from '../win_types.ts';

export const macro = {
	IS_INTRESOURCE: (value: Deno.PointerValue | bigint) => {
		if (typeof value !== 'bigint') {
			value = BigInt(Deno.UnsafePointer.value(value));
		}
		return (value >> 16n) === 0n;
	},
	MAKEINTRESOURCE: (value: Deno.PointerValue | bigint) => {
		if (typeof value === 'bigint') {
			value = Deno.UnsafePointer.create(value);
		}
		return value;
	},
	MAKELANGID: (p: WORD, s: WORD): LANGID => {
		return Converter.LANGID((s << 10) | p);
	},
};
