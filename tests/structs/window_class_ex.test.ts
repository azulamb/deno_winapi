import * as test from '../_setup.ts';
import { WindowClassEx } from '../../src/structs/window_class_ex.ts';
import { callbackFunctions } from '../../src/libs/user.ts';

Deno.test(
	'Create WindowClassEx',
	() => {
		const windowClassEx = new WindowClassEx();

		// Set values.
		const style: UINT = test.values.u32.random();
		windowClassEx.style = style;

		const lpfnWndProc: WNDPROC = test.values.pointer.create();
		windowClassEx.lpfnWndProc = lpfnWndProc;

		// Test values.
		test.assertEquals(windowClassEx.cbSize, 80, 'Invalid "WindowClassEx.cbSize".');
		test.assertEquals(windowClassEx.style, style, 'Invalid "WindowClassEx.style".');
		test.assertEquals(test.values.pointer.value(windowClassEx.lpfnWndProc), test.values.pointer.value(lpfnWndProc), 'Invalid "WindowClassEx.lpfnWndProc".');
	}
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

		windowClassEx.setWindowProcedure((arg0: HWND, arg1: UINT, arg2: WPARAM, arg3: LPARAM) => {
			test.assertEquals(arg0, hWnd);
			test.assertEquals(arg1, Msg);
			test.assertEquals(arg2, wParam);
			test.assertEquals(arg3, lParam);

			return result;
		});

		const pointer = windowClassEx.lpfnWndProc;
		if (pointer) {
			const actual = new Deno.UnsafeFnPointer(
				pointer,
				callbackFunctions.DefWindowProcW
			).call(hWnd, Msg, wParam, lParam);

			test.assertEquals(Deno.UnsafePointer.value(actual), Deno.UnsafePointer.value(result));

			windowClassEx.closeWindowProcedure();
		} else {
			test.assert(false, 'Failure create WindowProcedure.');
		}

	}
);
