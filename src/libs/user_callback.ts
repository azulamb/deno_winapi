import { userDefinitions } from './user.ts';

/** WNDPROC uses the same signature as DefWindowProcW. */
export const callbackFunctions: {
  readonly DefWindowProcW: typeof userDefinitions.DefWindowProcW;
} = {
  DefWindowProcW: userDefinitions.DefWindowProcW,
};
