import { Create } from '../support/create.ts';
import { Converter } from '../win_types.ts';
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
  /** Windows x64 MSG layout, including the padding after message. */
  public static readonly SIZE = 48;
  public static readonly OFFSETS = {
    hwnd: 0,
    message: 8,
    wParam: 16,
    lParam: 24,
    time: 32,
    pt: 36,
    lPrivate: 44,
  } as const;
  protected readonly offset = Message.OFFSETS;
  public data: Uint8Array<ArrayBuffer>;
  protected dataView: DataView;
  protected dataPointer: LPMSG;
  public endian?: boolean;

  constructor() {
    this.data = new Uint8Array(Message.SIZE);
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
    return this.dataView.getUint32(this.offset.message, this.endian);
  }
  set message(value: number) {
    this.dataView.setUint32(this.offset.message, value, this.endian);
  }

  get wParam(): WPARAM {
    return this.dataView.getBigUint64(this.offset.wParam, this.endian);
  }
  set wParam(value: WPARAM) {
    this.dataView.setBigUint64(this.offset.wParam, value, this.endian);
  }

  get lParam(): LPARAM {
    return this.dataView.getBigInt64(this.offset.lParam, this.endian);
  }
  set lParam(value: LPARAM) {
    this.dataView.setBigInt64(this.offset.lParam, value, this.endian);
  }

  get time(): number {
    return this.dataView.getUint32(this.offset.time, this.endian);
  }
  set time(value: number) {
    this.dataView.setUint32(this.offset.time, value, this.endian);
  }

  get pt(): { x: number; y: number } {
    const x = this.dataView.getInt32(this.offset.pt, this.endian);
    const y = this.dataView.getInt32(
      this.offset.pt + 4,
      this.endian,
    );
    return { x: x, y: y };
  }
  set pt(value: { x: number; y: number }) {
    this.dataView.setInt32(this.offset.pt, value.x, this.endian);
    this.dataView.setInt32(
      this.offset.pt + 4,
      value.y,
      this.endian,
    );
  }

  get lPrivate(): number {
    return this.dataView.getUint32(this.offset.lPrivate, this.endian);
  }
  set lPrivate(value: number) {
    this.dataView.setUint32(this.offset.lPrivate, value, this.endian);
  }
}
