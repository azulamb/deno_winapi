// Run with `deno run tests/import_without_ffi.ts` (no permission flags).
import { Message, winApi } from '../mod.ts';
import { WinTypes } from '../types.mod.ts';
import { Constant } from '../constants.mod.ts';
import { WindowClassEx } from '../structs.mod.ts';
import { Kernel, User } from '../native.mod.ts';
if (
  WinTypes.LONG.size !== 4 || Message.SIZE !== 48 || !Constant ||
  !winApi || !WindowClassEx || !new User() || !new Kernel()
) {
  throw new Error('Import failed.');
}
console.log('All entry points import without FFI permissions.');
