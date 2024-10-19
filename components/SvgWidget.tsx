// @ts-nocheck
import Duo_Waving from "../public/svg/Duo_waving.svg";
import Duo_PencilBoarding from "../public/svg/Duo_PencilBoarding.svg";
import Duo_Excited from "../public/svg/Duo_Excited.svg";
import Duo_Jolly from "../public/svg/Duo_Jolly.svg";
import Duo_Amour from "../public/svg/Duo_Amour.svg";
import Duo_Cannonball from "../public/svg/Duo_Cannonball.svg";
import Duo_Daunting from "../public/svg/Duo_Daunting.svg";
import Crown from "../public/svg/crown.svg";
import Xp from "../public/svg/xp.svg";
import Streak from "../public/svg/streak.svg";
import Duo from "../public/svg/logo_0037_duo.svg";
import En from "../public/svg/logo_0000_en.svg"; // English
import Es from "../public/svg/logo_0001_es.svg"; // Spanish
import Fr from "../public/svg/logo_0002_fr.svg"; // French
import De from "../public/svg/logo_0003_de.svg"; // German
import Hi from "../public/svg/logo_0004_hi.svg"; // Hindi
import Ja from "../public/svg/logo_0005_ja.svg"; // Japanese
import It from "../public/svg/logo_0006_it.svg"; // Italian
import Ko from "../public/svg/logo_0007_ko.svg"; // Korean
import Zh from "../public/svg/logo_0008_zh.svg"; // Chinese
import Pt from "../public/svg/logo_0009_pt.svg"; // Portuguese
import Ru from "../public/svg/logo_0010_ru.svg"; // Russian
import Tr from "../public/svg/logo_0011_tr.svg"; // Turkish
import Nl from "../public/svg/logo_0012_nl.svg"; // Dutch
import Sv from "../public/svg/logo_0013_sv.svg"; // Swedish
import El from "../public/svg/logo_0014_el.svg"; // Greek
import Iw from "../public/svg/logo_0015_iw.svg"; // Hebrew
import Pl from "../public/svg/logo_0016_pl.svg"; // Polish
import No from "../public/svg/logo_0017_no.svg"; // Norwegian
import Vi from "../public/svg/logo_0018_vi.svg"; // Vietnamese
import Da from "../public/svg/logo_0019_da.svg"; // Danish
import Ar from "../public/svg/logo_0020_ar.svg"; // Arabic
import Uk from "../public/svg/logo_0021_uk.svg"; // Ukrainian
import Ga from "../public/svg/logo_0022_ga.svg"; // Irish
import La from "../public/svg/logo_0023_la.svg"; // Latin
import Hv from "../public/svg/logo_0024_hv.svg"; // High Valyrian
import Ro from "../public/svg/logo_0025_ro.svg"; // Romanian
import Sw from "../public/svg/logo_0026_sw.svg"; // Swahili
import Eo from "../public/svg/logo_0027_eo.svg"; // Esperanto
import Hu from "../public/svg/logo_0028_hu.svg"; // Hungarian
import Cy from "../public/svg/logo_0029_cy.svg"; // Welsh
import Cz from "../public/svg/logo_0030_cz.svg"; // Czech
import Id from "../public/svg/logo_0031_id.svg"; // Indonesian
import Hw from "../public/svg/logo_0032_hw.svg"; // Hawaiian
import Gd from "../public/svg/logo_0033_gd.svg"; // Gaelic (Scottish)
import Fi from "../public/svg/logo_0034_fi.svg"; // Finnish
import Zu from "../public/svg/logo_0035_zu.svg"; // Zulu
import Kl from "../public/svg/logo_0046_kl.svg"; // Klingon
import Nv from "../public/svg/logo_0048_nv.svg"; // Navajo
import Ht from "../public/svg/logo_0043_ht.svg"; // Haitian Creole
import Yi from "../public/svg/logo_0049_yi.svg"; // Yiddish
import Ha from "../public/svg/logo_0050_ha.svg"; // Hausa
import Ca from "../public/svg/logo_0051_ca.svg"; // Catalan, Valencian
import Th from "../public/svg/logo_0052_th.svg"; // Thai
import Gn from "../public/svg/logo_0053_gn.svg"; // Guarani
import World from "../public/svg/logo_0036_world.svg"; // Default world language icon
import themes from "../utils/themes.json";
import { Course } from "../utils/models";
import { numberFormatter } from "../utils/numberFormatter";
/**
 * The main SVG widget.
 */
export default function SvgWidget({ response, theme, sort }): JSX.Element {
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
        'zh-HK': Zh,
        pt: Pt,
        ru: Ru,
        tr: Tr,
        nl: Nl,
        'nl-NL': Nl,
        sv: Sv,
        el: El,
        he: Iw,
        iw: Iw,
        pl: Pl,
        no: No,
        'no-BO': No,
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
        hu: Hu,
        cy: Cy,
        cs: Cz,
        cz: Cz,
        id: Id,
        hw: Hw,
        gd: Gd,
        fi: Fi,
        zu: Zu,
        kl: Kl,
        nv: Nv,
        ht: Ht,
        yi: Yi,
        ha: Ha,
        ca: Ca,
        th: Th,
        gn: Gn,
        world: World,
    };

    const duoIcons = [
        { icon: Duo_Waving, viewBox: "-30 0 330 330" },
        { icon: Duo_PencilBoarding, viewBox: "40 50 225 200" },
        { icon: Duo_Jolly, viewBox: "0 0 185 180", style: 'flip' },
        { icon: Duo_Excited, viewBox: "0 -15 160 240", style: 'flip' },
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
                                    <Streak height={40} width={40} viewBox="0 0 250 283"/>
                                    {response.streak} Day streak
                                </span>
                            <span id="xp">
                                    <Xp width={40} height={40} viewBox="0 0 56 56"/>
                                {response.totalXp} XP
                                </span>
                        </div>
                        <div className="courses" style={courseStyle}>
                            {response.courses.map((course: Course) => {
                                const FlagComponent = flagComponents[course.learningLanguage] || flagComponents.world;
                                return (
                                    <div className="language" key={course.id}>
                                        {sort ? (
                                            <>
                                                <div className="xp">
                                                    <Xp width={20} height={20} viewBox="0 0 56 56"/>
                                                </div>
                                                <span id="xp-count">{numberFormatter(course.xp)}</span>
                                            </>
                                        ) : (
                                            <>
                                                <div className="crown">
                                                    <Crown width={17} height={13} viewBox="0 0 353 268"/>
                                                </div>
                                                <span id="crown-count">{numberFormatter(course.crowns)}</span>
                                            </>
                                        )}

                                        <FlagComponent height={37} width={50} viewBox="0 0 78 62"/>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {iconStyle === 'flip' ?
                        <DuoIconComponent height={152} width={122} viewBox={viewBox}
                                          style={{'display': 'block', 'transform': 'scale(-1, 1)'}}/> :
                        <DuoIconComponent height={152} width={122} viewBox={viewBox}/>}
                </div>
            </foreignObject>
        </g>
    );
}
