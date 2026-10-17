import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { THEME_NAMES } from '../utils/config';
import { DUO_ANIMATIONS, selectDuoAnimation } from '../utils/animations';
import { FIELD_LABELS, PUBLISH_FIELDS, PublishField } from '../utils/account-models';
import { CardPreview, loadCardPreview } from '../utils/card-preview';
import { generateSvg } from '../utils/generateSVG';
import AnimationEditor from '../components/AnimationEditor';
import { AnimationPlacement, cardHeight, CARD_DISPLAY_WIDTH, CARD_WIDTH } from '../utils/animation-layout';
import styles from '../styles/Home.module.scss';

interface HomeProps { ownerUsername: string }

const USERNAME_DEBOUNCE_MS = 1000;

function appendAnimationOptions(query: URLSearchParams, animation: string, placement?: AnimationPlacement) {
  if (animation !== 'auto') query.set('animation', animation);
  if (placement) {
    query.set('x', String(placement.x));
    query.set('y', String(placement.y));
    query.set('size', String(placement.size));
  }
}

const Home: NextPage<HomeProps> = ({ ownerUsername }) => {
  const [username, setUsername] = useState(ownerUsername);
  const [previewUsername, setPreviewUsername] = useState(ownerUsername);
  const [theme, setTheme] = useState('default');
  const [animation, setAnimation] = useState('auto');
  const [animationPlacement, setAnimationPlacement] = useState<AnimationPlacement>();
  const [showAvatar, setShowAvatar] = useState(true);
  const [showJoined, setShowJoined] = useState(true);
  const [showScores, setShowScores] = useState(false);
  const [showWeeklyXp, setShowWeeklyXp] = useState(false);
  const [fields, setFields] = useState<PublishField[]>([]);
  const [origin, setOrigin] = useState('');
  const [snapshot, setSnapshot] = useState<{ path: string; data: CardPreview } | null>(null);
  const [failedPath, setFailedPath] = useState('');
  const [copyLabels, setCopyLabels] = useState({ markdown: 'Copy Markdown', html: 'Copy HTML' });
  const lookupUsername = username.trim().toLowerCase();

  useEffect(() => { setOrigin(window.location.origin); }, []);
  useEffect(() => {
    if (!/^[\w.-]{1,100}$/.test(lookupUsername)) {
      setPreviewUsername('');
      return;
    }
    const timer = setTimeout(() => setPreviewUsername(lookupUsername), USERNAME_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [lookupUsername]);

  const isOwner = !!ownerUsername && previewUsername.toLowerCase() === ownerUsername.toLowerCase();
  const query = new URLSearchParams({ showAvatar: String(showAvatar), showJoined: String(showJoined) });
  if (theme !== 'default') query.set('theme', theme);
  appendAnimationOptions(query, animation, animationPlacement);
  if (isOwner) {
    query.set('showScores', String(showScores));
    query.set('showWeeklyXp', String(showWeeklyXp));
    query.set('fields', fields.join(','));
  }
  query.set('username', previewUsername);
  const previewPath = previewUsername ? '/api?' + query.toString() : '';
  let dataPath = '';
  if (previewUsername) dataPath = isOwner ? '/api/preview' : '/api/preview?username=' + encodeURIComponent(previewUsername);
  const cardUrl = origin && previewPath ? origin + previewPath : '';
  const markdown = cardUrl ? '![Duolingo Stats Card](' + cardUrl + ')' : '';
  const html = cardUrl ? `<img src="${cardUrl.replace(/&/g, '&amp;')}" alt="Duolingo Stats Card" />` : '';
  const snippets = [{ id: 'markdown', label: 'Markdown', value: markdown }, { id: 'html', label: 'HTML', value: html }] as const;
  const imageError = !!dataPath && failedPath === dataPath;
  const loading = !!dataPath && snapshot?.path !== dataPath && !imageError;

  const previewCard = useMemo(() => {
    if (snapshot?.path !== dataPath) return null;
    const { data } = snapshot;
    const metadata = { ...data.metadata };
    if (!fields.includes('hearts')) delete metadata.hearts;
    if (!fields.includes('gems')) delete metadata.gems;
    if (!showWeeklyXp) delete metadata.weeklyXp;
    const scores = isOwner && showScores;
    const svg = generateSvg(metadata, theme === 'default' ? null : theme, { showAvatar, showJoined, showScores: scores, hideAnimation: true }, data.rows);
    const height = cardHeight(metadata.weeklyXp !== undefined, !!(scores && metadata.languageScores?.length), metadata.tokenExpired);
    return { source: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg), height, totalHeight: height + (data.rows.length ? data.rows.length * 25 + 20 : 0) };
  }, [snapshot, dataPath, theme, showAvatar, showJoined, showScores, showWeeklyXp, fields, isOwner]);
  const selectedAnimation = selectDuoAnimation(animation);

  useEffect(() => { setCopyLabels({ markdown: 'Copy Markdown', html: 'Copy HTML' }); }, [cardUrl]);
  useEffect(() => {
    if (!dataPath) return;
    let active = true;
    setFailedPath('');
    loadCardPreview(dataPath).then(data => {
      if (active) setSnapshot({ path: dataPath, data });
    }).catch(() => { if (active) setFailedPath(dataPath); });
    return () => { active = false; };
  }, [dataPath]);

  async function copySnippet(format: 'markdown' | 'html', value: string) {
    try { await navigator.clipboard.writeText(value); setCopyLabels(labels => ({ ...labels, [format]: 'Copied!' })); }
    catch { setCopyLabels(labels => ({ ...labels, [format]: 'Select and copy below' })); }
  }

  return <>
    <Head>
      <title>Duolingo Stats Card</title>
      <meta name="description" content="Customize your Duolingo stats card and copy it into your README." />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}><h1>Duolingo Stats Card</h1></header>
        <div className={styles.workspace}>
          <aside className={styles.controls} aria-labelledby="customize-heading">
            <h2 id="customize-heading">Customize</h2>
            <div className={styles.field}>
              <label htmlFor="username">Username</label>
              <input id="username" type="text" autoComplete="off" spellCheck={false} maxLength={100} value={username} placeholder="Duolingo username" onChange={event => setUsername(event.target.value)} />
            </div>
            <div className={styles.field}>
              <label htmlFor="theme">Theme</label>
              <select id="theme" value={theme} onChange={event => setTheme(event.target.value)}>
                <option value="default">Default</option>
                {THEME_NAMES.map(name => <option key={name} value={name}>{name}</option>)}
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="animation">Animation</label>
              <select id="animation" value={animation} onChange={event => setAnimation(event.target.value)}>
                <option value="auto">Default (Waving)</option>
                {DUO_ANIMATIONS.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
              </select>
            </div>
            <fieldset className={styles.options}>
              <legend>Show on card</legend>
              <label><input type="checkbox" checked={showAvatar} onChange={event => setShowAvatar(event.target.checked)} />Avatar</label>
              <label><input type="checkbox" checked={showJoined} onChange={event => setShowJoined(event.target.checked)} />Joined date</label>
              {isOwner && <label><input type="checkbox" checked={showWeeklyXp} onChange={event => setShowWeeklyXp(event.target.checked)} />Weekly XP</label>}
              {isOwner && PUBLISH_FIELDS.map(field => <label key={field}>
                <input type="checkbox" checked={fields.includes(field)} onChange={event => setFields(event.target.checked ? [...fields, field] : fields.filter(item => item !== field))} />
                {FIELD_LABELS[field]}
              </label>)}
              {isOwner && <label><input type="checkbox" checked={showScores} onChange={event => setShowScores(event.target.checked)} />Duolingo Score</label>}

            </fieldset>
          </aside>
          <section className={styles.preview} aria-labelledby="preview-heading">
            <h2 id="preview-heading">Preview</h2>
            <div className={styles.previewArea} aria-busy={loading}>
              {!previewPath && <p className={styles.placeholder}>Enter a username to preview your card.</p>}
              {previewPath && <>
                {previewCard && <div className={styles.cardCanvas} style={{ display: imageError ? 'none' : 'block', width: CARD_DISPLAY_WIDTH }}>
                  {/* Render the shared SVG locally from the cached profile snapshot. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={previewCard.source} alt="Duolingo stats card" className={styles.statsImage} draggable={false} onError={() => setFailedPath(dataPath)} />
                  <div className={styles.animationSurface} style={{ height: `${previewCard.height / previewCard.totalHeight * 100}%`, borderRadius: `${10 / CARD_WIDTH * 100}% / ${10 / previewCard.height * 100}%` }}>
                    <AnimationEditor animation={selectedAnimation.id} height={previewCard.height} placement={animationPlacement} onChange={setAnimationPlacement} />
                  </div>
                </div>}
                {loading && <output className={styles.loading}><span className={styles.spinner} />Loading card…</output>}
                {imageError && <p role="alert" className={styles.placeholder}>Couldn&apos;t load this card. Try again in a moment.</p>}
              </>}
            </div>
            {previewCard && !imageError && <div className={styles.animationHelp}><span>Drag Duo to move. Drag the corner to resize.</span><button type="button" onClick={() => setAnimationPlacement(undefined)} disabled={!animationPlacement}>Reset position &amp; size</button></div>}
            {snippets.map(snippet => <div className={styles.share} key={snippet.id}>
              <div className={styles.shareHeading}>
                <label htmlFor={snippet.id}>{snippet.label}</label>
                <button type="button" onClick={() => copySnippet(snippet.id, snippet.value)} disabled={!snippet.value || imageError}>{copyLabels[snippet.id]}</button>
              </div>
              <textarea id={snippet.id} readOnly value={snippet.value} rows={3} spellCheck={false} onFocus={event => event.target.select()} />
            </div>)}
          </section>
        </div>
      </div>
    </main>
    <Analytics />
  </>;
};

export const getServerSideProps: GetServerSideProps<HomeProps> = () => {
  const username = process.env.DUOLINGO_USERNAME?.trim() || '';
  const configured = !!process.env.DUOLINGO_JWT?.trim() && /^[\w.-]{1,100}$/.test(username);
  // Only the public username is passed to the browser; credentials stay server-side.
  return Promise.resolve({ props: { ownerUsername: configured ? username : '' } });
};

export default Home;
