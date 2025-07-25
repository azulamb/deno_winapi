import { Create } from '../support/create.ts';
import { Converter, WinTypes } from '../win_types.ts';
import type {
  DWORD,
  HWND,
  LPARAM,
  LPMSG,
  POINT,
  UINT,
  WindowsStruct,
  WPARAM,
} from '../types.ts';

interface MessageProps {
  hwnd: HWND;
  message: UINT;
  wParam: WPARAM;
  lParam: LPARAM;
  time: DWORD;
  pt: POINT;
  lPrivate: DWORD;
}

/**
 * Message class represents a Windows message structure.
 */
export class Message implements WindowsStruct<LPMSG>, MessageProps {
  protected offset: { [key in keyof MessageProps]: number } = {
    hwnd: 0,
    message: 0,
    wParam: 0,
    lParam: 0,
    time: 0,
    pt: 0,
    lPrivate: 0,
  };
  protected size: { [key in keyof MessageProps]: number } = {
    hwnd: WinTypes.HWND.size,
    message: WinTypes.UINT.size,
    wParam: WinTypes.WPARAM.size,
    lParam: WinTypes.LPARAM.size,
    time: WinTypes.DWORD.size,
    pt: WinTypes.LONG.size * 2, // POINT TagPointProps
    lPrivate: WinTypes.DWORD.size,
  };
  public data: Uint8Array;
  protected dataView: DataView;
  protected dataPointer: LPMSG;
  public endian?: boolean;

  constructor() {
    const types: (keyof MessageProps)[] = [
      'hwnd',
      'message',
      'wParam',
      'lParam',
      'time',
      'pt',
      'lPrivate',
    ];

    const size = types.reduce((offset, key) => {
      this.offset[key] = offset;
      return offset + this.size[key];
    }, 0);

    this.data = new Uint8Array(size);
    this.dataView = new DataView(this.data.buffer);
    this.dataPointer = Converter.LPMSG(Deno.UnsafePointer.of(this.data));

    // Set default endian.
    this.endian = new Uint8Array(Uint16Array.of(1).buffer)[0] === 1;
  }

  get pointer(): LPMSG {
    return this.dataPointer;
  }

  get hwnd(): HWND {
    return Create.pointer(
      this.dataView.getBigUint64(this.offset.hwnd, this.endian),
    );
  }
  set hwnd(value: HWND) {
    this.dataView.setBigUint64(
      this.offset.hwnd,
      Create.rawPointer(value),
      this.endian,
    );
  }

  get message(): number {
    return this.dataView.getInt32(this.offset.message, this.endian);
  }
  set message(value: number) {
    this.dataView.setInt32(this.offset.message, value, this.endian);
  }

  get wParam(): WPARAM {
    return Create.pointer(
      this.dataView.getBigUint64(this.offset.wParam, this.endian),
    );
  }
  set wParam(value: WPARAM) {
    this.dataView.setBigUint64(
      this.offset.wParam,
      Create.rawPointer(value),
      this.endian,
    );
  }

  get lParam(): LPARAM {
    return Create.pointer(
      this.dataView.getBigUint64(this.offset.lParam, this.endian),
    );
  }
  set lParam(value: LPARAM) {
    this.dataView.setBigUint64(
      this.offset.lParam,
      Create.rawPointer(value),
      this.endian,
    );
  }

  get time(): number {
    return this.dataView.getInt32(this.offset.time, this.endian);
  }
  set time(value: number) {
    this.dataView.setInt32(this.offset.time, value, this.endian);
  }

  get pt(): { x: bigint; y: bigint } {
    const x = this.dataView.getBigInt64(this.offset.pt, this.endian);
    const y = this.dataView.getBigInt64(
      this.offset.pt + WinTypes.LONG.size,
      this.endian,
    );
    return { x: x, y: y };
  }
  set pt(value: { x: bigint; y: bigint }) {
    this.dataView.setBigInt64(this.offset.pt, value.x, this.endian);
    this.dataView.setBigInt64(
      this.offset.pt + WinTypes.LONG.size,
      value.y,
      this.endian,
    );
  }

  get lPrivate(): number {
    return this.dataView.getInt32(this.offset.lPrivate, this.endian);
  }
  set lPrivate(value: number) {
    this.dataView.setInt32(this.offset.lPrivate, value, this.endian);
  }
}
