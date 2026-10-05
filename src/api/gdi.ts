import { gdi } from '../libs/gdi.ts';
import type { COLORREF, HBRUSH, HDC, HGDIOBJ, HRGN, int } from '../types.ts';

/** Methods for Windows gdi32.dll. */
export class Gdi {
  constructor(public libs: typeof gdi = gdi) {}

  /** Creates an owned region. Release it with DeleteObject when no longer needed. */
  public CreateRectRgn(left: int, top: int, right: int, bottom: int): HRGN {
    return this.libs.symbols.CreateRectRgn(left, top, right, bottom);
  }

  /** Creates an owned brush. COLORREF uses the 0x00BBGGRR format. */
  public CreateSolidBrush(color: COLORREF): HBRUSH {
    return this.libs.symbols.CreateSolidBrush(color);
  }

  /** Releases a GDI object; returns false on failure. */
  public DeleteObject(object: HGDIOBJ): boolean {
    return this.libs.symbols.DeleteObject(object) !== 0;
  }

  /** Returns a COLORREF, or CLR_INVALID (0xFFFFFFFF) on failure. */
  public GetPixel(dc: HDC, x: int, y: int): COLORREF {
    return this.libs.symbols.GetPixel(dc, x, y);
  }

  /** Returns a borrowed stock object; callers do not own its lifetime. */
  public GetStockObject(index: int): HGDIOBJ {
    return this.libs.symbols.GetStockObject(index);
  }
}
