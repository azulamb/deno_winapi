import { assert, assertEquals } from '../_setup.ts';
import { winApi } from '../../mod.ts';

Deno.test({
  name: 'GDI creates and releases native regions and brushes',
  ignore: Deno.build.os !== 'windows',
  fn() {
    const region = winApi.gdi.CreateRectRgn(-20, -10, 30, 40);
    const brush = winApi.gdi.CreateSolidBrush(0x00a06020);
    try {
      assert(region);
      assert(brush);
      assert(winApi.gdi.GetStockObject(4)); // Borrowed BLACK_BRUSH.
      assertEquals(winApi.gdi.GetPixel(null, 0, 0), 0xffffffff);
      assertEquals(winApi.gdi.DeleteObject(null), false);
    } finally {
      if (region) assert(winApi.gdi.DeleteObject(region));
      if (brush) assert(winApi.gdi.DeleteObject(brush));
    }
  },
});
