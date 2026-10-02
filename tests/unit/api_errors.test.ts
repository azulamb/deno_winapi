import { assertEquals, assertThrows } from '../_setup.ts';
import { Kernel } from '../../src/api/kernel.ts';
import { User } from '../../src/api/user.ts';
import type { kernel } from '../../src/libs/kernel.ts';
import type { user } from '../../src/libs/user.ts';

Deno.test('GetModuleFileName expands relative to capacity and preserves long paths', () => {
  const path = 'C:\\' + 'x'.repeat(600) + '.exe';
  const capacities: number[] = [];
  const api = new Kernel(
    {
      symbols: {
        GetModuleFileNameW: (
          _module: unknown,
          pointer: Deno.PointerValue,
          size: number,
        ) => {
          capacities.push(size);
          const output = new Uint16Array(
            new Deno.UnsafePointerView(pointer!).getArrayBuffer(size * 2),
          );
          for (let i = 0; i < Math.min(path.length, size); i++) {
            output[i] = path.charCodeAt(i);
          }
          return Math.min(path.length, size);
        },
        GetLastError: () => 0,
      },
    } as unknown as typeof kernel,
  );
  assertEquals(api.GetModuleFileName(null, 8), path);
  assertEquals(capacities, [8, 16, 32, 64, 128, 256, 512, 1024]);
});

Deno.test('GetModuleFileName reports failures and bounds growth', () => {
  const api = new Kernel(
    {
      symbols: {
        GetModuleFileNameW: () => 0,
        GetLastError: () => 5,
      },
    } as unknown as typeof kernel,
  );
  assertThrows(() => api.GetModuleFileName(), Error, 'failed: 5');
  assertThrows(() => api.GetModuleFileName(null, 1.5), RangeError);
  assertThrows(() => api.GetModuleFileName(null, 32769), RangeError);
  api.libs = {
    symbols: {
      GetModuleFileNameW: (_: unknown, __: unknown, size: number) => size,
    },
  } as unknown as typeof kernel;
  assertThrows(() => api.GetModuleFileName(), Error, 'exceeds');
});

Deno.test('GetMessage distinguishes a message, quit, and failure', () => {
  let result = 1;
  const api = new User(
    { symbols: { GetMessageW: () => result } } as unknown as typeof user,
    { GetLastError: () => 1400 },
  );
  assertEquals(api.GetMessage(null, null), true);
  result = 0;
  assertEquals(api.GetMessage(null, null), false);
  result = -1;
  assertThrows(() => api.GetMessage(null, null), Error, 'failed: 1400');
});
