import * as checker from 'jsr:@azulamb/checker';
import data from '../deno.json' with { type: 'json' };

await checker.check(
  checker.createDenoVersionChecker(),
  checker.createVersionChecker(data.version),
  checker.createJsrPublishChecker(),
);
