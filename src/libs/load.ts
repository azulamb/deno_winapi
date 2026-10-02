/** Loads once per JS isolate. Importing the module does not require FFI. */
export function lazyLibrary<T extends Deno.ForeignLibraryInterface>(
  name: string,
  definitions: T,
): Deno.DynamicLibrary<T> {
  let library: Deno.DynamicLibrary<T> | undefined;
  return new Proxy({} as Deno.DynamicLibrary<T>, {
    get(_target, property) {
      if (!library) {
        if (
          Deno.build.os !== 'windows' ||
          !['x86_64', 'aarch64'].includes(Deno.build.arch)
        ) {
          throw new Error('deno_winapi requires 64-bit Windows.');
        }
        library = Deno.dlopen(name, definitions);
      }
      const value = Reflect.get(library, property);
      return typeof value === 'function' ? value.bind(library) : value;
    },
  });
}
