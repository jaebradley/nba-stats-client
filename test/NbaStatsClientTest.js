import {expect} from 'chai';

import NbaStatsClient from '../build/index';

import exampleScoreboard from './files/scoreboard.json';
import exampleBoxScore from './files/boxscore.json';
import examplePlayByPlay from './files/playbyplay.json';

describe('Test Client', function() {

  let expectedHeaders = {'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36',
          'referer': 'http://stats.nba.com/scores/'};
  let expectedGamesUri = 'http://data.nba.com/data/5s/json/cms/noseason/scoreboard/20160503/games.json';
  let expectedBoxScoreUri = 'http://data.nba.com/data/5s/json/cms/noseason/game/20160508/0041500234/boxscore.json';
  let expectedPlayByPlayUri = 'http://data.nba.com/data/5s/json/cms/noseason/game/20160508/0041500234/pbp_all.json';
  let gameId = '0041500234';
  let gameDateString = '20160503';
  let boxScoreDateString = '20160508';

  it('tests date string format', function() {
    expect(NbaStatsClient.getDateStringFormat()).to.equal('YYYYMMDD');
  });

  it('tests base uri', function() {
    expect(NbaStatsClient.getBaseUri()).to.equal('http://data.nba.com');
  });

  it('test headers', function() {
    expect(NbaStatsClient.getHeaders()).to.eql(expectedHeaders);
  });

  it('tests building request', function() {
    let uri = 'jae';
    let expectedRequest = {
      uri: uri,
      headers: expectedHeaders,
      json: true,
    };
    expect(NbaStatsClient.buildRequest(uri)).to.eql(expectedRequest);
  });

  it('tests date string construction', function() {
    expect(NbaStatsClient.buildDateString(2016, 5, 3)).to.equal(gameDateString);
    expect(NbaStatsClient.buildDateStringFromDate(new Date(2016, 4, 3)))
                         .to.equal(gameDateString);
  });

  it('tests date string validity', function() {
    expect(NbaStatsClient.isDateStringValid(gameDateString)).to.be.true;
    expect(NbaStatsClient.isDateStringValid('jae')).to.be.false;
  });

  it('tests games uri construction', function() {
    expect(NbaStatsClient.getGamesUri(2016, 5, 3)).to.equal(expectedGamesUri);
    expect(NbaStatsClient.getGamesUriFromDateString(gameDateString))
                         .to.equal(expectedGamesUri);
    expect(() => NbaStatsClient.getGamesUriFromDateString('jae'))
                               .to.throw(Error);
  });

  it('tests box score uri construction', function() {
    expect(NbaStatsClient.getBoxScoreUri(2016, 5, 8, gameId))
                         .to.equal(expectedBoxScoreUri);
    expect(NbaStatsClient.getBoxScoreUriFromDateString(boxScoreDateString, gameId))
                         .to.equal(expectedBoxScoreUri);
    expect(() => NbaStatsClient.getBoxScoreUriFromDateString('jae', gameId))
                               .to.throw(Error);
  });

  it('tests play by play uri construction', function() {
    expect(NbaStatsClient.getPlayByPlayUri(2016, 5, 8, gameId))
                         .to.equal(expectedPlayByPlayUri);
    expect(NbaStatsClient.getPlayByPlayUriFromDateString(boxScoreDateString, gameId))
                         .to.equal(expectedPlayByPlayUri);
    expect(() => NbaStatsClient.getPlayByPlayUriFromDateString('jae', gameId))
                               .to.throw(Error);
  });

  it('tests games fetch with arguments', function() {
    return NbaStatsClient.getGames(2016, 5, 3)
                         .then(response => expect(response)
                         .to.eql(exampleScoreboard));
  });

  it('tests games fetch from date', function() {
    return NbaStatsClient.getGamesFromDate(new Date(2016, 4, 3))
                         .then(response => expect(response)
                         .to.eql(exampleScoreboard));
  });

  it('tests games fetch from date string', function() {
    return NbaStatsClient.getGamesFromDateString(gameDateString)
                         .then(response => expect(response)
                         .to.eql(exampleScoreboard));
  });

  it('tests box score fetch', function() {
    return NbaStatsClient.getBoxScore(2016, 5, 8, gameId)
                         .then(response => expect(response)
                         .to.eql(exampleBoxScore));
  });

  it('tests box score fetch from date', function() {
    return NbaStatsClient.getBoxScoreFromDate(new Date(2016, 4, 8), gameId)
                         .then(response => expect(response)
                         .to.eql(exampleBoxScore));
  });

  it('tests box score fetch', function() {
    return NbaStatsClient.getBoxScoreFromDateString(boxScoreDateString, gameId)
                         .then(response => expect(response)
                         .to.eql(exampleBoxScore));
  });

  it('tests play by play fetch with arguments', function() {
    return NbaStatsClient.getPlayByPlay(2016, 5, 8, gameId)
                         .then(response => expect(response)
                         .to.eql(examplePlayByPlay));
  });

  it('tests play by play fetch from date', function() {
    return NbaStatsClient.getPlayByPlayFromDate(new Date(2016, 4, 8), gameId)
                         .then(response => expect(response)
                         .to.eql(examplePlayByPlay));
  });

  it('tests play by play from date string', function() {
    return NbaStatsClient.getPlayByPlayFromDateString(boxScoreDateString, gameId)
                         .then(response => expect(response).to.eql(examplePlayByPlay));
  });

  it('tests play by play throws from bad date string', function() {
    expect(() => NbaStatsClient.getPlayByPlayFromDateString('jae', gameId))
                               .to.throw(Error);
  });
});
