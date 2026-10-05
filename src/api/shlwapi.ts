import { shlwapi } from '../libs/shlwapi.ts';
import type { LPSTREAM } from '../types.ts';

/** Methods for Windows shlwapi.dll. */
export class Shlwapi {
  constructor(public libs: typeof shlwapi = shlwapi) {}

  /** Creates an owned COM stream. Release the returned IStream after use. */
  public SHCreateMemStream(bytes: Uint8Array): LPSTREAM {
    if (bytes.byteLength > 0xffffffff) {
      throw new RangeError('Stream exceeds UINT capacity.');
    }
    return this.libs.symbols.SHCreateMemStream(
      Deno.UnsafePointer.of(bytes),
      bytes.byteLength,
    );
  }
}
