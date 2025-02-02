import * as test from '../_setup.ts';
import { Message } from '../../src/structs/message.ts';
import type { DWORD, HWND, LONG, LPARAM, UINT, WPARAM } from '../../mod.ts';

Deno.test(
  'Create Message',
  () => {
    const message = new Message();

    // Set values.
    const hwnd: HWND = test.values.pointer.create();
    message.hwnd = hwnd;

    const _message: UINT = test.values.u32.random();
    message.message = _message;

    const wParam: WPARAM = test.values.pointer.create();
    message.wParam = wParam;

    const lParam: LPARAM = test.values.pointer.create();
    message.lParam = lParam;

    const time: DWORD = test.values.i32.random();
    message.time = time;

    const x: LONG = test.values.i64.random();
    const y: LONG = test.values.i64.random();
    message.pt = { x: x, y: y };

    const lPrivate: DWORD = test.values.i32.random();
    message.lPrivate = lPrivate;

    // Test values.
    test.assertEquals(message.hwnd, hwnd, 'Invalid "Message.hwnd".');
    test.assertEquals(message.message, _message, 'Invalid "Message.message".');
    test.assertEquals(message.wParam, hwnd, 'Invalid "Message.wParam".');
    test.assertEquals(message.lParam, hwnd, 'Invalid "Message.lParam".');
    test.assertEquals(message.time, time, 'Invalid "Message.time".');
    test.assertEquals(message.pt.x, x, 'Invalid "Message.pt.x".');
    test.assertEquals(message.pt.y, y, 'Invalid "Message.pt.y".');
    test.assertEquals(
      message.lPrivate,
      lPrivate,
      'Invalid "Message.lPrivate".',
    );
  },
);
