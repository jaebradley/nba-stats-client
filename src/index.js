'use es6';

import rp from 'request-promise';
import moment from 'moment';

export default class Client {

  static getBaseUri() {
    return 'http://data.nba.com';
  }

  static getHeaders() {
    return {'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36',
            'referer': 'http://stats.nba.com/scores/'};
  }

  static buildRequest(uri) {
    return {
      uri: uri,
      headers: Client.getHeaders(),
      json: true
    };
  }

  static fetch(uri) {
    return rp(Client.buildRequest(uri))
      .then(response => response)
      .catch(err => console.log(err));
  }

  static getGamesUri(year, month, day) {
    return `${Client.getBaseUri()}/data/5s/json/cms/noseason/scoreboard/${Client.buildDateString(year, month, day)}/games.json`;
  }

  static getBoxScoreUri(year, month, day, gameId){
    return `${Client.getBaseUri()}/data/5s/json/cms/noseason/game/${Client.buildDateString(year, month, day)}/${gameId}/boxscore.json`;
  }

  static getGames(year, month, day) {
    return Client.fetch(Client.getGamesUri(year, month, day));
  }

  static getBoxScore(year, month, day, gameId) {
    return Client.fetch(Client.getBoxScoreUri(year, month, day, gameId));
  }

  static buildDateString(year, month, day) {
    return moment().clone()
            .year(year)
            .month(month - 1)
            .date(day)
            .format('YYYYMMDD');
  }
};
