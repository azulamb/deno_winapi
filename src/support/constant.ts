import type { WindowMessageName, WindowsResourceType } from '../types.ts';

/**
 * Window message values.
 * https://learn.microsoft.com/ja-jp/windows/win32/winmsg/window-notifications
 */
export type WINDOW_MESSAGE_VALUES = { [key in WindowMessageName]: number };

/** Window message constants. */
export const WindowMessage: WINDOW_MESSAGE_VALUES = {
  WM_NULL: 0x0000,
  WM_CREATE: 0x0001,
  WM_DESTROY: 0x0002,
  WM_MOVE: 0x0003,
  WM_SIZE: 0x0005,
  WM_ENABLE: 0x000A,
  WM_CLOSE: 0x0010,
  WM_QUIT: 0x0012,
  WM_QUERYOPEN: 0x0013,
  WM_SHOWWINDOW: 0x0018,
  WM_ACTIVATEAPP: 0x001C,
  WM_CANCELMODE: 0x001F,
  WM_CHILDACTIVATE: 0x0022,
  WM_GETMINMAXINFO: 0x0024,
  WM_QUERYDRAGICON: 0x0037,
  WM_COMPACTING: 0x0041,
  WM_WINDOWPOSCHANGING: 0x0046,
  WM_WINDOWPOSCHANGED: 0x0047,
  WM_INPUTLANGCHANGEREQUEST: 0x0050,
  WM_INPUTLANGCHANGE: 0x0051,
  WM_USERCHANGED: 0x0054,
  WM_STYLECHANGING: 0x007C,
  WM_STYLECHANGED: 0x007D,
  WM_GETICON: 0x007F,
  WM_SETICON: 0x0080,
  WM_NCCREATE: 0x0081,
  WM_NCDESTROY: 0x0082,
  WM_NCCALCSIZE: 0x0083,
  WM_NCACTIVATE: 0x0086,
  WM_SIZING: 0x0214,
  WM_MOVING: 0x0216,
  WM_ENTERSIZEMOVE: 0x0231,
  WM_EXITSIZEMOVE: 0x0232,
  WM_DPICHANGED: 0x02E0,
  WM_THEMECHANGED: 0x031A,
};

/**
 * Windows resource types.
 * https://learn.microsoft.com/ja-jp/windows/win32/menurc/resource-types
 */
export type RESOURCE_TYPE_VALUES = { [key in WindowsResourceType]: number };

/** Windows resource types. */
export const ResourceType: RESOURCE_TYPE_VALUES = {
  RT_CURSOR: 1,
  RT_BITMAP: 2,
  RT_ICON: 3,
  RT_MENU: 4,
  RT_DIALOG: 5,
  RT_STRING: 6,
  RT_FONTDIR: 7,
  RT_FONT: 8,
  RT_ACCELERATOR: 9,
  RT_RCDATA: 10,
  RT_MESSAGETABLE: 11,
  RT_GROUP_CURSOR: 12, // RT_CURSOR + 11
  RT_GROUP_ICON: 14, // RT_ICON + 11
  RT_VERSION: 16,
  RT_DLGINCLUDE: 17,
  RT_PLUGPLAY: 19,
  RT_VXD: 20,
  RT_ANICURSOR: 21,
  RT_ANIICON: 22,
  RT_HTML: 23,
  RT_MANIFEST: 24,
};

/** Windows constant values. */
export type CONSTANT_VALUES = { CW_USEDEFAULT: number };

/** Windows constant values. */
export const Constant = {
  CW_USEDEFAULT: -2147483648, // CW_USEDEFAULT = 0x80000000
};

/** Windows API maximum values. */
export const Max = {
  MAX_PATH: 260,
};
