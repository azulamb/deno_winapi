import * as test from '../_setup.ts';
import { winApi } from '../../mod.ts';
import type { HMODULE, LONG_PTR, LPCWSTR, LPWSTR } from '../../mod.ts';

function GetHasResourceTypes(hModule: HMODULE): LPWSTR[] {
  const types: LPWSTR[] = [];
  winApi.kernel.EnumResourceTypesEx(
    hModule,
    (_module, type, _param: LONG_PTR) => {
      types.push(type);
      return 1;
    },
  );
  return types;
}

function GetResourceList(hModule: HMODULE, type: bigint | LPCWSTR): LPWSTR[] {
  const names: LPWSTR[] = [];
  winApi.kernel.EnumResourceNamesEx(
    hModule,
    typeof type === 'bigint' ? Deno.UnsafePointer.create(type) : type,
    (_module, _type, name, _param: LONG_PTR) => {
      names.push(name);
      return 1;
    },
  );
  return names;
}

Deno.test(
  'Check exe resources',
  () => {
    const hModule = winApi.kernel.GetModuleHandle();
    const resourceTypes = GetHasResourceTypes(hModule);

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
      const resources = GetResourceList(hModule, resourceType);
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
