# NBA Stats Client

[![Build Status](https://travis-ci.org/jaebradley/nba-client.svg?branch=master)](https://travis-ci.org/jaebradley/nba-client)
[![Coverage Status](https://coveralls.io/repos/github/jaebradley/nba-client/badge.svg?branch=master)](https://coveralls.io/github/jaebradley/nba-client?branch=master)
[![npm](https://img.shields.io/npm/v/nba-stats-client.svg)](https://www.npmjs.com/package/nba-stats-client)
[![npm_total_downloads](https://img.shields.io/npm/dt/nba-stats-client.svg)](https://www.npmjs.com/package/nba-stats-client)

## API

### Get Games

`Client.getGames(year, month, day)`
* **year** - `integer`
* **month** - `integer`
* **day** - `integer`

`Client.getGamesFromDate(date)`
* **date** - `Date` object

#### Example
```javascript
import Client from 'nba-stats-client';

// get games for 2016-01-01
Client.getGames(2016, 1, 1);
Client.getGamesFromDate(new Date(2016, 1, 1));
```

[Output](https://raw.githubusercontent.com/jaebradley/nba-client/master/examples/scoreboard.json)

### Get Box Score

`Client.getBoxScore(year, month, day, gameId)`
* **year** - `integer`
* **month** - `integer`
* **day** - `integer`
* **gameId** - `String` representing NBA Stats' unique game id

`Client.getBoxScoreFromDate(date, gameId)`
* **date** - `Date` object
* **gameId** - `String` representing NBA Stats' unique game id

#### Example
```javascript
import Client from 'nba-stats-client';

// get box score for 2016-01-01 for game with id 0041500234
Client.getBoxScore(2016, 1, 1, '0041500234');
Client.getBoxScoreFromDate(new Date(2016, 1, 1), '0041500234');
```

[Output](https://raw.githubusercontent.com/jaebradley/nba-client/master/examples/boxscore.json)

### Get Play By Play

`Client.getPlayByPlay(year, month, day, gameId)`
* **year** - `integer`
* **month** - `integer`
* **day** - `integer`
* **gameId** - `String` representing NBA Stats' unique game id

`Client.getPlayByPlayFromDate(date, gameId)`
* **date** - `Date` object
* **gameId** - `String` representing NBA Stats' unique game id

#### Example
```javascript
import Client from 'nba-stats-client';

// get play by play data for 2016-01-01 for game with id 0041500234
Client.getPlayByPlay(2016, 1, 1, '0041500234');
Client.getPlayByPlayFromDate(new Date(2016, 1, 1), '0041500234');
```

[Output](https://raw.githubusercontent.com/jaebradley/nba-client/master/examples/playbyplay.json)
