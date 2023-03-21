import { Create } from '../create.ts';
import { callbackFunctions } from '../libs/user.ts';
import { Converter, winTypeSizes } from '../win_types.ts';

type WindowClassExProps = {
	cbSize: number;
	style: number;
	lpfnWndProc: Deno.PointerValue;
	cbClsExtra: number;
	cbWndExtra: number;
	hInstance: Deno.PointerValue;
	hIcon: Deno.PointerValue;
	hCursor: Deno.PointerValue;
	hbrBackground: Deno.PointerValue;
	lpszMenuName: Deno.PointerValue;
	lpszClassName: Deno.PointerValue;
	hIconSm: Deno.PointerValue;
};

/**
 * https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/ns-winuser-wndclassexw
 */
export class WindowClassEx implements WindowsStruct<LPWNDCLASSEXW>, WindowClassExProps {
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
		cbSize: winTypeSizes.UINT,
		style: winTypeSizes.UINT,
		lpfnWndProc: winTypeSizes.WNDPROC,
		cbClsExtra: winTypeSizes.int,
		cbWndExtra: winTypeSizes.int,
		hInstance: winTypeSizes.HINSTANCE,
		hIcon: winTypeSizes.HICON,
		hCursor: winTypeSizes.HCURSOR,
		hbrBackground: winTypeSizes.HBRUSH,
		lpszMenuName: winTypeSizes.LPCWSTR,
		lpszClassName: winTypeSizes.LPCWSTR,
		hIconSm: winTypeSizes.HICON,
	};
	public data: Uint8Array;
	protected dataView: DataView;
	protected dataPointer: LPWNDCLASSEXW;
	public endian?: boolean;

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
		this.dataPointer = Converter.LPWNDCLASSEXW(Deno.UnsafePointer.of(this.data));

		// Set default endian.
		this.endian = new Uint8Array(Uint16Array.of(1).buffer)[0] === 1;

		// Default value.
		this.cbSize = size;
	}

	get pointer(): LPWNDCLASSEXW {
		return this.dataPointer;
	}

	get cbSize() {
		return this.dataView.getUint32(this.offset.cbSize, this.endian);
	}
	set cbSize(value: number) {
		this.dataView.setUint32(this.offset.cbSize, value, this.endian);
	}

	get style() {
		return this.dataView.getUint32(this.offset.style, this.endian);
	}
	set style(value) {
		this.dataView.setUint32(this.offset.style, value, this.endian);
	}

	get lpfnWndProc() {
		return this.dataView.getBigUint64(this.offset.lpfnWndProc, this.endian);
	}
	set lpfnWndProc(value) {
		this.dataView.setBigUint64(this.offset.lpfnWndProc, value, this.endian);
	}
	public setWindowProcedure(
		func: (
			hWnd: HWND,
			Msg: number,
			wParam: WPARAM,
			lParam: LPARAM,
		) => LRESULT,
	) {
		const callback = new Deno.UnsafeCallback(
			callbackFunctions.DefWindowProcW,
			(
				hWnd: Deno.PointerValue,
				Msg: number,
				wParam: Deno.PointerValue,
				lParam: Deno.PointerValue,
			) => {
				return <LRESULT> func(Converter.HWND(hWnd), Msg, Converter.WPARAM(wParam), Converter.LPARAM(lParam));
			},
		);
		this.lpfnWndProc = BigInt(callback.pointer);
		return this;
	}

	get cbClsExtra() {
		return this.dataView.getInt32(this.offset.cbClsExtra, this.endian);
	}
	set cbClsExtra(value) {
		this.dataView.setInt32(this.offset.cbClsExtra, value, this.endian);
	}

	get cbWndExtra() {
		return this.dataView.getInt32(this.offset.cbWndExtra, this.endian);
	}
	set cbWndExtra(value) {
		this.dataView.setInt32(this.offset.cbWndExtra, value, this.endian);
	}

	get hInstance() {
		return this.dataView.getBigUint64(this.offset.hInstance, this.endian);
	}
	set hInstance(value) {
		this.dataView.setBigUint64(this.offset.hInstance, value, this.endian);
	}

	get hIcon() {
		return this.dataView.getBigUint64(this.offset.hIcon, this.endian);
	}
	set hIcon(value) {
		this.dataView.setBigUint64(this.offset.hIcon, value, this.endian);
	}

	get hCursor() {
		return this.dataView.getBigUint64(this.offset.hCursor, this.endian);
	}
	set hCursor(value) {
		this.dataView.setBigUint64(this.offset.hCursor, value, this.endian);
	}

	get hbrBackground() {
		return this.dataView.getBigUint64(this.offset.hbrBackground, this.endian);
	}
	set hbrBackground(value) {
		this.dataView.setBigUint64(this.offset.hbrBackground, value, this.endian);
	}

	get lpszMenuName() {
		return this.dataView.getBigUint64(this.offset.lpszMenuName, this.endian);
	}
	set lpszMenuName(value) {
		this.dataView.setBigUint64(this.offset.lpszMenuName, BigInt(value), this.endian);
	}
	public setMenuName(name: string) {
		const stringPtr = Create.stringPointer(name);
		this.lpszMenuName = BigInt(stringPtr);
	}

	get lpszClassName() {
		return this.dataView.getBigUint64(this.offset.lpszClassName, this.endian);
	}
	set lpszClassName(value) {
		this.dataView.setBigUint64(this.offset.lpszClassName, BigInt(value), this.endian);
	}
	public setClassName(name: string) {
		const stringPtr = Create.stringPointer(name);
		this.lpszClassName = BigInt(stringPtr);
	}

	get hIconSm() {
		return this.dataView.getBigUint64(this.offset.hIconSm, this.endian);
	}
	set hIconSm(value) {
		this.dataView.setBigUint64(this.offset.hIconSm, value, this.endian);
	}
}
