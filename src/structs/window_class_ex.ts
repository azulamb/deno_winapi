import { Create } from '../create.ts';
import { callbackFunctions } from '../libs/user.ts';
import { Converter, winTypeSizes } from '../win_types.ts';

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
	protected callback?: Deno.UnsafeCallback<ForeignFunction<'pointer', ['pointer', 'u32', 'pointer', 'pointer']>>;

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

	get lpfnWndProc(): WNDPROC {
		return Create.pointer(this.dataView.getBigUint64(this.offset.lpfnWndProc, this.endian));
	}
	set lpfnWndProc(value) {
		if (!value) {
			if (this.callback) {
				this.callback.close();
			}
		}
		this.dataView.setBigUint64(this.offset.lpfnWndProc, Create.rawPointer(value), this.endian);
	}
	public setWindowProcedure(
		func: (
			hWnd: HWND,
			Msg: UINT,
			wParam: WPARAM,
			lParam: LPARAM,
		) => LRESULT,
	) {
		this.closeWindowProcedure();
		this.callback = new Deno.UnsafeCallback(
			callbackFunctions.DefWindowProcW,
			(
				hWnd: HWND,
				Msg: UINT,
				wParam: WPARAM,
				lParam: LPARAM,
			) => {
				return <LRESULT> func(Converter.HWND(hWnd), Msg, Converter.WPARAM(wParam), Converter.LPARAM(lParam));
			},
		);
		this.lpfnWndProc = this.callback.pointer;
		return this;
	}
	public closeWindowProcedure() {
		this.lpfnWndProc = null;
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
		return Create.pointer(this.dataView.getBigUint64(this.offset.hInstance, this.endian));
	}
	set hInstance(value) {
		this.dataView.setBigUint64(this.offset.hInstance, Create.rawPointer(value), this.endian);
	}

	get hIcon() {
		return Create.pointer(this.dataView.getBigUint64(this.offset.hIcon, this.endian));
	}
	set hIcon(value) {
		this.dataView.setBigUint64(this.offset.hIcon, Create.rawPointer(value), this.endian);
	}

	get hCursor() {
		return Create.pointer(this.dataView.getBigUint64(this.offset.hCursor, this.endian));
	}
	set hCursor(value) {
		this.dataView.setBigUint64(this.offset.hCursor, Create.rawPointer(value), this.endian);
	}

	get hbrBackground() {
		return Create.pointer(this.dataView.getBigUint64(this.offset.hbrBackground, this.endian));
	}
	set hbrBackground(value) {
		this.dataView.setBigUint64(this.offset.hbrBackground, Create.rawPointer(value), this.endian);
	}

	get lpszMenuName() {
		return Create.pointer(this.dataView.getBigUint64(this.offset.lpszMenuName, this.endian));
	}
	set lpszMenuName(value) {
		this.dataView.setBigUint64(this.offset.lpszMenuName, Create.rawPointer(value), this.endian);
	}
	public setMenuName(name: string) {
		this.lpszMenuName = Create.stringPointer(name);
	}

	get lpszClassName() {
		return Create.pointer(this.dataView.getBigUint64(this.offset.lpszClassName, this.endian));
	}
	set lpszClassName(value) {
		this.dataView.setBigUint64(this.offset.lpszClassName, Create.rawPointer(value), this.endian);
	}
	public setClassName(name: string) {
		this.lpszClassName = Create.stringPointer(name);
	}

	get hIconSm() {
		return Create.pointer(this.dataView.getBigUint64(this.offset.hIconSm, this.endian));
	}
	set hIconSm(value) {
		this.dataView.setBigUint64(this.offset.hIconSm, Create.rawPointer(value), this.endian);
	}
}
