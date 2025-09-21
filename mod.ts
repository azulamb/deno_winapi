/**
 * Windows API module
 * @module winApi
 */

import { WIN_TYPES_INFO, WinTypes } from './src/win_types.ts';
import * as constant from './src/support/constant.ts';
import { Create, CreateWindowsTypes } from './src/support/create.ts';
import { Kernel } from './src/api/kernel.ts';
import { User } from './src/api/user.ts';
import { macro, WINDOWS_MACRO } from './src/support/macro.ts';
import data from './deno.json' with { type: 'json' };
import {
  CONSTANT_VALUES,
  RESOURCE_TYPE_VALUES,
  WINDOW_MESSAGE_VALUES,
} from './src/support/constant.ts';
/** Current version of the Windows API module */
export const VERSION = data.version;

/** Windows API types */
export type * from './src/types.ts';

/** Windows API constants */
export const winApi: {
  create: CreateWindowsTypes;
  kernel: Kernel;
  user: User;
  winTypes: WIN_TYPES_INFO;
  constant: CONSTANT_VALUES;
  windowMessage: WINDOW_MESSAGE_VALUES;
  resourceType: RESOURCE_TYPE_VALUES;
  macro: WINDOWS_MACRO;
} = {
  create: Create,
  kernel: new Kernel(),
  user: new User(),
  winTypes: WinTypes,
  constant: constant.Constant,
  windowMessage: constant.WindowMessage,
  resourceType: constant.ResourceType,
  macro: macro,
};

// structs

/** Windows API Message structure */
export { Message } from './src/structs/message.ts';
/** Windows API WindowClassEx structure */
export { WindowClassEx } from './src/structs/window_class_ex.ts';
/** Windows API RECT structure */
export { Rect } from './src/structs/rect.ts';

// Support
export { hresultToString } from './src/libs/hresult.ts';
