// @ts-nocheck
import React, { useMemo } from 'react';
import { duoIcons, flagComponents, Streak, Xp } from "../utils/svgMap";
import themes from "../utils/themes.json";
import { Course, DisplayOptions } from "../utils/models";
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
 * Calendar icon component for the joined date
 */
function CalendarIcon(): JSX.Element {
    return (
        <svg width={28} height={28} viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.87891 10.1518C5.87891 8.81293 6.9643 7.72754 8.3032 7.72754H27.6976C29.0365 7.72754 30.1218 8.81293 30.1218 10.1518V28.5765C30.1218 29.9154 29.0365 31.0008 27.6976 31.0008H8.3032C6.9643 31.0008 5.87891 29.9154 5.87891 28.5765V10.1518Z" fill="beige" />
            <path d="M5.87891 9.66698C5.87891 8.59585 6.74722 7.72754 7.81834 7.72754H28.1824C29.2535 7.72754 30.1218 8.59585 30.1218 9.66697V12.5761H5.87891V9.66698Z" fill="#F34848" />
        </svg>
    );
}

/**
 * The main SVG widget.
 */
export default function SvgWidget({ response, theme, options = { showAvatar: true, showJoined: true } }: { response: any; theme?: string; options?: DisplayOptions }): JSX.Element {
    // Select a random Duo icon once per component render
    const randomIndex = useMemo(() => Math.floor(Math.random() * duoIcons.length), []);
    const { icon: DuoIconComponent, viewBox, style: iconStyle } = duoIcons[randomIndex];

    // Do not mutate `response`; create a local topCourses array for rendering
    const topCourses: Course[] = response?.courses
        ? response.courses.slice(0, Math.min(3, response.courses.length))
        : [];

    const avatarBase64 = response.avatarBase64;
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
                            {options.showAvatar && avatarBase64 && (
                                <img
                                    className="avatar"
                                    src={avatarBase64}
                                    alt="User avatar"
                                />
                            )}
                            <div className="stats">
                                <span id="streak">
                                    <Streak height={28} width={28} viewBox="0 0 250 283" />
                                    {response.streak} Day streak
                                </span>
                                <span id="xp">
                                    <Xp width={28} height={28} viewBox="0 0 56 56" />
                                    {response.totalXp} XP
                                </span>
                                {options.showJoined && creationDate && (
                                    <span id="joined">
                                        <CalendarIcon width={28} height={28} />
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
