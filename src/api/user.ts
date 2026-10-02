import { WindowClassEx } from '../structs/window_class_ex.ts';
import { kernel } from '../libs/kernel.ts';
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

type RegisteredClass = {
  owner: WindowClassEx;
  name: string;
  atom: number;
  instance: HINSTANCE;
};

/**
 * User class provides methods to interact with the Windows user32.dll.
 */
export class User {
  private static readonly registrations = new WeakMap<
    object,
    Set<RegisteredClass>
  >();
  private readonly registeredClasses: Set<RegisteredClass>;
  constructor(
    public libs: typeof user = user,
    private errorSource: Pick<typeof kernel.symbols, 'GetLastError'> = {
      GetLastError: () => kernel.symbols.GetLastError(),
    },
  ) {
    let registrations = User.registrations.get(libs);
    if (!registrations) {
      registrations = new Set<RegisteredClass>();
      User.registrations.set(libs, registrations);
    }
    this.registeredClasses = registrations;
  }

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
    wParam: WPARAM = 0n,
    lParam: LPARAM = 0n,
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
    if (result === -1) {
      throw new Error(`GetMessageW failed: ${this.errorSource.GetLastError()}`);
    }
    return result > 0;
  }

  public PeekMessage(
    lpMsg: LPMSG,
    hWnd: HWND = null,
    min: UINT = 0,
    max: UINT = 0,
    remove: UINT = 1,
  ): boolean {
    return this.libs.symbols.PeekMessageW(lpMsg, hWnd, min, max, remove) !== 0;
  }

  public DestroyWindow(hWnd: HWND): boolean {
    return this.libs.symbols.DestroyWindow(hWnd) !== 0;
  }

  public UnregisterClass(
    name: string | LPCWSTR,
    instance: HINSTANCE = null,
  ): boolean {
    const pointer = typeof name === 'string'
      ? Create.stringPointer(name)
      : name;
    const result = this.libs.symbols.UnregisterClassW(pointer, instance) !== 0;
    if (result) {
      for (const item of this.registeredClasses) {
        const address = Create.rawPointer(pointer);
        const sameName =
          typeof name !== 'string' && address > 0n && address <= 0xffffn
            ? BigInt(item.atom) === address
            : item.name.toLowerCase() ===
              (typeof name === 'string' ? name : this.readClassName(pointer))
                .toLowerCase();
        if (
          sameName &&
          Create.rawPointer(item.instance) === Create.rawPointer(instance)
        ) {
          item.owner.setRegistered(false);
          this.registeredClasses.delete(item);
        }
      }
    }
    return result;
  }

  private readClassName(pointer: LPCWSTR): string {
    if (!pointer) return '';
    const view = new Deno.UnsafePointerView(pointer);
    let result = '';
    for (let i = 0; i < 256; i++) {
      const code = view.getUint16(i * 2);
      if (!code) return result;
      result += String.fromCharCode(code);
    }
    return result;
  }

  public PostMessage(
    hWnd: HWND,
    message: UINT,
    wParam: WPARAM = 0n,
    lParam: LPARAM = 0n,
  ): boolean {
    return this.libs.symbols.PostMessageW(hWnd, message, wParam, lParam) !== 0;
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

  public RegisterClassEx(windowClass: LPWNDCLASSEXW | WindowClassEx): number {
    const pointer = windowClass instanceof WindowClassEx
      ? windowClass.pointer
      : windowClass;
    const owner = windowClass instanceof WindowClassEx
      ? windowClass
      : WindowClassEx.fromPointer(pointer);
    const atom = this.libs.symbols.RegisterClassExW(pointer);
    if (atom && owner) {
      owner.setRegistered(true);
      this.registeredClasses.add({
        owner,
        name: this.readClassName(owner.lpszClassName),
        atom,
        instance: owner.hInstance,
      });
    }
    return atom;
  }

  public SendMessage(
    hWnd: HWND,
    Msg: UINT,
    wParam: WPARAM = 0n,
    lParam: LPARAM = 0n,
  ): LRESULT {
    return Converter.LRESULT(this.libs.symbols.SendMessageW(
      hWnd,
      Msg,
      wParam,
      lParam,
    ));
  }

  public SetWindowText(
    hWnd: HWND,
    lpString: string,
  ): boolean {
    return Converter.BOOL(this.libs.symbols.SetWindowTextW(
      hWnd,
      Create.stringPointer(lpString),
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
