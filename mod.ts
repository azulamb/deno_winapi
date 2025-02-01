import { WinTypes } from './src/win_types.ts';
import * as constant from './src/libs/constant.ts';
import { Create } from './src/create.ts';
import { Kernel } from './src/api/kernel.ts';
import { User } from './src/api/user.ts';
import { macro } from './src/libs/macro.ts';
import data from './deno.json' with { type: 'json' };
export const VERSION = data.version;

export const winApi = {
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
