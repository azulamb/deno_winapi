import * as test from '../_setup.ts';
import { winApi } from '../../mod.ts';

Deno.test('GetModuleFileName', () => {
  const result = winApi.kernel.GetModuleFileName();

  test.assert(result !== null, 'Module file name should not be null');
  test.assert(result.match(/\\deno\.exe$/), 'Invalid module file name.');
});
