/** Native and callback signatures are derived from their FFI definitions. */
export type CALLBACK_FUNCTIONS =
  typeof import('./kernel_callback.ts').callbackFunctions;
export type KERNEL_FUNKS = typeof import('./kernel.ts').kernelDefinitions;
