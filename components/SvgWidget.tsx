// @ts-nocheck
import React, { useMemo } from 'react';
import { duoIcons, flagComponents, Streak, Xp } from "../utils/svgMap";
import themes from "../utils/themes.json";
import { Course } from "../utils/models";
import { numberFormatter } from "../utils/numberFormatter";
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
                        <div className="stats">
                            <span id="streak">
                                <Streak height={40} width={40} viewBox="0 0 250 283" />
                                {response.streak} Day streak
                            </span>
                            <span id="xp">
                                <Xp width={40} height={40} viewBox="0 0 56 56" />
                                {response.totalXp} XP
                            </span>
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
