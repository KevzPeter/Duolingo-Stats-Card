import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import ts from 'typescript';

// Compile this dependency-free helper in memory; no test runner dependency or
// generated build files are needed alongside the Next.js application.
const source = readFileSync(new URL('../utils/card-dimensions.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
});
const { parseCardDimension, cardDimensions, cardDimensionStyle } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);

test('existing embeds keep their content-dependent intrinsic dimensions', () => {
  assert.deepEqual(cardDimensions(420, 202), { width: 420, height: 202 });
  assert.deepEqual(cardDimensions(420, 447), { width: 420, height: 447 });
});

test('a responsive card fills the container and keeps automatic height', () => {
  assert.deepEqual(cardDimensions(420, 447, { width: '100%', height: 'auto' }), { width: '100%', height: 'auto' });
});

test('a single dimension leaves the other axis proportional', () => {
  assert.deepEqual(cardDimensions(420, 447, { width: '600' }), { width: '600', height: 'auto' });
  assert.deepEqual(cardDimensions(420, 447, { height: '300px' }), { width: 'auto', height: '300px' });
});

test('explicit width and height remain available together', () => {
  assert.deepEqual(cardDimensions(420, 447, { width: '600px', height: '300' }), { width: '600px', height: '300' });
});

test('accepted sizes are normalized before entering markup', () => {
  for (const [input, expected] of [[' AUTO ', 'auto'], [' 0600PX ', '600px'], ['75.50%', '75.5%'], ['0.01%', '0.01%'], ['1', '1'], ['10000px', '10000px']]) {
    assert.equal(parseCardDimension(input), expected);
  }
  assert.equal(parseCardDimension(undefined), undefined);
  assert.equal(parseCardDimension('  '), undefined);
});

test('invalid sizes cannot inject attributes, CSS, or unbounded dimensions', () => {
  for (const input of ['0', '-1', '0px', '0.5px', '10001', '101%', 'Infinity', 'NaN', '1e3', '.5%', '1.234px', 'calc(100% - 1px)', '10em', '100%;color:red', 'auto" onload="alert(1)', '<script>', '1\npx']) {
    assert.throws(() => parseCardDimension(input), undefined, input);
  }
});

test('the renderer sizing helper rejects unvalidated direct-call input too', () => {
  assert.throws(() => cardDimensions(420, 447, { width: '" onload="alert(1)' }));
  assert.throws(() => cardDimensions(420, 447, { height: '999999999999999999999' }));
});

test('HTML embeds use valid CSS units as well as SVG dimensions', () => {
  assert.equal(cardDimensionStyle({ width: '600' }), 'width:600px;height:auto;');
  assert.equal(cardDimensionStyle({ height: '300px' }), 'width:auto;height:300px;');
  assert.equal(cardDimensionStyle({ width: '100%', height: 'auto' }), 'width:100%;height:auto;');
  assert.equal(cardDimensionStyle({}), '');
  assert.throws(() => cardDimensionStyle({ width: '100%;color:red' }));
});
