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
  UINT,
  WPARAM,
} from '../win_types.d.ts';

export class User {
  public libs = user;

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

  public LoadIcon(hInstance: HINSTANCE, lpIconName: LPCWSTR): HICON {
    return this.libs.symbols.LoadIconW(hInstance, lpIconName);
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
