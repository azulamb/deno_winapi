# Release

## 0.4.0

- Add `Gdi` / `winApi.gdi` with lazy loading of `gdi32.dll`.
- Add `Ole`, `Shlwapi` and `Dwm` for COM initialization, memory streams and
  desktop composition; extend `User` with DPI, positioning and drawing APIs.
- Wrap `CreateRectRgn`, `CreateSolidBrush`, `DeleteObject`, `GetPixel` and
  `GetStockObject`, including their Windows types and native FFI definitions.

## Release checks

- `deno task check` (lint, JSR public API validation, Deno/release version
  checks)
- `deno task check:publish` (lint and JSR validation only; safe before
  committing)
- `deno task report`
- `deno fmt`
