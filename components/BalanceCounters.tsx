import { DashboardData } from '../utils/account-models';
import { Heart, Gem } from '../utils/svgMap';
import { numberFormatter } from '../utils/numberFormatter';

export default function BalanceCounters({ hearts, gems }: Readonly<{ hearts?: DashboardData['hearts']; gems?: number | null }>) {
  if (hearts === undefined && gems === undefined) return null;
  const heartValue = hearts?.current;
  return <>
    {hearts !== undefined && <div className="courseBalance" aria-label={'Hearts: ' + (heartValue ?? 'Unavailable')}>
      <span className="courseBalanceLabel">Hearts</span>
      <span className="courseBalanceValue">{heartValue == null ? '—' : numberFormatter(heartValue)}</span>
      <span className="courseBalanceIcon"><Heart width={32} height={32} viewBox="0 0 34 34" aria-hidden="true" /></span>
    </div>}
    {gems !== undefined && <div className="courseBalance" aria-label={'Gems: ' + (gems ?? 'Unavailable')}>
      <span className="courseBalanceLabel">Gems</span>
      <span className="courseBalanceValue">{gems == null ? '—' : numberFormatter(gems)}</span>
      <span className="courseBalanceIcon"><Gem width={26} height={32} viewBox="0 0 24 30" aria-hidden="true" /></span>
    </div>}
  </>;
}
