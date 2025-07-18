import { user } from '../libs/user.ts';
import { Converter } from '../win_types.ts';
import type {
  DWORD,
  HICON,
  HINSTANCE,
  HMENU,
  HWND,
  int,
  LPARAM,
  LPCWSTR,
  LPMSG,
  LPRECT,
  LPVOID,
  LPWNDCLASSEXW,
  LRESULT,
  PBYTE,
  UINT,
  WPARAM,
} from '../types.ts';
import { Create } from '../support/create.ts';

export class User {
  public libs = user;

  public CreateIconFromResourceEx(
    presbits: PBYTE,
    dwResSize: DWORD,
    fIcon: boolean = true,
    dwVer: DWORD = 0,
    cxDesired: int = 0,
    cyDesired: int = 0,
    Flags: {
      LR_DEFAULTCOLOR: true;
      LR_MONOCHROME?: false;
      LR_DEFAULTSIZE?: boolean;
      LR_SHARED?: boolean;
    } | {
      LR_DEFAULTCOLOR?: false;
      LR_MONOCHROME: true;
      LR_DEFAULTSIZE?: boolean;
      LR_SHARED?: boolean;
    } | {
      LR_DEFAULTCOLOR?: false;
      LR_MONOCHROME?: false;
      LR_DEFAULTSIZE?: boolean;
      LR_SHARED?: boolean;
    } = {},
  ): HICON {
    if (dwVer < 0x00020000 || 0x00030000 < dwVer) {
      dwVer = 0x00030000;
    }
    let FlagsNum = 0;
    if (Flags.LR_MONOCHROME) {
      FlagsNum |= 1;
    }
    if (Flags.LR_DEFAULTSIZE) {
      FlagsNum |= 64;
    }
    if (Flags.LR_SHARED) {
      FlagsNum |= 32768;
    }
    return Converter.HICON(this.libs.symbols.CreateIconFromResourceEx(
      Converter.PBYTE(presbits),
      Converter.DWORD(dwResSize),
      fIcon ? 1 : 0,
      Converter.DWORD(dwVer),
      Converter.int(cxDesired),
      Converter.int(cyDesired),
      Converter.UINT(FlagsNum),
    ));
  }

  public CreateWindowEx(
    dwExStyle: DWORD,
    lpClassName: LPCWSTR,
    lpWindowName: LPCWSTR,
    dwStyle: DWORD,
    x: int,
    y: int,
    nWidth: int,
    nHeight: int,
    hWndParent: HWND | null = null,
    hMenu: HMENU | null = null,
    hInstance: HINSTANCE | null = null,
    lpParam: LPVOID | null = null,
  ): HWND {
    return Converter.HWND(this.libs.symbols.CreateWindowExW(
      Converter.DWORD(dwExStyle),
      lpClassName,
      lpWindowName,
      Converter.DWORD(dwStyle),
      Converter.int(x),
      Converter.int(y),
      Converter.int(nWidth),
      Converter.int(nHeight),
      hWndParent,
      hMenu,
      hInstance,
      lpParam,
    ));
  }

  public DefWindowProc(
    hWnd: HWND,
    Msg: UINT,
    wParam: WPARAM | null,
    lParam: LPARAM | null,
  ): LRESULT {
    return Converter.LRESULT(this.libs.symbols.DefWindowProcW(
      hWnd,
      Msg,
      wParam,
      lParam,
    ));
  }

  public DispatchMessage(lpMsg: LPMSG): LRESULT {
    return Converter.LRESULT(this.libs.symbols.DispatchMessageW(lpMsg));
  }

  public GetClientRect(hWnd: HWND, lpRect: LPRECT): number {
    return this.libs.symbols.GetClientRect(hWnd, lpRect);
  }

  public GetMessage(
    lpMsg: LPMSG,
    hWnd: HWND,
    wMsgFilterMin: UINT = 0,
    wMsgFilterMax: UINT = 0,
  ): boolean {
    const result = this.libs.symbols.GetMessageW(
      lpMsg,
      hWnd,
      Converter.UINT(wMsgFilterMin),
      Converter.UINT(wMsgFilterMax),
    );
    return 0 < result;
  }

  public LoadIcon(hInstance: HINSTANCE, lpIconName: string | LPCWSTR): HICON {
    if (typeof lpIconName === 'string') {
      lpIconName = Create.stringPointer(lpIconName);
    }
    return this.libs.symbols.LoadIconW(hInstance, lpIconName);
  }

  public MessageBoxEx(
    hWnd: HWND | null,
    lpText: string | LPCWSTR | null,
    lpCaption: string | LPCWSTR | null,
    uType: {
      MB_OK?: boolean;
      MB_OKCANCEL?: boolean;
      MB_ABORTRETRYIGNORE?: boolean;
      MB_YESNOCANCEL?: boolean;
      MB_YESNO?: boolean;
      MB_RETRYCANCEL?: boolean;
      MB_CANCELTRYCONTINUE?: boolean;
      MB_HELP?: boolean;
    } = {},
    dwLanguageId: DWORD = 0,
  ): int {
    let uTypeNum = 0;
    if (uType.MB_OK) {
      uTypeNum |= 0;
    }
    if (uType.MB_OKCANCEL) {
      uTypeNum |= 1;
    }
    if (uType.MB_ABORTRETRYIGNORE) {
      uTypeNum |= 2;
    }
    if (uType.MB_YESNOCANCEL) {
      uTypeNum |= 3;
    }
    if (uType.MB_YESNO) {
      uTypeNum |= 4;
    }
    if (uType.MB_RETRYCANCEL) {
      uTypeNum |= 5;
    }
    if (uType.MB_CANCELTRYCONTINUE) {
      uTypeNum |= 6;
    }
    if (uType.MB_HELP) {
      uTypeNum |= 16384;
    }

    if (typeof lpText === 'string') {
      lpText = Create.stringPointer(lpText);
    }

    if (typeof lpCaption === 'string') {
      lpCaption = Create.stringPointer(lpCaption);
    }

    return this.libs.symbols.MessageBoxExW(
      hWnd,
      lpText,
      lpCaption,
      uTypeNum,
      dwLanguageId,
    );
  }

  public PostQuitMessage(nExitCode: int): void {
    return this.libs.symbols.PostQuitMessage(
      Converter.int(nExitCode),
    );
  }

  public RegisterClassEx(windowClassExPointer: LPWNDCLASSEXW): number {
    return Converter.ATOM(
      this.libs.symbols.RegisterClassExW(windowClassExPointer),
    );
  }

  public SendMessage(
    hWnd: HWND,
    Msg: UINT,
    wParam: WPARAM | null,
    lParam: LPARAM | null,
  ): LRESULT {
    return Converter.LRESULT(this.libs.symbols.SendMessageW(
      hWnd,
      Msg,
      wParam,
      lParam,
    ));
  }

  public ShowWindow(
    hWnd: HWND,
    nCmdShow: int,
  ): boolean {
    return Converter.BOOL(this.libs.symbols.ShowWindow(hWnd, nCmdShow));
  }

  public TranslateMessage(lpMsg: LPMSG): boolean {
    return Converter.BOOL(this.libs.symbols.TranslateMessage(lpMsg));
  }

  public UpdateWindow(hWnd: HWND): boolean {
    return Converter.BOOL(this.libs.symbols.UpdateWindow(hWnd));
  }
}
