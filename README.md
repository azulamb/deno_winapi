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

Need option: `--allow-ffi` `--unstable`

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
