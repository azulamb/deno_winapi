import { Message } from './structs/message.ts';
import { WindowClassEx } from './structs/window_class_ex.ts';
import { macro } from './libs/macro.ts';
import { RECT } from './structs/rect.ts';

export const Create = {
  stringPointer: (value: string): LPCWSTR => {
    const buffer = new Uint16Array(
      <number[]> [].map.call(value + '\0', (c: string) => {
        return c.charCodeAt(0);
      }),
    );
    return Deno.UnsafePointer.of(buffer);
  },

  rawPointer: (pointer: Deno.PointerValue): bigint => {
    return BigInt(Deno.UnsafePointer.value(pointer));
  },

  pointer: <T>(rawPointer: bigint) => {
    return Deno.UnsafePointer.create<T>(rawPointer);
  },

  makeLangId: (primary: WORD = 0, sub: WORD = 0): LANGID => {
    return macro.MAKELANGID(primary, sub);
  },

  windowClassEx: () => {
    return new WindowClassEx();
  },

  message: () => {
    return new Message();
  },

  rect: (left?: number, top?: number, right?: number, bottom?: number) => {
    return new RECT(left, top, right, bottom);
  },

  // https://learn.microsoft.com/ja-jp/windows/win32/winmsg/window-class-styles
  classStyle: (
    option: {
      CS_BYTEALIGNCLIENT?: boolean;
      CS_BYTEALIGNWINDOW?: boolean;
      CS_CLASSDC?: boolean;
      CS_DBLCLKS?: boolean;
      CS_DROPSHADOW?: boolean;
      CS_GLOBALCLASS?: boolean;
      CS_HREDRAW?: boolean;
      CS_NOCLOSE?: boolean;
      CS_OWNDC?: boolean;
      CS_PARENTDC?: boolean;
      CS_SAVEBITS?: boolean;
      CS_VREDRAW?: boolean;
    },
  ): UINT => {
    let style = 0;

    if (option.CS_BYTEALIGNCLIENT) {
      style |= 0x1000;
    }

    if (option.CS_BYTEALIGNWINDOW) {
      style |= 0x2000;
    }

    if (option.CS_CLASSDC) {
      style |= 0x0040;
    }

    if (option.CS_DBLCLKS) {
      style |= 0x0008;
    }

    if (option.CS_DROPSHADOW) {
      style |= 0x00020000;
    }

    if (option.CS_GLOBALCLASS) {
      style |= 0x4000;
    }

    if (option.CS_HREDRAW) {
      style |= 0x0002;
    }

    if (option.CS_NOCLOSE) {
      style |= 0x0200;
    }

    if (option.CS_OWNDC) {
      style |= 0x0020;
    }

    if (option.CS_PARENTDC) {
      style |= 0x0080;
    }

    if (option.CS_SAVEBITS) {
      style |= 0x0800;
    }

    if (option.CS_VREDRAW) {
      style |= 0x0001;
    }

    return style;
  },

  // https://learn.microsoft.com/ja-jp/windows/win32/winmsg/window-styles
  windowStyle: (
    option: {
      WS_BORDER?: boolean;
      WS_CAPTION?: boolean;
      WS_CHILD?: boolean;
      WS_CHILDWINDOW?: boolean;
      WS_CLIPCHILDREN?: boolean;
      WS_CLIPSIBLINGS?: boolean;
      WS_DISABLED?: boolean;
      WS_DLGFRAME?: boolean;
      Ws_group?: boolean;
      WS_HSCROLL?: boolean;
      WS_ICONIC?: boolean;
      WS_MAXIMIZE?: boolean;
      WS_MAXIMIZEBOX?: boolean;
      WS_MINIMIZE?: boolean;
      WS_MINIMIZEBOX?: boolean;
      WS_OVERLAPPED?: boolean;
      WS_OVERLAPPEDWINDOW?: boolean;
      WS_POPUP?: boolean;
      WS_POPUPWINDOW?: boolean;
      WS_SIZEBOX?: boolean;
      WS_SYSMENU?: boolean;
      WS_TABSTOP?: boolean;
      WS_THICKFRAME?: boolean;
      WS_TILED?: boolean;
      WS_TILEDWINDOW?: boolean;
      WS_VISIBLE?: boolean;
      WS_VSCROLL?: boolean;
    },
  ): DWORD => {
    let style = 0;

    if (option.WS_BORDER) {
      style |= 0x00800000;
    }
    if (option.WS_CAPTION) {
      style |= 0x00C00000;
    }
    if (option.WS_CHILD) {
      style |= 0x40000000;
    }
    if (option.WS_CHILDWINDOW) {
      style |= 0x40000000;
    }
    if (option.WS_CLIPCHILDREN) {
      style |= 0x02000000;
    }
    if (option.WS_CLIPSIBLINGS) {
      style |= 0x04000000;
    }
    if (option.WS_DISABLED) {
      style |= 0x08000000;
    }
    if (option.WS_DLGFRAME) {
      style |= 0x00400000;
    }
    if (option.Ws_group) {
      style |= 0x00020000;
    }
    if (option.WS_HSCROLL) {
      style |= 0x00100000;
    }
    if (option.WS_ICONIC) {
      style |= 0x20000000;
    }
    if (option.WS_MAXIMIZE) {
      style |= 0x01000000;
    }
    if (option.WS_MAXIMIZEBOX) {
      style |= 0x00010000;
    }
    if (option.WS_MINIMIZE) {
      style |= 0x20000000;
    }
    if (option.WS_MINIMIZEBOX) {
      style |= 0x00020000;
    }
    if (option.WS_OVERLAPPED) {
      style |= 0x00000000;
    }
    if (option.WS_OVERLAPPEDWINDOW) {
      style |= 0x00000000 | 0x00C00000 | 0x00080000 | 0x00040000 | 0x00020000 | 0x00010000;
    }
    if (option.WS_POPUP) {
      style |= 0x80000000;
    }
    if (option.WS_POPUPWINDOW) {
      style |= 0x80000000 | 0x00800000 | 0x00080000;
    }
    if (option.WS_SIZEBOX) {
      style |= 0x00040000;
    }
    if (option.WS_SYSMENU) {
      style |= 0x00080000;
    }
    if (option.WS_TABSTOP) {
      style |= 0x00010000;
    }
    if (option.WS_THICKFRAME) {
      style |= 0x00040000;
    }
    if (option.WS_TILED) {
      style |= 0x00000000;
    }
    if (option.WS_TILEDWINDOW) {
      style |= 0x00000000 | 0x00C00000 | 0x00080000 | 0x00040000 | 0x00020000 | 0x00010000;
    }
    if (option.WS_VISIBLE) {
      style |= 0x10000000;
    }
    if (option.WS_VSCROLL) {
      style |= 0x00200000;
    }

    return style;
  },

  // https://learn.microsoft.com/ja-jp/windows/win32/winmsg/extended-window-styles
  windowStyleEx: (
    option: {
      WS_EX_ACCEPTFILES?: boolean;
      WS_EX_APPWINDOW?: boolean;
      WS_EX_CLIENTEDGE?: boolean;
      WS_EX_COMPOSITED?: boolean;
      WS_EX_CONTEXTHELP?: boolean;
      WS_EX_CONTROLPARENT?: boolean;
      WS_EX_DLGMODALFRAME?: boolean;
      WS_EX_LAYERED?: boolean;
      WS_EX_LAYOUTRTL?: boolean;
      WS_EX_LEFT?: boolean;
      WS_EX_LEFTSCROLLBAR?: boolean;
      WS_EX_LTRREADING?: boolean;
      WS_EX_MDICHILD?: boolean;
      WS_EX_NOACTIVATE?: boolean;
      WS_EX_NOINHERITLAYOUT?: boolean;
      WS_EX_NOPARENTNOTIFY?: boolean;
      WS_EX_NOREDIRECTIONBITMAP?: boolean;
      WS_EX_OVERLAPPEDWINDOW?: boolean;
      WS_EX_PALETTEWINDOW?: boolean;
      WS_EX_RIGHT?: boolean;
      WS_EX_RIGHTSCROLLBAR?: boolean;
      WS_EX_RTLREADING?: boolean;
      WS_EX_STATICEDGE?: boolean;
      WS_EX_TOOLWINDOW?: boolean;
      WS_EX_TOPMOST?: boolean;
      WS_EX_TRANSPARENT?: boolean;
      WS_EX_WINDOWEDGE?: boolean;
    },
  ): DWORD => {
    let style = 0;

    if (option.WS_EX_ACCEPTFILES) {
      style |= 0x00000010;
    }

    if (option.WS_EX_APPWINDOW) {
      style |= 0x00040000;
    }

    if (option.WS_EX_CLIENTEDGE) {
      style |= 0x00000200;
    }

    if (option.WS_EX_COMPOSITED) {
      style |= 0x02000000;
    }

    if (option.WS_EX_CONTEXTHELP) {
      style |= 0x00000400;
    }

    if (option.WS_EX_CONTROLPARENT) {
      style |= 0x00010000;
    }

    if (option.WS_EX_DLGMODALFRAME) {
      style |= 0x00000001;
    }

    if (option.WS_EX_LAYERED) {
      style |= 0x00080000;
    }

    if (option.WS_EX_LAYOUTRTL) {
      style |= 0x00400000;
    }

    if (option.WS_EX_LEFT) {
      style |= 0x00000000;
    }

    if (option.WS_EX_LEFTSCROLLBAR) {
      style |= 0x00004000;
    }

    if (option.WS_EX_LTRREADING) {
      style |= 0x00000000;
    }

    if (option.WS_EX_MDICHILD) {
      style |= 0x00000040;
    }

    if (option.WS_EX_NOACTIVATE) {
      style |= 0x08000000;
    }

    if (option.WS_EX_NOINHERITLAYOUT) {
      style |= 0x00100000;
    }

    if (option.WS_EX_NOPARENTNOTIFY) {
      style |= 0x00000004;
    }

    if (option.WS_EX_NOREDIRECTIONBITMAP) {
      style |= 0x00200000;
    }

    if (option.WS_EX_OVERLAPPEDWINDOW) {
      style |= 0x00000100 | 0x00000200;
    }

    if (option.WS_EX_PALETTEWINDOW) {
      style |= 0x00000100 | 0x00000080 | 0x00000008;
    }

    if (option.WS_EX_RIGHT) {
      style |= 0x00001000;
    }

    if (option.WS_EX_RIGHTSCROLLBAR) {
      style |= 0x00000000;
    }

    if (option.WS_EX_RTLREADING) {
      style |= 0x00002000;
    }

    if (option.WS_EX_STATICEDGE) {
      style |= 0x00020000;
    }

    if (option.WS_EX_TOOLWINDOW) {
      style |= 0x00000080;
    }

    if (option.WS_EX_TOPMOST) {
      style |= 0x00000008;
    }

    if (option.WS_EX_TRANSPARENT) {
      style |= 0x00000020;
    }

    if (option.WS_EX_WINDOWEDGE) {
      style |= 0x00000100;
    }

    return style;
  },

  // https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-showwindow
  showCommand: (
    option:
      | 'SW_HIDE'
      | 'SW_SHOWNORMAL'
      | 'SW_NORMAL'
      | 'SW_SHOWMINIMIZED'
      | 'SW_SHOWMAXIMIZED'
      | 'SW_MAXIMIZE'
      | 'SW_SHOWNOACTIVATE'
      | 'SW_SHOW'
      | 'SW_MINIMIZE'
      | 'SW_SHOWMINNOACTIVE'
      | 'SW_SHOWNA'
      | 'SW_RESTORE'
      | 'SW_SHOWDEFAULT'
      | 'SW_FORCEMINIMIZE',
  ): int => {
    switch (option) {
      case 'SW_HIDE':
        return 0;
      case 'SW_SHOWNORMAL':
      case 'SW_NORMAL':
        return 1;
      case 'SW_SHOWMINIMIZED':
        return 2;
      case 'SW_SHOWMAXIMIZED':
      case 'SW_MAXIMIZE':
        return 3;
      case 'SW_SHOWNOACTIVATE':
        return 4;
      case 'SW_SHOW':
        return 5;
      case 'SW_MINIMIZE':
        return 6;
      case 'SW_SHOWMINNOACTIVE':
        return 7;
      case 'SW_SHOWNA':
        return 8;
      case 'SW_RESTORE':
        return 9;
      case 'SW_SHOWDEFAULT':
        return 10;
      case 'SW_FORCEMINIMIZE':
        return 11;
    }

    return 0;
  },
};
