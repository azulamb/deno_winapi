import { winApi } from '../mod.ts';

// Create WindowClassEx
const windowClassEx = winApi.create.windowClassEx();
windowClassEx.style = winApi.create.classStyle({
	CS_VREDRAW: true,
	CS_HREDRAW: true,
});
windowClassEx.setClassName('AppWindow');
windowClassEx.setWindowProcedure((hWnd: HWND, Msg: UINT, wParam: WPARAM, lParam: LPARAM) => {
	switch (Msg) {
		case winApi.messageType.WM_CREATE:
			console.log('Create');
			break;
		case winApi.messageType.WM_DESTROY:
			console.log('Destroy');
			winApi.user.PostQuitMessage(0);
			break;
	}
	return winApi.user.DefWindowProc(hWnd, Msg, wParam, lParam);
});

// Register WindowClassEx
const result = winApi.user.RegisterClassEx(windowClassEx.pointer);
if (!result) {
	throw new Error(`Failure RegisterClassEx. [GetLastError=${winApi.kernel.GetLastError()}]`);
}

// CreateWindowEx
const windowHandle = winApi.user.CreateWindowEx(
	0,
	windowClassEx.lpszClassName,
	winApi.create.stringPointer('🪟test🦕'),
	winApi.create.windowStyle({
		WS_VISIBLE: true,
		WS_OVERLAPPEDWINDOW: true,
	}),
	winApi.constant.CW_USEDEFAULT,
	winApi.constant.CW_USEDEFAULT,
	winApi.constant.CW_USEDEFAULT,
	winApi.constant.CW_USEDEFAULT,
);

if (!windowHandle) {
	throw new Error(`Failure CreateWindowEx. [GetLastError=${winApi.kernel.GetLastError()}]`);
}

if (!winApi.kernel.FreeConsole()) {
	Deno.exit(0);
}

// Message loop.
const message = winApi.create.message();
while (winApi.user.GetMessage(message.pointer, windowHandle, 0, 0)) {
	winApi.user.DispatchMessage(message.pointer);
}

Deno.exit(Number(message.wParam));
