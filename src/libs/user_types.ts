/** Native signatures are derived from the runtime FFI definitions. */
import type { userDefinitions } from './user.ts';
import type { callbackFunctions } from './user_callback.ts';

export type USER_FUNKS = typeof userDefinitions;
export type CALLBACK_FUNCTIONS = typeof callbackFunctions;
