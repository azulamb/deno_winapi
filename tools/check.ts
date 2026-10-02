import * as checker from '@azulamb/checker';
import data from '../deno.json' with { type: 'json' };

await checker.check(
  checker.createDenoVersionChecker(),
  checker.createVersionChecker(data.version),
  checker.createJsrPublishChecker(),
);
