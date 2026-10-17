/* eslint-disable @next/next/no-img-element -- SVG images must embed their assets directly. */
import React from 'react';
import { courseComponents, duoIcons, flagComponents, Streak, Xp, Leaderboard, Podium } from "../utils/svgMap";
import themes from "../utils/themes.json";
import { DisplayOptions, Metadata } from "../utils/models";
import { numberFormatter } from "../utils/numberFormatter";
import WeeklyXpChart from './WeeklyXpChart';
import BalanceCounters from './BalanceCounters';
import { animationLayout, SUMMARY_HEIGHT } from '../utils/animation-layout';
import { selectDuoAnimation } from '../utils/animations';

/**
 * Formats a Unix timestamp to a readable date string (e.g., "Jan 2014")
 */
function formatCreationDate(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * The main SVG widget.
 */
export default function SvgWidget({ response, theme, options = { showAvatar: true, showJoined: true } }: Readonly<{ response: Metadata; theme?: string; options?: DisplayOptions }>): JSX.Element {
    // Embed the animation in API cards to avoid nested network requests.
    const duoAnimationBase64 = response.duoAnimationBase64;
    const selectedAnimation = selectDuoAnimation(options.animation);
    const animationRatio = selectedAnimation.height / selectedAnimation.width;

    // Fallback to the SVG icons if the animation isn't available.
    const { icon: DuoIconComponent, viewBox, style: iconStyle } = duoIcons[Math.abs(Number(response.id)) % duoIcons.length];

    // Do not mutate `response`; create a local topCourses array for rendering
    const topCourses = response.courses.slice(0, 3);

    const avatarBase64 = response.avatarBase64;
    const creationDate = response.creationDate ? formatCreationDate(response.creationDate) : null;
    const languageScores = options.showScores ? (response.languageScores || []).slice(0, 3) : [];
    const placement = animationLayout(options.animationPlacement);
    const showJoined = options.showJoined && !!creationDate;
    const showIdentity = (options.showAvatar && !!avatarBase64) || showJoined;
    const avatarOnly = showIdentity && !showJoined;

    const fillParent: React.CSSProperties & { '--summary-height': string } = {
        '--summary-height': `${SUMMARY_HEIGHT}px`,
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
                <div {...{ xmlns: 'http://www.w3.org/1999/xhtml' }} data-theme={theme} className={`card${response.weeklyXp !== undefined ? ' hasWeeklyXp' : ''}${languageScores.length ? ' hasLanguageScores' : ''}${response.tokenExpired ? ' hasTokenNotice' : ''}`} style={cardStyle}>
                    <div className="content">
                        <div className={`header${showIdentity ? '' : ' headerWithoutIdentity'}${avatarOnly ? ' headerAvatarOnly' : ''}`}>
                            {showIdentity && <div className="avatarColumn">
                                {options.showAvatar && avatarBase64 && (
                                    <img
                                        className="avatar"
                                        src={avatarBase64}
                                        alt="User avatar"
                                    />
                                )}
                                {showJoined && <small id="joined">{creationDate}</small>}
                            </div>}
                            <div className="stats">
                                {/* Normalize artwork padding so each icon has the same visible height. */}
                                <div id="streak" className="statTile">
                                    <Streak height={20} width={20} viewBox="7 -10 270 270" />
                                    <div><strong>{response.streak ?? 'Unavailable'}</strong><span>Day streak</span></div>
                                </div>
                                <div id="xp" className="statTile">
                                    <Xp width={20} height={20} viewBox="2 2 52 52" />
                                    <div><strong>{response.totalXp ?? 'Unavailable'}</strong><span>Total XP</span></div>
                                </div>
                                {response.league && <div id="league" className="statTile">
                                    <Leaderboard width={20} height={20} viewBox="2 2 42 42" />
                                    <div><strong>{response.league}</strong><span>Current league</span></div>
                                </div>}
                                {response.topThreeFinishes != null && <div id="top-three-finishes" className="statTile">
                                    <Podium width={20} height={20} viewBox="-5 -3 29 29" />
                                    <div><strong>{response.topThreeFinishes.toLocaleString('en-US')}</strong><span>Top 3 finishes</span></div>
                                </div>}
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
                            <BalanceCounters hearts={response.hearts} gems={response.gems} />
                        </div>
                    </div>
                    {!options.hideAnimation && <div className="duoArea" style={{ left: placement.x, top: placement.y, width: placement.size, height: placement.size * animationRatio }}>{duoAnimationBase64 ? (
                        <img
                            className="duoAnimation"
                            src={duoAnimationBase64}
                            alt="Duo"
                        />
                    ) : (
                        iconStyle === 'flip' ?
                            <DuoIconComponent height={152} width={122} viewBox={viewBox}
                                style={{ 'display': 'block', 'transform': 'scale(-1, 1)' }} /> :
                            <DuoIconComponent height={152} width={122} viewBox={viewBox} />
                    )}</div>}
                    {languageScores.length > 0 && <section className="proficiencySection" aria-label="Duolingo Score">
                        <h3 className="proficiencyHeading">Duolingo Score</h3>
                        <div className="languageScores">
                            {languageScores.map(score => {
                                const FlagComponent = flagComponents[score.language] || flagComponents.world;
                                return <span key={score.id} title={`${score.title}: Duolingo Score ${score.score}`}>
                                    <FlagComponent height={23} width={28} viewBox="0 0 82 66" />
                                    <span>{score.title}: {score.score}</span>
                                </span>;
                            })}
                        </div>
                    </section>}
                    {response.weeklyXp !== undefined && <WeeklyXpChart days={response.weeklyXp} />}
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
