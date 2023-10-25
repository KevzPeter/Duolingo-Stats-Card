// @ts-nocheck
import Duo_Waving from "../public/svg/Duo_waving.svg";
import Duo_PencilBoarding from "../public/svg/Duo_PencilBoarding.svg";
import Duo_Excited from "../public/svg/Duo_Excited.svg";
import Duo_Jolly from "../public/svg/Duo_Jolly.svg";
import Duo_Amour from "../public/svg/Duo_Amour.svg";
import Duo_Cannonball from "../public/svg/Duo_Cannonball.svg";
import Duo_Daunting from "../public/svg/Duo_Daunting.svg";
import Crown from "../public/svg/crown.svg";
import Streak from "../public/svg/streak.svg";
import Duo from "../public/svg/logo_0037_duo.svg";
import En from "../public/svg/logo_0000_en.svg";
import Es from "../public/svg/logo_0001_es.svg";
import Fr from "../public/svg/logo_0002_fr.svg";
import De from "../public/svg/logo_0003_de.svg";
import Hi from "../public/svg/logo_0004_hi.svg";
import Ja from "../public/svg/logo_0005_ja.svg";
import It from "../public/svg/logo_0006_it.svg";
import Ko from "../public/svg/logo_0007_ko.svg";
import Zh from "../public/svg/logo_0008_zh.svg";
import Pt from "../public/svg/logo_0009_pt.svg";
import Ru from "../public/svg/logo_0010_ru.svg";
import Tr from "../public/svg/logo_0011_tr.svg";
import Nl from "../public/svg/logo_0012_nl.svg";
import Sv from "../public/svg/logo_0013_sv.svg";
import El from "../public/svg/logo_0014_el.svg";
import Iw from "../public/svg/logo_0015_iw.svg";
import Pl from "../public/svg/logo_0016_pl.svg";
import No from "../public/svg/logo_0017_no.svg";
import Vi from "../public/svg/logo_0018_vi.svg";
import Da from "../public/svg/logo_0019_da.svg";
import Ar from "../public/svg/logo_0020_ar.svg";
import Uk from "../public/svg/logo_0021_uk.svg";
import Ga from "../public/svg/logo_0022_ga.svg";
import La from "../public/svg/logo_0023_la.svg";
import Hv from "../public/svg/logo_0024_hv.svg";
import Ro from "../public/svg/logo_0025_ro.svg";
import Sw from "../public/svg/logo_0026_sw.svg";
import Eo from "../public/svg/logo_0027_eo.svg";
import World from "../public/svg/logo_0036_world.svg";
import themes from "../utils/themes.json";
import { Course } from "../utils/models";
/**
 * The main SVG widget.
 */
export default function SvgWidget({ response, theme }): JSX.Element {
    const flagComponents = {
        duo: Duo,
        en: En,
        es: Es,
        fr: Fr,
        de: De,
        hi: Hi,
        ja: Ja,
        it: It,
        ko: Ko,
        zh: Zh,
        pt: Pt,
        ru: Ru,
        tr: Tr,
        nl: Nl,
        sv: Sv,
        el: El,
        iw: Iw,
        pl: Pl,
        no: No,
        vi: Vi,
        da: Da,
        ar: Ar,
        uk: Uk,
        ga: Ga,
        la: La,
        hv: Hv,
        ro: Ro,
        sw: Sw,
        eo: Eo,
        world: World,
    };

    const duoIcons = [
        { icon: Duo_Waving, viewBox: "0 0 281 349" },
        { icon: Duo_PencilBoarding, viewBox: "40 50 225 200" },
        { icon: Duo_Jolly, viewBox: "0 0 185 180", style: 'flip' },
        { icon: Duo_Excited, viewBox: "0 0 160 210", style: 'flip' },
        { icon: Duo_Daunting, viewBox: "0 0 190 150" },
        { icon: Duo_Cannonball, viewBox: "0 0 160 150" },
        { icon: Duo_Amour, viewBox: "0 0 185 30", style: 'flip' },
    ];
    // Randomly generate a Duo icon
    const randomIndex = Math.floor(Math.random() * 7);
    const DuoIconComponent = duoIcons[randomIndex].icon;
    const viewBox = duoIcons[randomIndex].viewBox;
    const iconStyle = duoIcons[randomIndex].style;
    // Display top 3 languages with most crowns
    response.courses = response.courses.slice(0, Math.min(3, response.courses.length));
    const cardStyle = theme ? { "background": `${themes[theme].background}!important`, color: `${themes[theme].colorPrimary}` } : null;
    const courseStyle = theme ? { color: `${themes[theme].colorSecondary}` } : null;

    return (
        <g>
            <foreignObject x="0" y="0" width="100%" height="100%">
                <div xmlns="http://www.w3.org/1999/xhtml">
                    <div className="card" style={cardStyle}>
                        <div className="content">
                            <div className="stats">
                                <span id="streak">
                                    <Streak height={40} width={40} viewBox="0 0 250 283" />
                                    {response.streak} Day streak
                                </span>
                                <span id="xp">⚡{response.totalXp} XP</span>
                            </div>
                            <div className="courses" style={courseStyle}>
                                {response.courses.map((course: Course) => {
                                    const FlagComponent = flagComponents[course.learningLanguage] || flagComponents.world;
                                    return (
                                        <div className="language" key={course.id}>
                                            <div className="crown">
                                                <Crown width={17} height={13} viewBox="0 0 353 268" />
                                            </div>
                                            <span id="crown-count">{course.crowns}</span>
                                            <FlagComponent height={37} width={50} viewBox="0 0 78 62" />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        {iconStyle === 'flip' ?
                            <DuoIconComponent height={152} width={122} viewBox={viewBox} style={{ 'display': 'block', 'transform': 'scale(-1, 1)' }} /> :
                            <DuoIconComponent height={152} width={122} viewBox={viewBox} />}
                    </div>
                </div>
            </foreignObject>
        </g>
    );
}
