import { assert, assertEquals, assertThrows } from '../_setup.ts';
import { Message, User, winApi, WindowClassEx } from '../../mod.ts';

Deno.test('native MSG receives unsigned and signed integer parameters', () => {
  const message = new Message();
  const id = 0x8001;
  // Ensure this thread has a message queue before posting to it.
  winApi.user.PeekMessage(message.pointer, null, id, id);
  assert(winApi.user.PostMessage(null, id, 0xffffffffffffffffn, -123n));
  assert(winApi.user.PeekMessage(message.pointer, null, id, id));
  assertEquals(message.message, id);
  assertEquals(message.wParam, 0xffffffffffffffffn);
  assertEquals(message.lParam, -123n);
  assertEquals(message.hwnd, null);
});

Deno.test('window procedure remains alive until destruction and class unregister', () => {
  const owner = new WindowClassEx();
  const name = `WinApiTest-${crypto.randomUUID()}`;
  owner.setClassName(name);
  owner.hInstance = winApi.kernel.GetModuleHandle();
  owner.setWindowProcedure((hwnd, id, wparam, lparam) => {
    if (id === 0x8002) {
      assertEquals(wparam, 0xffffffffffffffffn);
      assertEquals(lparam, -123n);
      return -1n;
    }
    return winApi.user.DefWindowProc(hwnd, id, wparam, lparam);
  });
  assertEquals(owner.data.length, 80);
  assert(winApi.user.RegisterClassEx(owner));
  let hwnd: Deno.PointerValue = null;
  try {
    assertThrows(() => owner.closeWindowProcedure(), Error, 'Unregister');
    assertThrows(() => owner.setClassName('changed'), Error, 'Unregister');
    hwnd = winApi.user.CreateWindowEx(
      0,
      owner.lpszClassName,
      winApi.create.stringPointer('hidden test'),
      0,
      0,
      0,
      100,
      100,
      null,
      null,
      owner.hInstance,
    );
    assert(hwnd, `CreateWindowEx: ${winApi.kernel.GetLastError()}`);
    assertEquals(winApi.user.UnregisterClass(name, owner.hInstance), false);
    assertThrows(() => owner.closeWindowProcedure(), Error, 'Unregister');
    assertEquals(
      winApi.user.SendMessage(hwnd, 0x8002, 0xffffffffffffffffn, -123n),
      -1n,
    );
    assert(winApi.user.DestroyWindow(hwnd));
    hwnd = null;
  } finally {
    if (hwnd) winApi.user.DestroyWindow(hwnd);
    assert(winApi.user.UnregisterClass(name.toUpperCase(), owner.hInstance));
    owner.closeWindowProcedure();
    owner.closeWindowProcedure(); // idempotent
  }
});

Deno.test('class unregister by atom releases ownership across User instances', () => {
  const owner = new WindowClassEx();
  owner.setClassName(`WinApiAtom-${crypto.randomUUID()}`);
  owner.hInstance = winApi.kernel.GetModuleHandle();
  owner.setWindowProcedure((hwnd, message, wparam, lparam) =>
    winApi.user.DefWindowProc(hwnd, message, wparam, lparam)
  );
  const atom = winApi.user.RegisterClassEx(owner.pointer);
  assert(atom);
  // Pointer getters create new objects representing the same native address.
  const procedure = owner.lpfnWndProc;
  assert(procedure);
  const other = new User();
  try {
    assert(
      other.UnregisterClass(
        Deno.UnsafePointer.create(BigInt(atom)),
        owner.hInstance,
      ),
    );
  } finally {
    // The native class has no windows, so normal unregister above must succeed.
    owner.closeWindowProcedure();
  }
});
