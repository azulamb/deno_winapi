import { assertEquals } from '../_setup.ts';
import { Message } from '../../src/structs/message.ts';
import { WinTypes } from '../../src/win_types.ts';

Deno.test('Windows 64-bit MSG ABI and integer boundaries', () => {
  assertEquals(WinTypes.LONG.size, 4);
  const message = new Message();
  assertEquals(message.data.length, 48);
  message.hwnd = Deno.UnsafePointer.create(0x1234n);
  message.message = 0xffffffff;
  message.wParam = 0xffffffffffffffffn;
  message.lParam = -9223372036854775808n;
  message.time = 0xffffffff;
  message.pt = { x: -2147483648, y: 2147483647 };
  message.lPrivate = 0xffffffff;
  const view = new DataView(message.data.buffer);
  assertEquals(view.getBigUint64(0, true), 0x1234n);
  assertEquals(view.getUint32(8, true), 0xffffffff);
  assertEquals(view.getUint32(12, true), 0); // alignment padding
  assertEquals(view.getBigUint64(16, true), 0xffffffffffffffffn);
  assertEquals(view.getBigInt64(24, true), -9223372036854775808n);
  assertEquals(view.getUint32(32, true), 0xffffffff);
  assertEquals(view.getInt32(36, true), -2147483648);
  assertEquals(view.getInt32(40, true), 2147483647);
  assertEquals(view.getUint32(44, true), 0xffffffff);
  // Simulate native writes at SDK offsets, independently of the setters.
  view.setBigUint64(16, 0x8000000000000000n, true);
  view.setBigInt64(24, -1n, true);
  view.setInt32(36, -123, true);
  assertEquals(message.wParam, 0x8000000000000000n);
  assertEquals(message.lParam, -1n);
  assertEquals(message.pt, { x: -123, y: 2147483647 });
  assertEquals(message.message, 0xffffffff);
  assertEquals(message.time, 0xffffffff);
  assertEquals(message.lPrivate, 0xffffffff);
});
