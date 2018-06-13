import {
  getGames,
  getBoxScore,
  getPlayByPlay,
} from './';

describe('client', () => {
  describe('integration test', () => {
    it('gets games', async () => {
      const games = await getGames({ year: 2018, month: 1, day: 1 });
      console.log(games);
    });

    it('gets box score', async () => {
      const boxScore = await getBoxScore({
        year: 2018,
        month: 1,
        day: 1,
        gameId: '0021700545',
      });
      console.log(boxScore);
    });

    it('gets play by play', async () => {
      const playByPlay = await getPlayByPlay({
        year: 2018,
        month: 1,
        day: 1,
        gameId: '0021700545',
      });
      console.log(playByPlay);
    });
  });
});
