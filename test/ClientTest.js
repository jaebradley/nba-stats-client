import {expect} from 'chai';

import Client from '../src/index';

import exampleScoreboard from './files/scoreboard.json';
import exampleBoxScore from './files/boxscore.json';

describe('Test Client', function() {

  let expectedHeaders = {'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36',
          'referer': 'http://stats.nba.com/scores/'};
  let expectedGamesUri = 'http://data.nba.com/data/5s/json/cms/noseason/scoreboard/20160503/games.json';
  let expectedBoxScoreUri = 'http://data.nba.com/data/5s/json/cms/noseason/game/20160508/0041500234/boxscore.json';
  let gameId = '0041500234';
  let gameDateString = '20160503';
  let boxScoreDateString = '20160508';

  it('tests date string format', function() {
    expect(Client.getDateStringFormat()).to.equal('YYYYMMDD');
  });

  it('tests base uri', function() {
    expect(Client.getBaseUri()).to.equal('http://data.nba.com');
  });

  it('test headers', function() {
    expect(Client.getHeaders()).to.eql(expectedHeaders);
  });

  it('tests building request', function() {
    let uri = 'jae';
    let expectedRequest = {
      uri: uri,
      headers: expectedHeaders,
      json: true,
    };
    expect(Client.buildRequest(uri)).to.eql(expectedRequest);
  });

  it('tests date string construction', function() {
    expect(Client.buildDateString(2016, 5, 3)).to.equal(gameDateString);
    expect(Client.buildDateStringFromDate(new Date(2016, 4, 3))).to.equal(gameDateString);
  });

  it('tests date string validity', function() {
    expect(Client.isDateStringValid(gameDateString)).to.be.true;
    expect(Client.isDateStringValid('jae')).to.be.false;
  });

  it('tests games uri construction', function() {
    expect(Client.getGamesUri(2016, 5, 3)).to.equal(expectedGamesUri);
    expect(Client.getGamesUriFromDateString(gameDateString)).to.equal(expectedGamesUri);
    expect(() => Client.getGamesUriFromDateString('jae')).to.throw(Error);
  });

  it('tests box score uri construction', function() {
    expect(Client.getBoxScoreUri(2016, 5, 8, gameId)).to.equal(expectedBoxScoreUri);
    expect(Client.getBoxScoreUriFromDateString(boxScoreDateString, gameId)).to.equal(expectedBoxScoreUri);
    expect(() => Client.getBoxScoreUriFromDateString('jae', gameId)).to.throw(Error);
  });

  it('tests games fetch with arguments', function() {
    return Client.getGames(2016, 5, 3)
                 .then(response => expect(response).to.eql(exampleScoreboard));
  });

  it('tests games fetch from date', function() {
    return Client.getGamesFromDate(new Date(2016, 4, 3))
                 .then(response => expect(response).to.eql(exampleScoreboard));
  });

  it('tests games fetch from date string', function() {
    return Client.getGamesFromDateString(gameDateString)
                 .then(response => expect(response).to.eql(exampleScoreboard));
  });

  it('tests box score fetch', function() {
    return Client.getBoxScore(2016, 5, 8, gameId)
                 .then(response => expect(response).to.eql(exampleBoxScore));
  });

  it('tests box score fetch from date', function() {
    return Client.getBoxScoreFromDate(new Date(2016, 4, 8), gameId)
                 .then(response => expect(response).to.eql(exampleBoxScore));
  });

  it('tests box score fetch', function() {
    return Client.getBoxScoreFromDateString(boxScoreDateString, gameId)
                 .then(response => expect(response).to.eql(exampleBoxScore));
  });
});
