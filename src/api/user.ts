import { user } from '../libs/user.ts';
import { Converter } from '../win_types.ts';

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

  public GetMessage(
    lpMsg: LPMSG,
    hWnd: HWND,
    wMsgFilterMin: UINT = 0,
    wMsgFilterMax: UINT = 0,
  ) {
    const result = this.libs.symbols.GetMessageW(
      lpMsg,
      hWnd,
      Converter.UINT(wMsgFilterMin),
      Converter.UINT(wMsgFilterMax),
    );
    return 0 < result;
  }

  public LoadIcon(hInstance: HINSTANCE, lpIconName: LPCWSTR) {
    return this.libs.symbols.LoadIconW(hInstance, lpIconName);
  }

  public PostQuitMessage(nExitCode: int) {
    return this.libs.symbols.PostQuitMessage(
      Converter.int(nExitCode),
    );
  }

  public RegisterClassEx(windowClassExPointer: LPWNDCLASSEXW) {
    return Converter.ATOM(this.libs.symbols.RegisterClassExW(windowClassExPointer));
  }

  public ShowWindow(
    hWnd: HWND,
    nCmdShow: int,
  ) {
    return Converter.BOOL(this.libs.symbols.ShowWindow(hWnd, nCmdShow));
  }

  public TranslateMessage(lpMsg: LPMSG) {
    return Converter.BOOL(this.libs.symbols.TranslateMessage(lpMsg));
  }

  public UpdateWindow(hWnd: HWND) {
    return Converter.BOOL(this.libs.symbols.UpdateWindow(hWnd));
  }
}
