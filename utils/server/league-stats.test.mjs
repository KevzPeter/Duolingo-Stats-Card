import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { leagueStatsFrom } from './league-stats.ts';

const leagueIds = ['Bronze', 'Silver', 'Gold', 'Sapphire', 'Ruby', 'Emerald', 'Amber', 'Amethyst', 'Aqua', 'Pearl', 'Jade', 'Indigo', 'Obsidian', 'Platinum', 'Diamond'];

test('maps each tier using the league names supplied by Duolingo', () => {
  leagueIds.forEach((league, tier) => {
    assert.deepEqual(leagueStatsFrom({ tier, league_ids: leagueIds, top_three_finishes: 0 }), {
      league, topThreeFinishes: 0,
    });
  });
  assert.equal(leagueStatsFrom({ tier: 1, league_ids: ['Diamond', 'Bronze'] }).league, 'Bronze');
});

test('treats malformed or unavailable league data as optional', () => {
  for (const value of [null, {}, { tier: -1, league_ids: leagueIds }, { tier: 15, league_ids: leagueIds },
    { tier: 1.5, league_ids: leagueIds }, { tier: 0, league_ids: ['Unknown'] }, { tier: 0 }]) {
    assert.deepEqual(leagueStatsFrom(value), { league: null, topThreeFinishes: null });
  }
  assert.equal(leagueStatsFrom({ top_three_finishes: -1 }).topThreeFinishes, null);
});
