import type { LPRECT } from '../types.ts';
import { Converter } from '../win_types.ts';

/**
 * https://learn.microsoft.com/ja-jp/windows/win32/api/windef/ns-windef-rect
 */
export class Rect {
  public data: Int32Array;
  protected dataView: DataView;
  protected dataPointer: LPRECT;
  public endian: boolean;

  constructor(left?: number, top?: number, right?: number, bottom?: number) {
    /* typedef struct tagRECT {
      LONG left;
      LONG top;
      LONG right;
      LONG bottom;
    } RECT, *PRECT, *NPRECT, *LPRECT; */
    this.data = new Int32Array(4);
    this.dataView = new DataView(this.data.buffer);
    this.dataPointer = Converter.LPRECT(Deno.UnsafePointer.of(this.data));
    // Set default endian.
    this.endian = new Uint8Array(Uint16Array.of(1).buffer)[0] === 1;
    if (left) {
      this.left = left;
    }
    if (top) {
      this.top = top;
    }
    if (right) {
      this.right = right;
    }
    if (bottom) {
      this.bottom = bottom;
    }
  }

  get pointer(): LPRECT {
    return this.dataPointer;
  }

  get left(): number {
    return this.dataView.getInt32(0, this.endian);
  }

  set left(value: number) {
    this.dataView.setInt32(0, value, this.endian);
  }

  get top(): number {
    return this.dataView.getInt32(4, this.endian);
  }

  set top(value: number) {
    this.dataView.setInt32(4, value, this.endian);
  }

  get right(): number {
    return this.dataView.getInt32(8, this.endian);
  }

  set right(value: number) {
    this.dataView.setInt32(8, value, this.endian);
  }

  get bottom(): number {
    return this.dataView.getInt32(12, this.endian);
  }

  set bottom(value: number) {
    this.dataView.setInt32(12, value, this.endian);
  }
}
