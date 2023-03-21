import { Converter, winTypeSizes } from '../win_types.ts';

interface TagPointProps {
	readonly x: bigint;
	readonly y: bigint;
}

interface MessageProps {
	hwnd: Deno.PointerValue; //HWND
	message: number; //UINT
	wParam: Deno.PointerValue; //WPARAM
	lParam: Deno.PointerValue; //LPARAM
	time: number; // DWORD
	pt: TagPointProps; // POINT TagPointProps
	lPrivate: number; // DWORD
}

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
		hwnd: winTypeSizes.HWND,
		message: winTypeSizes.UINT,
		wParam: winTypeSizes.WPARAM,
		lParam: winTypeSizes.LPARAM,
		time: winTypeSizes.DWORD,
		pt: winTypeSizes.LONG * 2, // POINT TagPointProps
		lPrivate: winTypeSizes.DWORD,
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

	get hwnd() {
		return this.dataView.getBigUint64(this.offset.hwnd, this.endian);
	}
	set hwnd(value) {
		this.dataView.setBigUint64(this.offset.hwnd, value, this.endian);
	}

	get message() {
		return this.dataView.getInt32(this.offset.message, this.endian);
	}
	set message(value) {
		this.dataView.setInt32(this.offset.message, value, this.endian);
	}

	get wParam() {
		return this.dataView.getBigUint64(this.offset.wParam, this.endian);
	}
	set wParam(value) {
		this.dataView.setBigUint64(this.offset.wParam, value, this.endian);
	}

	get lParam() {
		return this.dataView.getBigUint64(this.offset.lParam, this.endian);
	}
	set lParam(value) {
		this.dataView.setBigUint64(this.offset.lParam, value, this.endian);
	}

	get time() {
		return this.dataView.getInt32(this.offset.time, this.endian);
	}
	set time(value) {
		this.dataView.setInt32(this.offset.time, value, this.endian);
	}

	get pt() {
		const x = this.dataView.getBigInt64(this.offset.pt, this.endian);
		const y = this.dataView.getBigInt64(this.offset.pt + winTypeSizes.LONG, this.endian);
		return { x: x, y: y };
	}
	set pt(value) {
		this.dataView.setBigInt64(this.offset.pt, value.x, this.endian);
		this.dataView.setBigInt64(this.offset.pt + winTypeSizes.LONG, value.y, this.endian);
	}

	get lPrivate() {
		return this.dataView.getInt32(this.offset.lPrivate, this.endian);
	}
	set lPrivate(value) {
		this.dataView.setInt32(this.offset.lPrivate, value, this.endian);
	}
}
