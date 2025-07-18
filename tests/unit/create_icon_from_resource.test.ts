import * as test from '../_setup.ts';
import { HICON, PBYTE, winApi } from '../../mod.ts';
import sampleIcon from '../resources/sample.ico' with { type: 'bytes' };

Deno.test('CreateIconFromResourceEx', () => {
  const view = new DataView(sampleIcon.buffer, 0, sampleIcon.byteLength);
  // Single icon -> Icon data.
  const buffer = new Uint8Array(view.buffer, 22, view.byteLength - 22);
  // console.log([...buffer].map((v)=>{return '0x'+v.toString(16);}).join(','));
  const iconPointer: PBYTE = Deno.UnsafePointer.of(buffer);
  // CreateIconFromResourceEx can read icon data only.
  const icon: HICON = winApi.user.CreateIconFromResourceEx(
    iconPointer,
    buffer.byteLength,
    /*true,
    0x00030000,
    16,
    16,
    {
      LR_DEFAULTCOLOR: true,
    },*/
  );

  test.assert(icon !== null, 'Icon should be created successfully');
});
