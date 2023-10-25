import React from 'react'
import ReactDOMServer from 'react-dom/server';
import SvgWidget from '../components/SvgWidget';
import { allStyles } from '../styles/svg';
import { Metadata } from './models';
/**
 * Returns SVG as a string.
 */
export function generateSvg(metadata: Metadata, theme: string): string {
    const height = 180;
    const width = 420;
    const svgBody = ReactDOMServer.renderToStaticMarkup(
        <SvgWidget response={metadata} theme={theme} />
    );

    return `
    <svg
        width="${width}"
        height="${height}"
        viewBox="0 0 ${width} ${height}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        font-family="Segoe UI, sans-serif"
    >
    <style>${allStyles}</style>
    ${svgBody}
    </svg>`;
}
