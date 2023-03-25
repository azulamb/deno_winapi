import {} from './src/win_types.d.ts';
import { constant, winMassage } from './src/win_types.ts';
import { Create } from './src/create.ts';
import { Kernel } from './src/api/kernel.ts';
import { User } from './src/api/user.ts';
import { macro } from './src/libs/macro.ts';

export const winApi = {
	create: Create,
	kernel: new Kernel(),
	user: new User(),
	messageType: winMassage,
	constant: constant,
	macro: macro,
};
