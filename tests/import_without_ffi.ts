// Run with `deno run tests/import_without_ffi.ts` (no permission flags).
import { Message, winApi } from '../mod.ts';
import { WinTypes } from '../types.mod.ts';
import { Constant } from '../constants.mod.ts';
import { WindowClassEx } from '../structs.mod.ts';
import { Dwm, Gdi, Kernel, Ole, Shlwapi, User } from '../native.mod.ts';
if (
  WinTypes.LONG.size !== 4 || Message.SIZE !== 48 || !Constant ||
  !winApi || !winApi.gdi || !WindowClassEx || !new User() || !new Kernel() ||
  !new Gdi() || !new Ole() || !new Shlwapi() || !new Dwm()
) {
  throw new Error('Import failed.');
}
console.log('All entry points import without FFI permissions.');
