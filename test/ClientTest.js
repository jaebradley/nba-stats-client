import {expect} from 'chai';

import Client from '../src/index';

import exampleScoreboard from './files/scoreboard.json';
import examapleBoxScore from './files/boxscore.json';

describe('Test Client', function() {

  it('tests date string construction', function() {
    expect(Client.buildDateString(2016, 5, 3)).to.equal('20160503');
  });

  it('tests games uri construction', function() {
    expect(Client.getGamesUri(2016, 5, 3)).to.equal('http://data.nba.com/data/5s/json/cms/noseason/scoreboard/20160503/games.json');
  });

  it('tests box score uri construction', function() {
    expect(Client.getBoxScoreUri(2016, 5, 8, '0041500234')).to.equal('http://data.nba.com/data/5s/json/cms/noseason/game/20160508/0041500234/boxscore.json');
  });

  it('tests scoreboard fetch', function() {
    return Client.getGames(2016, 5, 3)
                 .then(response => expect(response).to.eql(exampleScoreboard));
  });

  it('tests box score fetch', function() {
    return Client.getBoxScore(2016, 5, 8, '0041500234')
                 .then(response => expect(response).to.eql(examapleBoxScore));
  });
});
