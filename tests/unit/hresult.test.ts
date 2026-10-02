import * as test from '../_setup.ts';
import { hresultToString } from '../../mod.ts';

Deno.test('S_OK', () => {
  const result = hresultToString(0);
  test.assert(result === 'S_OK', 'Expected S_OK');
});

Deno.test('ERROR_ACCESS_DENIED', () => {
  const result = hresultToString(5);
  test.assert(result === 'ERROR_ACCESS_DENIED', 'Expected ERROR_ACCESS_DENIED');
});

Deno.test('ERROR_PATH_NOT_FOUND', () => {
  const result = hresultToString(-2147024893);
  test.assert(
    result === 'ERROR_PATH_NOT_FOUND',
    'Expected ERROR_PATH_NOT_FOUND',
  );
  const result2 = hresultToString(0x80070003);
  test.assert(
    result2 === 'ERROR_PATH_NOT_FOUND',
    'Expected ERROR_PATH_NOT_FOUND',
  );
});

Deno.test('HRESULT hexadecimal case and unknown diagnostic', () => {
  test.assertEquals(hresultToString(0x8000ffff), 'E_UNEXPECTED');
  test.assertEquals(hresultToString(-2147024882), 'E_OUTOFMEMORY');
  test.assertEquals(hresultToString(0x8123abcd), 'UNKNOWN_ERROR (0x8123ABCD)');
});
