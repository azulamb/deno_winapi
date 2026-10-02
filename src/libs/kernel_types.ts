/** Native signatures are derived from the runtime FFI definitions. */
import type { kernelDefinitions } from './kernel.ts';
import type { callbackFunctions } from './kernel_callback.ts';

export type KERNEL_FUNKS = typeof kernelDefinitions;
export type CALLBACK_FUNCTIONS = typeof callbackFunctions;
