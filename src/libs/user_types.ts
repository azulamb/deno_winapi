/** Native and callback signatures are derived from their FFI definitions. */
export type CALLBACK_FUNCTIONS =
  typeof import('./user_callback.ts').callbackFunctions;
export type USER_FUNKS = typeof import('./user.ts').userDefinitions;
