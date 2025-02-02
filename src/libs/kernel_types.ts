import type { SafeNativeTypeMap } from '../types.ts';

// TODO: Generate
export type CALLBACK_FUNCTIONS = {
  EnumResNameProcW: Deno.UnsafeCallbackDefinition<
    [
      SafeNativeTypeMap['HMODULE'],
      SafeNativeTypeMap['LPWSTR'],
      SafeNativeTypeMap['LPWSTR'],
      SafeNativeTypeMap['LONG_PTR'],
    ],
    SafeNativeTypeMap['BOOL']
  >;
  EnumResTypeProcW: Deno.UnsafeCallbackDefinition<
    [
      SafeNativeTypeMap['HMODULE'],
      SafeNativeTypeMap['LPWSTR'],
      SafeNativeTypeMap['LONG_PTR'],
    ],
    SafeNativeTypeMap['BOOL']
  >;
};

export type KERNEL_FUNKS = {
  EnumResourceNamesExW: {
    parameters: [
      SafeNativeTypeMap['HMODULE'],
      SafeNativeTypeMap['LPCWSTR'],
      SafeNativeTypeMap['ENUMRESNAMEPROCW'],
      SafeNativeTypeMap['LONG_PTR'],
      SafeNativeTypeMap['DWORD'],
      SafeNativeTypeMap['LANGID'],
    ];
    result: SafeNativeTypeMap['BOOL'];
  };
  EnumResourceTypesExW: {
    parameters: [
      SafeNativeTypeMap['HMODULE'],
      SafeNativeTypeMap['ENUMRESTYPEPROCW'],
      SafeNativeTypeMap['LONG_PTR'],
      SafeNativeTypeMap['DWORD'],
      SafeNativeTypeMap['LANGID'],
    ];
    result: SafeNativeTypeMap['BOOL'];
  };
  FreeConsole: {
    parameters: [];
    result: SafeNativeTypeMap['BOOL'];
  };
  GetLastError: {
    parameters: [];
    result: SafeNativeTypeMap['DWORD'];
  };
  GetModuleHandleW: {
    parameters: [
      SafeNativeTypeMap['LPCWSTR'],
    ];
    result: SafeNativeTypeMap['HMODULE'];
  };
};
