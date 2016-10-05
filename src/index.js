'use es6';

import rp from 'request-promise';
import moment from 'moment';

export default class Client {

  static getDateStringFormat() {
    return 'YYYYMMDD';
  }

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
      json: true,
    };
  }

  static fetch(uri) {
    return rp(Client.buildRequest(uri))
      .then(response => response)
      .catch(err => console.log(err));
  }

  static getGamesUriFromDateString(dateString) {
    if (!Client.isDateStringValid(dateString)) {
      throw new Error('invalid dateString');
    }

    return `${Client.getBaseUri()}/data/5s/json/cms/noseason/scoreboard/${dateString}/games.json`;
  }

  static getGamesUri(year, month, day) {
    return Client.getGamesUriFromDateString(Client.buildDateString(year, month, day));
  }

  static getBoxScoreUriFromDateString(dateString, gameId) {
    if (!Client.isDateStringValid(dateString)) {
      throw new Error('invalid dateString');
    }

    return `${Client.getBaseUri()}/data/5s/json/cms/noseason/game/${dateString}/${gameId}/boxscore.json`;
  }

  static getBoxScoreUri(year, month, day, gameId){
    return Client.getBoxScoreUriFromDateString(Client.buildDateString(year, month, day), gameId);
  }

  static getPlayByPlayUriFromDateString(dateString, gameId) {
    if (!Client.isDateStringValid(dateString)) {
      throw new Error('invalid dateString');
    }

    return `${Client.getBaseUri()}/data/5s/json/cms/noseason/game/${dateString}/${gameId}/pbp_all.json`;
  }

  static getPlayByPlayUri(year, month, day, gameId) {
    return Client.getPlayByPlayUriFromDateString(Client.buildDateString(year, month, day), gameId);
  }

  static getGames(year, month, day) {
    return Client.fetch(Client.getGamesUri(year, month, day));
  }

  static getGamesFromDate(date) {
    return Client.fetch(Client.getGamesUriFromDateString(Client.buildDateStringFromDate(date)));
  }

  static getGamesFromDateString(dateString) {
    if (!Client.isDateStringValid(dateString)) {
      throw new Error('invalid dateString');
    }

    return Client.fetch(Client.getGamesUriFromDateString(dateString));
  }

  static getBoxScore(year, month, day, gameId) {
    return Client.fetch(Client.getBoxScoreUri(year, month, day, gameId));
  }

  static getBoxScoreFromDate(date, gameId) {
    return Client.fetch(Client.getBoxScoreUriFromDateString(Client.buildDateStringFromDate(date), gameId));
  }

  static getBoxScoreFromDateString(dateString, gameId) {
    if (!Client.isDateStringValid(dateString)) {
      throw new Error('invalid dateString');
    }

    return Client.fetch(Client.getBoxScoreUriFromDateString(dateString, gameId));
  }

  static getPlayByPlay(year, month, day, gameId) {
    return Client.fetch(Client.getPlayByPlayUri(year, month, day, gameId));
  }

  static getPlayByPlayFromDate(date, gameId) {
    return Client.fetch(Client.getPlayByPlayUriFromDateString(Client.buildDateStringFromDate(date), gameId));
  }

  static getPlayByPlayFromDateString(dateString, gameId) {
    if (!Client.isDateStringValid(dateString)) {
      throw new Error('invalid dateString');
    }

    return Client.fetch(Client.getPlayByPlayUriFromDateString(dateString, gameId));
  }

  static buildDateString(year, month, day) {
    return moment()
            .year(year)
            .month(month - 1)
            .date(day)
            .format(Client.getDateStringFormat());
  }

  static buildDateStringFromDate(date) {
    return moment(date).format(Client.getDateStringFormat());
  }

  static isDateStringValid(dateString) {
    let parsedDate = moment(dateString, Client.getDateStringFormat());
    return parsedDate.isValid();
  }
};
