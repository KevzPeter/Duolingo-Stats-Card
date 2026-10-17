import { ownerDashboard } from './owner-service';
import type { cardOptions } from './card-options';
import { generateSvg } from '../generateSVG';
import { ownerCard } from './card-metadata';
import { getDuoAnimationDataUri, fetchImageAsBase64 } from './card-assets';

export async function renderOwnerCard(options: ReturnType<typeof cardOptions>): Promise<string> {
  let data = await ownerDashboard();
  const [duoAnimationBase64, avatarBase64] = await Promise.all([
    getDuoAnimationDataUri(options.animation),
    options.showAvatar ? fetchImageAsBase64(data.profile.picture) : null,
  ]);
  // Recheck expiry after asset I/O before rendering any authenticated fields.
  data = await ownerDashboard();
  const { metadata, rows } = ownerCard(data);
  if (!options.showWeeklyXp) delete metadata.weeklyXp;
  if (!options.fields.includes('hearts')) delete metadata.hearts;
  if (!options.fields.includes('gems')) delete metadata.gems;
  metadata.duoAnimationBase64 = duoAnimationBase64;
  metadata.avatarBase64 = avatarBase64;
  return generateSvg(metadata, options.theme, options, rows);
}
