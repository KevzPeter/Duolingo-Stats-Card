import { DashboardData } from '../utils/account-models';
import { Heart, Gem } from '../utils/svgMap';
import { numberFormatter } from '../utils/numberFormatter';

export default function BalanceCounters({ hearts, gems }: { hearts?: DashboardData['hearts']; gems?: number | null }) {
  if (hearts === undefined && gems === undefined) return null;
  const heartValue = hearts?.current;
  return <div className="balanceCounters">
    {hearts !== undefined && <span role="img" aria-label={'Hearts: ' + (heartValue ?? 'Unavailable')} title={'Hearts: ' + (heartValue ?? 'Unavailable')}>
      <Heart width={22} height={22} viewBox="0 0 34 34" aria-hidden="true" />
      <span>{heartValue == null ? '—' : numberFormatter(heartValue)}</span>
    </span>}
    {gems !== undefined && <span role="img" aria-label={'Gems: ' + (gems ?? 'Unavailable')} title={'Gems: ' + (gems ?? 'Unavailable')}>
      <Gem width={18} height={22} viewBox="0 0 24 30" aria-hidden="true" />
      <span>{gems == null ? '—' : numberFormatter(gems)}</span>
    </span>}
  </div>;
}
