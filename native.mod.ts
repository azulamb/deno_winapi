/**
 * Kernel, User, Gdi, Ole, Shlwapi and Dwm API classes and their FFI definitions.
 * Libraries load lazily on first use; classes accept injected libraries for testing.
 * @module
 */
export { User } from './src/api/user.ts';
export { Kernel } from './src/api/kernel.ts';
export { Gdi } from './src/api/gdi.ts';
export { Ole } from './src/api/ole.ts';
export { Shlwapi } from './src/api/shlwapi.ts';
export { Dwm } from './src/api/dwm.ts';
export { oleDefinitions } from './src/libs/ole.ts';
export { shlwapiDefinitions } from './src/libs/shlwapi.ts';
export { dwmDefinitions } from './src/libs/dwm.ts';
export { gdiDefinitions } from './src/libs/gdi.ts';
export { userDefinitions } from './src/libs/user.ts';
export { kernelDefinitions } from './src/libs/kernel.ts';
