export * from '@std/assert';

function RandomNumber(min: number, max: number) {
  return {
    min: min,
    max: max,
    random: () => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
  };
}
function RandomBigInt(min: bigint, max: bigint) {
  return {
    min: min,
    max: max,
    random: () => {
      const words = crypto.getRandomValues(new Uint32Array(2));
      const value = (BigInt(words[0]) << 32n) | BigInt(words[1]);
      return min + value % (max - min + 1n);
    },
  };
}

export const values = {
  i32: RandomNumber(-2147483648, 0x7fffffff),
  u32: RandomNumber(0, 0xffffffff),
  i64: RandomBigInt(-9223372036854775808n, 9223372036854775807n),
  pointer: {
    create: <T>(rawPointer?: bigint) => {
      if (rawPointer === undefined) {
        rawPointer = BigInt(crypto.getRandomValues(new Uint32Array(1))[0] || 1);
      }
      return Deno.UnsafePointer.create<T>(rawPointer);
    },
    value: (pointer: Deno.PointerValue) => {
      return BigInt(Deno.UnsafePointer.value(pointer));
    },
  },
};
