/** Owns the UTF-16 storage backing a native string pointer. */
export class OwnedUtf16 {
  readonly buffer: Uint16Array<ArrayBuffer>;
  readonly pointer: Deno.PointerValue;
  constructor(value: string) {
    this.buffer = new Uint16Array(value.length + 1);
    for (let i = 0; i < value.length; i++) this.buffer[i] = value.charCodeAt(i);
    this.pointer = Deno.UnsafePointer.of(this.buffer);
  }
}
// Legacy pointer helpers retain storage while their pointer object is alive.
const buffers = new WeakMap<object, OwnedUtf16>();
export function stringPointer(value: string): Deno.PointerValue {
  const owned = new OwnedUtf16(value);
  buffers.set(owned.pointer!, owned);
  return owned.pointer;
}
