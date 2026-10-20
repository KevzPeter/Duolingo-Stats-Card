export interface CardDimensions {
  width?: string;
  height?: string;
}

export const CARD_DIMENSION_HELP = 'Use auto, 1–10000 pixels (for example 600 or 600px), or a percentage above 0 and up to 100%.';

// Only allow bounded SVG lengths, never arbitrary CSS or attribute content.
export function parseCardDimension(value: string | undefined): string | undefined {
  const dimension = value?.trim().toLowerCase();
  if (!dimension) return undefined;
  if (dimension === 'auto') return dimension;
  const match = /^(\d+(?:\.\d{1,2})?)(px|%)?$/.exec(dimension);
  if (!match) throw new Error(CARD_DIMENSION_HELP);
  const amount = Number(match[1]);
  const unit = match[2] || '';
  const maximum = unit === '%' ? 100 : 10000;
  if (!Number.isFinite(amount) || amount <= 0 || amount > maximum || (unit !== '%' && amount < 1)) {
    throw new Error(CARD_DIMENSION_HELP);
  }
  return `${amount}${unit}`;
}

export function cardDimensions(defaultWidth: number, defaultHeight: number, options: CardDimensions = {}) {
  const width = parseCardDimension(options.width);
  const height = parseCardDimension(options.height);
  if (!width && !height) return { width: defaultWidth, height: defaultHeight };
  // A single dimension scales proportionally instead of keeping the old size
  // on the other axis. The SVG's viewBox always retains its design dimensions.
  return { width: width || 'auto', height: height || 'auto' };
}

export function cardDimensionStyle(options: CardDimensions): string {
  const width = parseCardDimension(options.width);
  const height = parseCardDimension(options.height);
  if (!width && !height) return '';
  // Unitless lengths are SVG pixels, but CSS requires an explicit px unit.
  const cssLength = (value: string | undefined) => value ? (/\d$/.test(value) ? `${value}px` : value) : 'auto';
  return `width:${cssLength(width)};height:${cssLength(height)};`;
}
