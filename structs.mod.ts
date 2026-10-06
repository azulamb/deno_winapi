/**
 * Native MSG, RECT and WNDCLASSEXW structures, plus owned UTF-16 string storage.
 * These helpers retain buffers for synchronous Windows FFI calls.
 * @module
 */
export { Message } from './src/structs/message.ts';
export { Rect } from './src/structs/rect.ts';
export { WindowClassEx } from './src/structs/window_class_ex.ts';
export { OwnedUtf16 } from './src/support/utf16.ts';
