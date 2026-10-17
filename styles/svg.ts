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
  display: grid;
  grid-template-columns: 3fr 1fr;
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
.content{
  display: grid;
  grid-column: 1;
  grid-row: 1;
}
.balanceCounters {
  position: absolute;
  top: 10px;
  right: 20px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  z-index: 1;
  font-size: 13px;
  font-weight: bold;
  font-variant-numeric: tabular-nums;
}
.balanceCounters > span {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.balanceCounters svg { flex-shrink: 0; }
.duoArea {
  position: absolute;
  z-index: 2;
  display: grid;
  place-items: center;
  box-sizing: border-box;
}
.duoArea > svg { width: 100%; height: 100%; }
.card { grid-template-rows: 163px; }
.card.hasWeeklyXp {
  grid-template-rows: 163px 166px;
}
.card.hasLanguageScores {
  grid-template-rows: 163px 54px;
}
.card.hasLanguageScores.hasWeeklyXp {
  grid-template-rows: 163px 54px 166px;
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
  grid-template-columns: minmax(0, 1fr) 122px;
  grid-template-rows: 16px 32px;
  gap: 6px 10px;
}
.proficiencyHeading {
  grid-column: 1 / -1;
  margin: 0;
  padding-left: 14px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
}
.languageScores {
  grid-column: 1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  padding: 0 10px;
  gap: 40px;
  align-items: center;
}
.languageScores > span {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 6px;
  justify-self: center;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.12);
  font-size: 10px;
  font-weight: bold;
}
.weeklyXpChart {
  grid-column: 1 / -1;
  display: block;
  overflow: visible;
}
.header{
  display: flex;
  align-items: flex-start;
  gap: 10px;
}
.avatar{
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  object-fit: cover;
  flex-shrink: 0;
}
.stats{
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: bold;
  gap: 1px;
}
.stats #streak, .stats #xp, .stats #joined{
  display: flex;
  align-items: center;
  gap: 2px;
}
.courses{
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 40px;
  padding: 5px 10px 0 10px;
  justify-content: center;
}
.language{
  display: flex;
  flex-direction: column;
  font-size: 10px;
  align-items: center;
}
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

.duoGif{
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
  object-position: center;
  align-self: center;
  justify-self: center;
}
`;
