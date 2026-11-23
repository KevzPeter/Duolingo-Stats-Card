// Duolingo Score describes course content, not a certified proficiency level.
// https://blog.duolingo.com/duolingo-score/
export function cefrFromScore(score: number): { level: string; detail: string } | null {
  if (!Number.isInteger(score) || score < 0 || score > 160) return null;
  if (score < 10) return { level: 'A1', detail: 'very early A1' };
  if (score < 20) return { level: 'A1', detail: 'early A1' };
  if (score < 30) return { level: 'A1', detail: 'high A1' };
  if (score < 60) return { level: 'A2', detail: 'A2' };
  if (score < 80) return { level: 'B1', detail: 'early B1' };
  if (score < 100) return { level: 'B1', detail: 'high B1' };
  if (score < 115) return { level: 'B2', detail: 'early B2' };
  if (score < 130) return { level: 'B2', detail: 'high B2' };
  return { level: 'C1–C2', detail: 'C1–C2' };
}
