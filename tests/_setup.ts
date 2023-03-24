export * from 'https://deno.land/std@0.181.0/testing/asserts.ts';

function RandomNumber(min: number, max: number) {
	return {
		min: min,
		mas: max,
		random: () => {
			return Math.floor(Math.random() * (max - min)) + min;
		},
	};
}

export const values = {
	i32: RandomNumber(-2147483648, 0x7fffffff),
	u32: RandomNumber(0, 0xffffffff),
	pointer: {
		create: (rawPointer?: bigint) => {
			if (rawPointer === undefined) {
				rawPointer = BigInt(Math.floor(0xffffffff - 1) + 1);
			}
			return Deno.UnsafePointer.create(rawPointer);
		},
		value: (pointer: Deno.PointerValue) => {
			return BigInt(Deno.UnsafePointer.value(pointer));
		},
	},
};
