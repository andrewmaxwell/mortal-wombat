import {expect, test} from 'vitest';
import {scriptSyntaxError} from './scriptTemplate';

test('scriptSyntaxError accepts valid scripts', () => {
  expect(scriptSyntaxError('')).toBeUndefined();
  expect(
    scriptSyntaxError("say('hi'); choice('ok', () => setHealth(100));"),
  ).toBeUndefined();
});

test('scriptSyntaxError reports syntax errors', () => {
  expect(scriptSyntaxError('[say poop on you]')).toMatch(/^SyntaxError/);
});

test('scriptSyntaxError catches redeclaring a helper, as the game would', () => {
  expect(scriptSyntaxError('const say = 1;')).toMatch(/^SyntaxError/);
});
