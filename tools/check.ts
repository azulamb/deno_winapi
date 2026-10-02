import * as checker from '@azulamb/checker';
import data from '../deno.json' with { type: 'json' };

// Validate the public API first, even when version checks would reject a release.
await checker.check({
  name: 'Lint and JSR public API check',
  command: ['deno', 'task', 'check:publish'],
  after: (result) => {
    if (result.code !== 0) {
      return Promise.reject(new Error(result.stderr || result.stdout));
    }
    console.log(result.stdout);
    return Promise.resolve();
  },
});

await checker.check(
  checker.createDenoVersionChecker(),
  checker.createVersionChecker(data.version),
);
