import { WIN_TYPES_INFO, WinTypes } from './src/win_types.ts';
import * as constant from './src/libs/constant.ts';
import { Create, CreateWindowsTypes } from './src/create.ts';
import { Kernel } from './src/api/kernel.ts';
import { User } from './src/api/user.ts';
import { macro, WINDOWS_MACRO } from './src/libs/macro.ts';
import data from './deno.json' with { type: 'json' };
import {
  CONSTANT_VALUES,
  RESOURCE_TYPE_VALUES,
  WINDOW_MESSAGE_VALUES,
} from './src/libs/constant.ts';
export const VERSION = data.version;

export type * from './src/types.ts';

export const winApi: {
  create: CreateWindowsTypes;
  kernel: Kernel;
  user: User;
  winTypes: WIN_TYPES_INFO;
  constant: CONSTANT_VALUES;
  windowMassage: WINDOW_MESSAGE_VALUES;
  resourceType: RESOURCE_TYPE_VALUES;
  macro: WINDOWS_MACRO;
} = {
  create: Create,
  kernel: new Kernel(),
  user: new User(),
  winTypes: WinTypes,
  constant: constant.Constant,
  windowMassage: constant.WindowMassage,
  resourceType: constant.ResourceType,
  macro: macro,
};

// structs

export { Message } from './src/structs/message.ts';
export { WindowClassEx } from './src/structs/window_class_ex.ts';
export { Rect } from './src/structs/rect.ts';
