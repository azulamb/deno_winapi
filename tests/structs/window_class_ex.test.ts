import * as test from '../_setup.ts';
import { WindowClassEx } from '../../src/structs/window_class_ex.ts';
import { callbackFunctions } from '../../src/libs/user.ts';
import type {
  HWND,
  int,
  LPARAM,
  LRESULT,
  UINT,
  WNDPROC,
  WPARAM,
} from '../../src/win_types.d.ts';

function GetUTF16String(pointer: Deno.PointerValue) {
  if (!pointer) {
    return '';
  }
  let offset = 0;
  const charCodes: number[] = [];
  for (; offset < 100; ++offset) {
    const charCode = new Deno.UnsafePointerView(pointer).getInt16(offset * 2);
    if (!charCode) {
      break;
    }
    charCodes.push(charCode);
  }
  return String.fromCharCode.apply('', charCodes);
}

Deno.test(
  'Create WindowClassEx',
  () => {
    const windowClassEx = new WindowClassEx();

    // Set values.
    const style: UINT = test.values.u32.random();
    windowClassEx.style = style;

    const lpfnWndProc: WNDPROC = test.values.pointer.create();
    windowClassEx.lpfnWndProc = lpfnWndProc;

    const cbClsExtra: int = test.values.i32.random();
    windowClassEx.cbClsExtra = cbClsExtra;

    const cbWndExtra: int = test.values.i32.random();
    windowClassEx.cbWndExtra = cbWndExtra;

    const hInstance: WNDPROC = test.values.pointer.create();
    windowClassEx.hInstance = hInstance;

    const hIcon: WNDPROC = test.values.pointer.create();
    windowClassEx.hIcon = hIcon;

    const hCursor: WNDPROC = test.values.pointer.create();
    windowClassEx.hCursor = hCursor;

    const hbrBackground: WNDPROC = test.values.pointer.create();
    windowClassEx.hbrBackground = hbrBackground;

    const lpszMenuName = 'MenuName';
    windowClassEx.setMenuName(lpszMenuName);

    const lpszClassName = 'WindowClassName';
    windowClassEx.setClassName(lpszClassName);

    const hIconSm: WNDPROC = test.values.pointer.create();
    windowClassEx.hIconSm = hIconSm;

    // Test values.
    test.assertEquals(
      windowClassEx.cbSize,
      80,
      'Invalid "WindowClassEx.cbSize".',
    );
    test.assertEquals(
      windowClassEx.style,
      style,
      'Invalid "WindowClassEx.style".',
    );
    test.assertEquals(
      test.values.pointer.value(windowClassEx.lpfnWndProc),
      test.values.pointer.value(lpfnWndProc),
      'Invalid "WindowClassEx.lpfnWndProc".',
    );
    test.assertEquals(
      windowClassEx.cbClsExtra,
      cbClsExtra,
      'Invalid "WindowClassEx.cbClsExtra".',
    );
    test.assertEquals(
      windowClassEx.cbWndExtra,
      cbWndExtra,
      'Invalid "WindowClassEx.cbWndExtra".',
    );
    test.assertEquals(
      windowClassEx.hInstance,
      hInstance,
      'Invalid "WindowClassEx.hInstance".',
    );
    test.assertEquals(
      windowClassEx.hIcon,
      hIcon,
      'Invalid "WindowClassEx.hIcon".',
    );
    test.assertEquals(
      windowClassEx.hCursor,
      hInstance,
      'Invalid "WindowClassEx.hCursor".',
    );
    test.assertEquals(
      windowClassEx.hbrBackground,
      hbrBackground,
      'Invalid "WindowClassEx.hbrBackground".',
    );
    test.assertEquals(
      GetUTF16String(windowClassEx.lpszMenuName),
      lpszMenuName,
      'Invalid "WindowClassEx.lpszMenuName".',
    );
    test.assertEquals(
      GetUTF16String(windowClassEx.lpszClassName),
      lpszClassName,
      'Invalid "WindowClassEx.lpszClassName".',
    );
    test.assertEquals(
      windowClassEx.hIconSm,
      hIconSm,
      'Invalid "WindowClassEx.hIconSm".',
    );
  },
);

Deno.test(
  'Exec WindowProcedure.',
  () => {
    const windowClassEx = new WindowClassEx();

    const hWnd: HWND = test.values.pointer.create();
    const Msg: UINT = test.values.u32.random();
    const wParam: WPARAM = test.values.pointer.create();
    const lParam: LPARAM = test.values.pointer.create();
    const result: LRESULT = test.values.pointer.create();

    windowClassEx.setWindowProcedure(
      (arg0: HWND, arg1: UINT, arg2: WPARAM, arg3: LPARAM) => {
        test.assertEquals(arg0, hWnd);
        test.assertEquals(arg1, Msg);
        test.assertEquals(arg2, wParam);
        test.assertEquals(arg3, lParam);

        return result;
      },
    );

    const pointer = windowClassEx.lpfnWndProc;
    if (pointer) {
      const actual = new Deno.UnsafeFnPointer(
        pointer,
        callbackFunctions.DefWindowProcW,
      ).call(hWnd, Msg, wParam, lParam);

      test.assertEquals(
        Deno.UnsafePointer.value(actual),
        Deno.UnsafePointer.value(result),
      );

      windowClassEx.closeWindowProcedure();
    } else {
      test.assert(false, 'Failure create WindowProcedure.');
    }
  },
);
