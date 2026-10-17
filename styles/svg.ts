import css from 'styled-jsx/css';

export const allStyles = css.global`
html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-weight: 500;
}
.card{
  position: relative;
  overflow: hidden;
  display: grid;
  --card-columns: minmax(0, 3fr) minmax(0, 1fr);
  --section-inset: 14px;
  --surface-background: rgba(255, 255, 255, .12);
  --surface-text: currentColor;
  --chart-accent: #1cb0f6;
  grid-template-columns: var(--card-columns);
  color: white;
  border: 1.5px solid rgba(255, 255, 255, 0.22);
  padding: 10px 20px 10px 10px;
  gap: 10px;
  border-radius: 10px;
  background-color: #21D4FD;
  background-image: linear-gradient(19deg, #21D4FD 0%, #B721FF 100%);
  background-size: 200% 200%;
  animation: gradient-animation 4s ease-in-out infinite;
}
.card[data-theme='light'] { --surface-background: rgba(0, 112, 243, .06); }
.content{
  display: grid;
  grid-column: 1 / -1;
  grid-row: 1;
}
.courseBalanceLabel { display: flex; align-items: center; height: 20px; }
.courseBalanceValue { font-weight: bold; font-variant-numeric: tabular-nums; }
.courseBalanceIcon { display: grid; place-items: center; width: 50px; height: 37px; }
.duoArea {
  position: absolute;
  z-index: 2;
  display: grid;
  place-items: center;
  box-sizing: border-box;
}
.duoArea > svg { width: 100%; height: 100%; }
.card { grid-template-rows: var(--summary-height, 163px); }
.card.hasWeeklyXp {
  grid-template-rows: var(--summary-height, 163px) 166px;
}
.card.hasLanguageScores {
  grid-template-rows: var(--summary-height, 163px) 59px;
}
.card.hasLanguageScores.hasWeeklyXp {
  grid-template-rows: var(--summary-height, 163px) 59px 166px;
}
.card.hasTokenNotice { padding-bottom: 46px; }
.tokenNotice {
  position: absolute;
  bottom: 8px;
  left: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  line-height: 14px;
}
.tokenNotice > svg { flex-shrink: 0; }
.proficiencySection {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: var(--card-columns);
  grid-template-rows: 16px 37px;
  gap: 6px 10px;
}
.proficiencyHeading {
  grid-column: 1 / -1;
  margin: 0;
  padding-left: var(--section-inset);
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
}
.languageScores {
  display: grid;
  grid-column: 1 / -1;
  grid-auto-flow: column;
  grid-auto-columns: minmax(0, 1fr);
  align-items: center;
  padding: 0 0 0 var(--section-inset);
  gap: 12px;
}
.languageScores > span {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  min-width: 0;
  height: 37px;
  box-sizing: border-box;
  padding: 4px 6px;
  justify-self: center;
  justify-content: center;
  border-radius: 8px;
  background: var(--surface-background);
  color: var(--surface-text);
  font-size: 12px;
  font-weight: bold;
}
.languageScores > span > svg { flex-shrink: 0; }
.languageScores > span > span { min-width: 0; overflow-wrap: anywhere; line-height: 13px; }
.weeklyXpChart {
  grid-column: 1 / -1;
  display: block;
  overflow: visible;
  margin-left: var(--section-inset);
  width: calc(100% - var(--section-inset));
}
.header{
  display: grid;
  grid-template-columns: 86px minmax(0, 1fr) 64px;
  align-self: start;
  align-items: stretch;
  min-height: 90px;
  gap: 10px;
  padding-left: var(--section-inset);
}
.headerWithoutIdentity { grid-template-columns: minmax(0, 1fr) 64px; }
.avatarColumn { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.avatarColumn #joined { white-space: nowrap; text-align: center; font-size: 10px; line-height: 13px; opacity: .85; }
.avatar{
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  object-fit: cover;
  flex-shrink: 0;
}
.headerAvatarOnly { grid-template-columns: 90px minmax(0, 1fr) 64px; }
.headerAvatarOnly .avatarColumn { position: relative; align-self: stretch; }
.headerAvatarOnly .avatar {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  height: 100%;
  aspect-ratio: 1;
  box-sizing: border-box;
}
.stats{
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px;
}
.stats #league { grid-column: 1; grid-row: 2; }
.stats #top-three-finishes { grid-column: 2; grid-row: 2; }
.statTile {
  display: flex;
  align-items: center;
  gap: 4px;
  min-height: 42px;
  min-width: 0;
  padding: 5px;
  box-sizing: border-box;
  border: 0;
  border-radius: 9px;
  background: var(--surface-background);
  color: var(--surface-text);
}
.statTile > svg { flex-shrink: 0; width: 20px; height: 20px; }
.statTile > div { min-width: 0; }
.statTile strong { display: block; font-size: 13px; line-height: 16px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.statTile span { display: block; font-size: 9px; line-height: 12px; opacity: .75; white-space: nowrap; }
.courses{
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(0, 1fr);
  gap: 8px;
  padding: 5px 0 0 var(--section-inset);
}
.language, .courseBalance {
  display: flex;
  flex-direction: column;
  font-size: 10px;
  align-items: center;
  min-width: 0;
  box-sizing: border-box;
}
.language #xp-count, .courseBalanceValue { line-height: 14px; }
.language #xp-count{
  font-weight: bold;
}
@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.xp{
  height:20px;
  width:20px;
  position: relative;
  z-index: 0;
}

.duoAnimation{
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
  object-position: center;
  align-self: center;
  justify-self: center;
}
`;
