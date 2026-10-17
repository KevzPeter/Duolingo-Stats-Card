import React from 'react'
import ReactDOMServer from 'react-dom/server';
import SvgWidget from '../components/SvgWidget';
import { allStyles } from '../styles/svg';
import { CardRow, Metadata, DisplayOptions } from './models';
import themes from './themes.json';
import { cardHeight, CARD_WIDTH, CARD_SCALE } from './animation-layout';
/**
 * Returns SVG as a string.
 */
const DEFAULT_OPTIONS: DisplayOptions = { showAvatar: true, showJoined: true };

export function generateSvg(metadata: Metadata, theme: string, options: DisplayOptions = DEFAULT_OPTIONS, rows: CardRow[] = []): string {
    const baseHeight = cardHeight(metadata.weeklyXp !== undefined, !!(options.showScores && metadata.languageScores?.length), metadata.tokenExpired);
    const height = baseHeight + (rows.length ? rows.length * 25 + 20 : 0);
    const width = CARD_WIDTH;
    const svgBody = ReactDOMServer.renderToStaticMarkup(
        <svg width={width} height={baseHeight} viewBox={`0 0 ${width} ${baseHeight}`} aria-label="Duolingo Stats Card">
            <SvgWidget response={metadata} theme={theme} options={options} />
        </svg>
    );
    const colors = themes[theme as keyof typeof themes];
    const extraBody = rows.length ? ReactDOMServer.renderToStaticMarkup(
        <g transform={`translate(0 ${baseHeight})`}>
            <rect width={width} height={height - baseHeight} rx={10} fill={colors?.background?.startsWith('#') ? colors.background : '#17351f'} />
            {rows.map((row, index) => <g key={row.label} transform={`translate(14 ${25 + index * 25})`} fontSize="12" fill={colors?.colorPrimary || '#ffffff'}>
                <text><title>{row.label}</title>{row.label.length > 26 ? row.label.slice(0, 25) + '…' : row.label}</text>
                <text x="392" textAnchor="end"><title>{row.value}</title>{row.value.length > 28 ? row.value.slice(0, 27) + '…' : row.value}</text>
            </g>)}
        </g>
    ) : '';

    return `
    <svg
        width="${width * CARD_SCALE}"
        height="${Number((height * CARD_SCALE).toFixed(1))}"
        viewBox="0 0 ${width} ${height}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Duolingo Stats Card"
        font-family="Segoe UI, sans-serif"
    >
    <style>${allStyles}</style>
    ${svgBody}
    ${extraBody}
    </svg>`;
}
