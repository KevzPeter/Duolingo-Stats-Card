import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { cefrFromScore } from '../cefr.ts';

test('maps Duolingo Score boundaries to CEFR course-content levels', () => {
  for (const [score, level, detail] of [
    [0, 'A1', 'very early A1'], [9, 'A1', 'very early A1'],
    [10, 'A1', 'early A1'], [19, 'A1', 'early A1'],
    [20, 'A1', 'high A1'], [29, 'A1', 'high A1'],
    [30, 'A2', 'A2'], [59, 'A2', 'A2'],
    [60, 'B1', 'early B1'], [79, 'B1', 'early B1'],
    [80, 'B1', 'high B1'], [99, 'B1', 'high B1'],
    [100, 'B2', 'early B2'], [114, 'B2', 'early B2'],
    [115, 'B2', 'high B2'], [129, 'B2', 'high B2'],
    [130, 'C1–C2', 'C1–C2'], [160, 'C1–C2', 'C1–C2'],
  ]) {
    assert.deepEqual(cefrFromScore(score), { level, detail });
  }
});

test('rejects scores outside the documented scale', () => {
  for (const score of [-1, 161, 1.5, NaN, Infinity]) assert.equal(cefrFromScore(score), null);
});
