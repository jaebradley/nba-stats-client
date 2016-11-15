'use es6';

import rp from 'request-promise';
import moment from 'moment';

export default class NbaStatsClient {

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
      headers: NbaStatsClient.getHeaders(),
      json: true,
    };
  }

  static fetch(uri) {
    return rp(NbaStatsClient.buildRequest(uri))
      .then(response => response)
      .catch(err => console.log(err));
  }

  static getGamesUriFromDateString(dateString) {
    if (!NbaStatsClient.isDateStringValid(dateString)) {
      throw new Error('invalid dateString');
    }

    return `${NbaStatsClient.getBaseUri()}/data/5s/json/cms/noseason/scoreboard/${dateString}/games.json`;
  }

  static getGamesUri(year, month, day) {
    return NbaStatsClient.getGamesUriFromDateString(NbaStatsClient.buildDateString(year, month, day));
  }

  static getBoxScoreUriFromDateString(dateString, gameId) {
    if (!NbaStatsClient.isDateStringValid(dateString)) {
      throw new Error('invalid dateString');
    }

    return `${NbaStatsClient.getBaseUri()}/data/5s/json/cms/noseason/game/${dateString}/${gameId}/boxscore.json`;
  }

  static getBoxScoreUri(year, month, day, gameId){
    return NbaStatsClient.getBoxScoreUriFromDateString(NbaStatsClient.buildDateString(year, month, day), gameId);
  }

  static getPlayByPlayUriFromDateString(dateString, gameId) {
    if (!NbaStatsClient.isDateStringValid(dateString)) {
      throw new Error('invalid dateString');
    }

    return `${NbaStatsClient.getBaseUri()}/data/5s/json/cms/noseason/game/${dateString}/${gameId}/pbp_all.json`;
  }

  static getPlayByPlayUri(year, month, day, gameId) {
    return NbaStatsClient.getPlayByPlayUriFromDateString(NbaStatsClient.buildDateString(year, month, day), gameId);
  }

  static getGames(year, month, day) {
    return NbaStatsClient.fetch(NbaStatsClient.getGamesUri(year, month, day));
  }

  static getGamesFromDate(date) {
    return NbaStatsClient.fetch(NbaStatsClient.getGamesUriFromDateString(NbaStatsClient.buildDateStringFromDate(date)));
  }

  static getGamesFromDateString(dateString) {
    if (!NbaStatsClient.isDateStringValid(dateString)) {
      throw new Error('invalid dateString');
    }

    return NbaStatsClient.fetch(NbaStatsClient.getGamesUriFromDateString(dateString));
  }

  static getBoxScore(year, month, day, gameId) {
    return NbaStatsClient.fetch(NbaStatsClient.getBoxScoreUri(year, month, day, gameId));
  }

  static getBoxScoreFromDate(date, gameId) {
    return NbaStatsClient.fetch(NbaStatsClient.getBoxScoreUriFromDateString(NbaStatsClient.buildDateStringFromDate(date), gameId));
  }

  static getBoxScoreFromDateString(dateString, gameId) {
    if (!NbaStatsClient.isDateStringValid(dateString)) {
      throw new Error('invalid dateString');
    }

    return NbaStatsClient.fetch(NbaStatsClient.getBoxScoreUriFromDateString(dateString, gameId));
  }

  static getPlayByPlay(year, month, day, gameId) {
    return NbaStatsClient.fetch(NbaStatsClient.getPlayByPlayUri(year, month, day, gameId));
  }

  static getPlayByPlayFromDate(date, gameId) {
    return NbaStatsClient.fetch(NbaStatsClient.getPlayByPlayUriFromDateString(NbaStatsClient.buildDateStringFromDate(date), gameId));
  }

  static getPlayByPlayFromDateString(dateString, gameId) {
    if (!NbaStatsClient.isDateStringValid(dateString)) {
      throw new Error('invalid dateString');
    }

    return NbaStatsClient.fetch(NbaStatsClient.getPlayByPlayUriFromDateString(dateString, gameId));
  }

  static buildDateString(year, month, day) {
    return moment()
            .year(year)
            .month(month - 1)
            .date(day)
            .format(NbaStatsClient.getDateStringFormat());
  }

  static buildDateStringFromDate(date) {
    return moment(date).format(NbaStatsClient.getDateStringFormat());
  }

  static isDateStringValid(dateString) {
    let parsedDate = moment(dateString, NbaStatsClient.getDateStringFormat());
    return parsedDate.isValid();
  }
};
