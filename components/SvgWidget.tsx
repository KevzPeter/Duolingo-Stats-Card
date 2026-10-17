/* eslint-disable @next/next/no-img-element -- SVG images must embed their assets directly. */
import React from 'react';
import { courseComponents, duoIcons, flagComponents, Streak, Xp } from "../utils/svgMap";
import themes from "../utils/themes.json";
import { DisplayOptions, Metadata } from "../utils/models";
import { numberFormatter } from "../utils/numberFormatter";
import WeeklyXpChart from './WeeklyXpChart';
import BalanceCounters from './BalanceCounters';
import { animationLayout, ANIMATION_RATIO, cardHeight } from '../utils/animation-layout';

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
export default function SvgWidget({ response, theme, options = { showAvatar: true, showJoined: true } }: { response: Metadata; theme?: string; options?: DisplayOptions }): JSX.Element {
    // Prefer a base64-embedded GIF (set in the API route) to avoid nested network requests.
    const duoGifBase64 = response.duoGifBase64;

    // Fallback to the SVG icons if the GIF isn't available.
    const { icon: DuoIconComponent, viewBox, style: iconStyle } = duoIcons[Math.abs(Number(response.id)) % duoIcons.length];

    // Do not mutate `response`; create a local topCourses array for rendering
    const topCourses = response.courses.slice(0, 3);

    const avatarBase64 = response.avatarBase64;
    const creationDate = response.creationDate ? formatCreationDate(response.creationDate) : null;
    const languageScores = options.showScores ? (response.languageScores || []).slice(0, 3) : [];
    const hasBalances = response.hearts !== undefined || response.gems !== undefined;
    const placement = animationLayout(options.animationPlacement, cardHeight(response.weeklyXp !== undefined, !!languageScores.length), hasBalances);

    const fillParent: React.CSSProperties = {
        "height": "100%",
        "width": "100%",
        "boxSizing": "border-box"
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
                <div {...{ xmlns: 'http://www.w3.org/1999/xhtml' }} className={`card${response.weeklyXp !== undefined ? ' hasWeeklyXp' : ''}${languageScores.length ? ' hasLanguageScores' : ''}${response.tokenExpired ? ' hasTokenNotice' : ''}`} style={cardStyle}>
                    <BalanceCounters hearts={response.hearts} gems={response.gems} />
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
                                    {response.streak == null ? 'Unavailable' : response.streak} Day streak
                                </span>
                                <span id="xp">
                                    <Xp width={28} height={28} viewBox="0 0 56 56" />
                                    {response.totalXp == null ? 'Unavailable' : response.totalXp} XP
                                </span>
                                {options.showJoined && creationDate && (
                                    <span id="joined">
                                        <CalendarIcon />
                                        Joined {creationDate}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="courses" style={courseStyle}>
                            {topCourses.map(course => {
                                const CourseComponent = courseComponents[course.subject?.toLowerCase()];
                                const FlagComponent = CourseComponent || flagComponents[course.learningLanguage] || flagComponents.world;
                                return (
                                    <div className="language" key={course.id}>
                                        <>
                                            <div className="xp">
                                                <Xp width={20} height={20} viewBox="0 0 56 56" />
                                            </div>
                                            <span id="xp-count">{course.xp == null ? 'Unavailable' : numberFormatter(course.xp)}</span>
                                        </>
                                        <FlagComponent height={37} width={50} viewBox={CourseComponent ? '0 0 70 54' : '0 0 82 66'} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {!options.hideAnimation && <div className="duoArea" style={{ left: placement.x, top: placement.y, width: placement.size, height: placement.size * ANIMATION_RATIO }}>{duoGifBase64 ? (
                        <img
                            className="duoGif"
                            src={duoGifBase64}
                            alt="Duo"
                        />
                    ) : (
                        iconStyle === 'flip' ?
                            <DuoIconComponent height={152} width={122} viewBox={viewBox}
                                style={{ 'display': 'block', 'transform': 'scale(-1, 1)' }} /> :
                            <DuoIconComponent height={152} width={122} viewBox={viewBox} />
                    )}</div>}
                    {languageScores.length > 0 && <section className="proficiencySection" aria-label="Proficiency Scores">
                        <h3 className="proficiencyHeading">Proficiency Scores</h3>
                        <div className="languageScores">
                        {languageScores.map(score => {
                            const FlagComponent = flagComponents[score.language] || flagComponents.world;
                            return <span key={score.id} title={`${score.title}: Duolingo Score ${score.score}`}>
                                <FlagComponent height={16} width={20} viewBox="0 0 82 66" />
                                <span>{score.score}</span>
                            </span>;
                        })}
                        </div>
                    </section>}
                    {response.weeklyXp !== undefined && <WeeklyXpChart days={response.weeklyXp} color={themes[theme]?.colorPrimary || '#ffffff'} accent={theme === 'light' ? '#009de0' : '#39c8ff'} />}
                    {response.tokenExpired && <div className="tokenNotice" role="alert">
                        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 3 22 21H2Z" fill="#ffc800" stroke="#6b4c00" strokeLinejoin="round" />
                            <path d="M12 9v5m0 3v.1" stroke="#493300" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span>Duolingo token expired. Update and redeploy to view latest stats</span>
                    </div>}
                </div>
            </foreignObject>
        </g>
    );
}
