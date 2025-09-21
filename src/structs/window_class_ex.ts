import { Create } from '../support/create.ts';
import { callbackFunctions } from '../libs/user_callback.ts';
import type { CALLBACK_FUNCTIONS } from '../libs/user_types.ts';
import { Converter, WinTypes } from '../win_types.ts';
import type {
  DENO_CALLBACK_WNDPROC,
  HBRUSH,
  HCURSOR,
  HICON,
  HINSTANCE,
  HWND,
  int,
  LPARAM,
  LPCWSTR,
  LPWNDCLASSEXW,
  LRESULT,
  UINT,
  WindowsStruct,
  WNDPROC,
  WPARAM,
} from '../types.ts';

type WindowClassExProps = {
  cbSize: UINT;
  style: UINT;
  lpfnWndProc: WNDPROC;
  cbClsExtra: int;
  cbWndExtra: int;
  hInstance: HINSTANCE;
  hIcon: HICON;
  hCursor: HCURSOR;
  hbrBackground: HBRUSH;
  lpszMenuName: LPCWSTR;
  lpszClassName: LPCWSTR;
  hIconSm: HICON;
};

/**
 * WindowClassEx class represents a Windows WNDCLASSEXW structure.
 * https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/ns-winuser-wndclassexw
 */
export class WindowClassEx
  implements WindowsStruct<LPWNDCLASSEXW>, WindowClassExProps {
  protected offset: { [key in keyof WindowClassExProps]: number } = {
    cbSize: 0,
    style: 0,
    lpfnWndProc: 0,
    cbClsExtra: 0,
    cbWndExtra: 0,
    hInstance: 0,
    hIcon: 0,
    hCursor: 0,
    hbrBackground: 0,
    lpszMenuName: 0,
    lpszClassName: 0,
    hIconSm: 0,
  };
  protected size: { [key in keyof WindowClassExProps]: number } = {
    cbSize: WinTypes.UINT.size,
    style: WinTypes.UINT.size,
    lpfnWndProc: WinTypes.WNDPROC.size,
    cbClsExtra: WinTypes.int.size,
    cbWndExtra: WinTypes.int.size,
    hInstance: WinTypes.HINSTANCE.size,
    hIcon: WinTypes.HICON.size,
    hCursor: WinTypes.HCURSOR.size,
    hbrBackground: WinTypes.HBRUSH.size,
    lpszMenuName: WinTypes.LPCWSTR.size,
    lpszClassName: WinTypes.LPCWSTR.size,
    hIconSm: WinTypes.HICON.size,
  };
  public data: Uint8Array<ArrayBuffer>;
  protected dataView: DataView;
  protected dataPointer: LPWNDCLASSEXW;
  public endian: boolean;
  protected callback?: Deno.UnsafeCallback<
    CALLBACK_FUNCTIONS['DefWindowProcW']
  >;

  constructor() {
    const types: (keyof WindowClassExProps)[] = [
      'cbSize',
      'style',
      'lpfnWndProc',
      'cbClsExtra',
      'cbWndExtra',
      'hInstance',
      'hIcon',
      'hCursor',
      'hbrBackground',
      'lpszMenuName',
      'lpszClassName',
      'hIconSm',
    ];

    const size = types.reduce((offset, key) => {
      this.offset[key] = offset;
      return offset + this.size[key];
    }, 0);

    this.data = new Uint8Array(size);
    this.dataView = new DataView(this.data.buffer);
    this.dataPointer = Converter.LPWNDCLASSEXW(
      Deno.UnsafePointer.of(this.data),
    );

    // Set default endian.
    this.endian = new Uint8Array(Uint16Array.of(1).buffer)[0] === 1;

    // Default value.
    this.cbSize = size;
  }

  get pointer(): LPWNDCLASSEXW {
    return this.dataPointer;
  }

  get cbSize(): number {
    return this.dataView.getUint32(this.offset.cbSize, this.endian);
  }
  set cbSize(value: number) {
    this.dataView.setUint32(this.offset.cbSize, value, this.endian);
  }

  get style(): number {
    return this.dataView.getUint32(this.offset.style, this.endian);
  }
  set style(value: number) {
    this.dataView.setUint32(this.offset.style, value, this.endian);
  }

  get lpfnWndProc(): WNDPROC {
    return Create.pointer<DENO_CALLBACK_WNDPROC>(
      this.dataView.getBigUint64(this.offset.lpfnWndProc, this.endian),
    );
  }
  set lpfnWndProc(value: WNDPROC) {
    if (!value) {
      if (this.callback) {
        this.callback.close();
      }
    }
    this.dataView.setBigUint64(
      this.offset.lpfnWndProc,
      Create.rawPointer(value),
      this.endian,
    );
  }
  public setWindowProcedure(
    func: (
      hWnd: HWND,
      Msg: UINT,
      wParam: WPARAM,
      lParam: LPARAM,
    ) => LRESULT,
  ): this {
    this.closeWindowProcedure();
    this.callback = new Deno.UnsafeCallback(
      callbackFunctions.DefWindowProcW,
      (
        hWnd: HWND,
        Msg: UINT,
        wParam: WPARAM,
        lParam: LPARAM,
      ) => {
        return func(
          Converter.HWND(hWnd),
          Msg,
          Converter.WPARAM(wParam),
          Converter.LPARAM(lParam),
        );
      },
    );
    this.lpfnWndProc = this.callback.pointer;
    return this;
  }
  public closeWindowProcedure(): this {
    this.lpfnWndProc = null;
    return this;
  }

  get cbClsExtra(): number {
    return this.dataView.getInt32(this.offset.cbClsExtra, this.endian);
  }
  set cbClsExtra(value: number) {
    this.dataView.setInt32(this.offset.cbClsExtra, value, this.endian);
  }

  get cbWndExtra(): number {
    return this.dataView.getInt32(this.offset.cbWndExtra, this.endian);
  }
  set cbWndExtra(value: number) {
    this.dataView.setInt32(this.offset.cbWndExtra, value, this.endian);
  }

  get hInstance(): HINSTANCE {
    return Create.pointer(
      this.dataView.getBigUint64(this.offset.hInstance, this.endian),
    );
  }
  set hInstance(value: HINSTANCE) {
    this.dataView.setBigUint64(
      this.offset.hInstance,
      Create.rawPointer(value),
      this.endian,
    );
  }

  get hIcon(): HICON {
    return Create.pointer(
      this.dataView.getBigUint64(this.offset.hIcon, this.endian),
    );
  }
  set hIcon(value: HICON) {
    this.dataView.setBigUint64(
      this.offset.hIcon,
      Create.rawPointer(value),
      this.endian,
    );
  }

  get hIconSm(): HICON {
    return Create.pointer(
      this.dataView.getBigUint64(this.offset.hIconSm, this.endian),
    );
  }
  set hIconSm(value: HICON) {
    this.dataView.setBigUint64(
      this.offset.hIconSm,
      Create.rawPointer(value),
      this.endian,
    );
  }

  get hCursor(): HCURSOR {
    return Create.pointer(
      this.dataView.getBigUint64(this.offset.hCursor, this.endian),
    );
  }
  set hCursor(value: HCURSOR) {
    this.dataView.setBigUint64(
      this.offset.hCursor,
      Create.rawPointer(value),
      this.endian,
    );
  }

  get hbrBackground(): HBRUSH {
    return Create.pointer(
      this.dataView.getBigUint64(this.offset.hbrBackground, this.endian),
    );
  }
  set hbrBackground(value: HBRUSH) {
    this.dataView.setBigUint64(
      this.offset.hbrBackground,
      Create.rawPointer(value),
      this.endian,
    );
  }

  get lpszMenuName(): LPCWSTR {
    return Create.pointer(
      this.dataView.getBigUint64(this.offset.lpszMenuName, this.endian),
    );
  }
  set lpszMenuName(value: LPCWSTR) {
    this.dataView.setBigUint64(
      this.offset.lpszMenuName,
      Create.rawPointer(value),
      this.endian,
    );
  }
  public setMenuName(name: string) {
    this.lpszMenuName = Create.stringPointer(name);
  }

  get lpszClassName(): LPCWSTR {
    return Create.pointer(
      this.dataView.getBigUint64(this.offset.lpszClassName, this.endian),
    );
  }
  set lpszClassName(value: LPCWSTR) {
    this.dataView.setBigUint64(
      this.offset.lpszClassName,
      Create.rawPointer(value),
      this.endian,
    );
  }
  public setClassName(name: string) {
    this.lpszClassName = Create.stringPointer(name);
  }
}
