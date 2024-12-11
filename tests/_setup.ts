export * from 'jsr:@std/assert';

function RandomNumber(min: number, max: number) {
  return {
    min: min,
    mas: max,
    random: () => {
      return Math.floor(Math.random() * (max - min)) + min;
    },
  };
}
function RandomBigInt(min: bigint, max: bigint) {
  return {
    min: min,
    mas: max,
    random: () => {
      return BigInt(Math.floor(Math.random() * (0xffffffff - 0)) + 0); // TODO: bigint random
    },
  };
}

export const values = {
  i32: RandomNumber(-2147483648, 0x7fffffff),
  u32: RandomNumber(0, 0x7fffffff /*TODO: 0xffffffff*/),
  i64: RandomBigInt(-9223372036854775808n, 9223372036854775807n),
  pointer: {
    create: <T>(rawPointer?: bigint) => {
      if (rawPointer === undefined) {
        rawPointer = BigInt(Math.floor(0xffffffff - 1) + 1);
      }
      return Deno.UnsafePointer.create<T>(rawPointer);
    },
    value: (pointer: Deno.PointerValue) => {
      return BigInt(Deno.UnsafePointer.value(pointer));
    },
  },
};
