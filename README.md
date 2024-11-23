# deno_winapi

`winapi` is WindowsAPI wrapper.

API list.

https://azulamb.github.io/deno_winapi/

## Develop

- Deno
  - `1.32.1`
- Command
  - `deno task tests`

## Exec

Need option: `--allow-ffi` `--unstable`

Example: `deno run --allow-ffi --unstable ./sample/sample.ts`

## Sample

- Create window.
  - [sample.ts](./sample/sample.ts)

## Tools

- `deno task report`
  - Generate `docs/*.json` and `docs/*.html`
  - Update the information of the implemented API.
