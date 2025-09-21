// TODO: Create list.
const HRESULT: Record<string, string> = {
  '00000000': 'S_OK', // 0
  '00000005': 'ERROR_ACCESS_DENIED',
  '80004001': 'E_NOTIMPL', // -2147467263
  '80004002': 'E_NOINTERFACE', // -2147467262
  '80004003': 'E_POINTER', // -2147467261
  '80004004': 'E_ABORT', // -2147467260
  '80004005': 'E_FAIL', // -2147467259
  '8000FFFF': 'E_UNEXPECTED', // -2147352577
  '80070005': 'E_ACCESSDENIED', // -2147024891
  '80070006': 'E_HANDLE', // -2147024890
  '8007000E': 'E_OUTOFMEMORY', // -2147024882
  '80070057': 'E_INVALIDARG', // -2147024809
  '80070003': 'ERROR_PATH_NOT_FOUND', // -2147024893
};

export function hresultToString(hresult: number): string {
  return HRESULT[new Uint32Array([hresult])[0].toString(16).padStart(8, '0')] ||
    'UNKNOWN_ERROR';
}
