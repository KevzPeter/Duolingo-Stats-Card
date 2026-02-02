// @ts-nocheck
import React, { useMemo } from 'react';
import { duoIcons, flagComponents, Streak, Xp } from "../utils/svgMap";
import themes from "../utils/themes.json";
import { Course } from "../utils/models";
import { numberFormatter } from "../utils/numberFormatter";

/**
 * Formats a Unix timestamp to a readable date string (e.g., "Jan 2014")
 */
function formatCreationDate(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * Normalizes the picture URL to include https protocol
 */
function getAvatarUrl(picture: string): string {
    if (!picture) return '';
    // Handle protocol-relative URLs
    if (picture.startsWith('//')) {
        return `https:${picture}`;
    }
    // Handle already complete URLs
    if (picture.startsWith('http')) {
        return picture;
    }
    return `https://${picture}`;
}

/**
 * The main SVG widget.
 */
export default function SvgWidget({ response, theme }: { response: any; theme?: string }): JSX.Element {
    // Select a random Duo icon once per component render
    const randomIndex = useMemo(() => Math.floor(Math.random() * duoIcons.length), []);
    const { icon: DuoIconComponent, viewBox, style: iconStyle } = duoIcons[randomIndex];

    // Do not mutate `response`; create a local topCourses array for rendering
    const topCourses: Course[] = response?.courses
        ? response.courses.slice(0, Math.min(3, response.courses.length))
        : [];

    const avatarUrl = getAvatarUrl(response.picture);
    const creationDate = response.creationDate ? formatCreationDate(response.creationDate) : null;

    const fillParent = {
        "height": "100%",
        "width": "100%",
        "box-sizing": "border-box"
    }
    const cardStyle = theme ? {
        "background": `${themes[theme].background}!important`,
        color: `${themes[theme].colorPrimary}`,
        ...fillParent
    } : fillParent;

    const courseStyle = theme ? { color: `${themes[theme].colorSecondary}` } : null;

    return (
        <g>
            <foreignObject x="0" y="0" width="100%" height="100%">
                <div xmlns="http://www.w3.org/1999/xhtml" className="card" style={cardStyle}>
                    <div className="content">
                        <div className="header">
                            {avatarUrl && (
                                <img 
                                    className="avatar" 
                                    src={avatarUrl} 
                                    alt="User avatar"
                                />
                            )}
                            <div className="stats">
                                <span id="streak">
                                    <Streak height={40} width={40} viewBox="0 0 250 283" />
                                    {response.streak} Day streak
                                </span>
                                <span id="xp">
                                    <Xp width={40} height={40} viewBox="0 0 56 56" />
                                    {response.totalXp} XP
                                </span>
                                {creationDate && (
                                    <span id="joined">
                                        <svg width={36} height={36} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 2V5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M16 2V5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M3.5 9.09H20.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M15.6947 13.7H15.7037" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M15.6947 16.7H15.7037" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M11.9955 13.7H12.0045" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M11.9955 16.7H12.0045" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M8.29431 13.7H8.30329" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M8.29431 16.7H8.30329" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        Joined {creationDate}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="courses" style={courseStyle}>
                            {topCourses.map((course: Course) => {
                                const FlagComponent = flagComponents[course.learningLanguage] || flagComponents.world;
                                return (
                                    <div className="language" key={course.id}>
                                        <>
                                            <div className="xp">
                                                <Xp width={20} height={20} viewBox="0 0 56 56" />
                                            </div>
                                            <span id="xp-count">{numberFormatter(course.xp)}</span>
                                        </>
                                        <FlagComponent height={37} width={50} viewBox="0 0 82 66" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {iconStyle === 'flip' ?
                        <DuoIconComponent height={152} width={122} viewBox={viewBox}
                            style={{ 'display': 'block', 'transform': 'scale(-1, 1)' }} /> :
                        <DuoIconComponent height={152} width={122} viewBox={viewBox} />}
                </div>
            </foreignObject>
        </g>
    );
}
