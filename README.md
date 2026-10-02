# deno_winapi

`deno_winapi` is WindowsAPI wrapper.

- GitHub
  - https://github.com/azulamb/deno_winapi
- API list.
  - https://azulamb.github.io/deno_winapi/
- JSR
  - https://jsr.io/@azulamb/winapi

## Develop

- Deno
  - `2.4.2`
- Command
  - `deno task tests`

## Exec

Native API calls require 64-bit Windows and `--allow-ffi`. Imports do not load
DLLs; each Worker loads its libraries lazily on first use.

Example: `deno run --allow-ffi ./sample/sample.ts`

## Sample

- Create window.
  - [sample.ts](./sample/sample.ts)
- Build sample.
  - `deno task build`

## Tools

- `deno task report`
  - Generate `docs/*.json` and `docs/*.html`
  - Update the information of the implemented API.

## Imports

The existing `winApi` facade remains available. Additional entry points separate
native APIs from types, constants and structures:

```ts
import { winApi } from '@azulamb/winapi';
import type { HWND, LPARAM, WPARAM } from '@azulamb/winapi/types';
import { Constant, WindowMessage } from '@azulamb/winapi/constants';
import { Message, OwnedUtf16, WindowClassEx } from '@azulamb/winapi/structs';
import { Kernel, User } from '@azulamb/winapi/native';
```

Importing any of these entry points requires no FFI permission. Constructing
objects that obtain native pointers or invoking native APIs requires
`--allow-ffi`. `User` and `Kernel` accept an injected library in their
constructors for testing. Native library handles are cached per JavaScript
isolate (including each Worker).

## Integer types and migration

- `LONG` and `POINT` / `RECT` coordinates are signed 32-bit `number` values.
- `WPARAM` is an unsigned 64-bit `bigint` on supported Windows targets.
- `LONG_PTR`, `LPARAM` and `LRESULT` are signed 64-bit `bigint` values.
- Handles and memory addresses, such as `HWND` and `LPVOID`, remain
  `Deno.PointerValue` values.
- `MSG` uses the native 48-byte layout, including alignment padding.

This changes the previous pointer-based message parameter API. Pass `0n` instead
of `null` for integer message parameters. If a message carries an actual
pointer, convert it explicitly at that boundary:

```ts
const lParam = BigInt.asIntN(64, Deno.UnsafePointer.value(pointer));
winApi.user.SendMessage(hwnd, messageId, 0n, lParam);
// For a pointer-valued incoming LPARAM:
const address = Deno.UnsafePointer.create(BigInt.asUintN(64, incomingLParam));
```

Window procedures return integer results, for example `0n`, `-1n`, or the result
of `winApi.user.DefWindowProc(...)`.

## Ownership and message handling

`WindowClassEx.setClassName()` and `setMenuName()` retain their UTF-16 buffers.
Use `OwnedUtf16` when another native API retains a string pointer beyond a call;
keep that owner alive until the native consumer has finished. The legacy
`create.stringPointer()` helper retains its buffer while the returned pointer
object is reachable. Copying its numeric address alone does not retain storage.

`User.RegisterClassEx()` accepts a `WindowClassEx` object or its `.pointer`. For
either form, the wrapper retains the managed class and its callback until
`User.UnregisterClass()` succeeds. Destroy every window of the class before
unregistering it, then call `closeWindowProcedure()`. Closing or replacing the
procedure or names while registered throws. Repeated close calls are safe. Raw
native registrations outside these wrappers require caller-managed ownership.

`EnumResourceNamesEx()` and `EnumResourceTypesEx()` invoke callbacks
synchronously. Callbacks created from JavaScript functions are closed
automatically in `finally`; callers no longer need to close `result.callback`.
Caller-supplied callback pointers remain caller-owned. Copy borrowed string data
inside the callback if it will be used after enumeration returns.

`GetMessage()` returns `true` for a message and `false` for `WM_QUIT`; native
errors throw with the immediately retrieved Windows error code. `PeekMessage()`,
`PostMessage()`, `DestroyWindow()` and `UnregisterClass()` are also available.
Message-loop scheduling belongs to the application/framework; use
`TranslateMessage()` and `DispatchMessage()` for each retrieved window message.

## Validation

```sh
deno task tests
deno run tests/import_without_ffi.ts
deno lint src tests types.mod.ts constants.mod.ts structs.mod.ts native.mod.ts
```

Tests cover native message parameter round trips, class/callback lifetime,
structure byte offsets, signed and unsigned boundaries, long-path buffer growth,
error handling and HRESULT diagnostics. Native integration tests create a hidden
window and destroy it automatically.

## Maintaining FFI signatures

Native signatures are written once using `WinTypes` in `src/libs/user.ts`,
`kernel.ts`, and `kernel_callback.ts`. This keeps the Windows type name visible
next to the native API parameter. To allow JSR's simple inference for property
references, each value also references its existing type:

```ts
WinTypes.HMODULE.ffi as typeof WinTypes.HMODULE.ffi;
```

This assertion reuses the exact declared type; it does not introduce a second
signature declaration. `USER_FUNKS`, `KERNEL_FUNKS` and `CALLBACK_FUNCTIONS` are
derived with `typeof` through `import type`. WNDPROC shares the `DefWindowProcW`
definition, and `DENO_CALLBACK_WNDPROC` derives from it.

After changing signatures, run `deno publish --dry-run --allow-dirty` as well as
the native tests. A type-only import removes runtime dependencies but does not
make a self-referential type annotation valid.
