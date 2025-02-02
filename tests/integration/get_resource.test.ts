import * as test from '../_setup.ts';
import { winApi } from '../../mod.ts';
import type { HMODULE, LONG_PTR, LPCWSTR, LPWSTR } from '../../mod.ts';

function GetHasResourceTypes(hModule: HMODULE) {
  return new Promise<LPWSTR[]>((resolve) => {
    const resourceTypes: LPWSTR[] = [];
    const timer = (() => {
      let timer = 0;

      return () => {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          resolve(resourceTypes);
          if (result.callback) {
            result.callback.close();
          }
        }, 10);
      };
    })();

    timer();

    const result = winApi.kernel.EnumResourceTypesEx(
      hModule,
      (_hModule: HMODULE, lpType: LPWSTR, _lParam: LONG_PTR) => {
        resourceTypes.push(lpType);
        timer();
        return 1;
      },
    );
  });
}

function GetResourceList(hModule: HMODULE, resourceType: bigint | LPCWSTR) {
  return new Promise<LPWSTR[]>((resolve) => {
    const resourceTypes: LPWSTR[] = [];
    const timer = (() => {
      let timer = 0;

      return () => {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          resolve(resourceTypes);
          if (result.callback) {
            result.callback.close();
          }
        }, 10);
      };
    })();

    timer();

    if (typeof resourceType === 'bigint') {
      resourceType = Deno.UnsafePointer.create(resourceType);
    }

    const result = winApi.kernel.EnumResourceNamesEx(
      hModule,
      resourceType,
      (
        _hModule: HMODULE,
        _lpType: LPWSTR,
        lpName: LPWSTR,
        _lParam: LONG_PTR,
      ) => {
        resourceTypes.push(lpName);
        timer();
        return 1;
      },
    );
  });
}

Deno.test(
  'Check exe resources',
  async () => {
    const hModule = winApi.kernel.GetModuleHandle();
    const resourceTypes = await GetHasResourceTypes(hModule);

    test.assertEquals(
      resourceTypes.map((pointer) => {
        return BigInt(Deno.UnsafePointer.value(pointer));
      }),
      [3n, 14n, 16n],
      'Values do not match: Resource types.',
    );

    const expectResources: { [keys: string]: bigint[] } = {
      '3': [1n, 2n, 3n, 4n, 5n, 6n],
      '14': [1n],
      '16': [1n],
    };

    for (const resourceType of resourceTypes) {
      const resourceTypeStr = Deno.UnsafePointer.value(resourceType) + '';
      const resources = await GetResourceList(hModule, resourceType);
      test.assertEquals(
        resources.map((pointer) => {
          return BigInt(Deno.UnsafePointer.value(pointer));
        }),
        expectResources[resourceTypeStr],
        'Values do not match: Resource types.',
      );
    }
  },
);
