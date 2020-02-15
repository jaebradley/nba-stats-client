# NBA Stats Client

[![Greenkeeper badge](https://badges.greenkeeper.io/jaebradley/nba-stats-client.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/jaebradley/nba-stats-client.svg?branch=master)](https://travis-ci.org/jaebradley/nba-stats-client)
[![codecov](https://codecov.io/gh/jaebradley/nba-stats-client/branch/master/graph/badge.svg)](https://codecov.io/gh/jaebradley/nba-stats-client)
[![npm](https://img.shields.io/npm/v/nba-stats-client.svg)](https://www.npmjs.com/package/nba-stats-client)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/nba-stats-client)
[![npm-total-downloads](https://img.shields.io/npm/dt/nba-stats-client.svg)](https://www.npmjs.com/package/nba-stats-client)
![GitHub](https://img.shields.io/github/license/jaebradley/nba-stats-client)

## Installation

```bash
npm install nba-stats-client
```

## API

```javascript
import {
  getGames,
  getBoxScore,
  getPlayByPlay,
};

// gets games for a particular date
const games = await getGames({ year: 2018, month: 1, day: 1 });

// gets box score for a particular game (based on NBA.com's unique ID) and date
const boxScore = await getBoxScore({ year: 2018, month: 1, day: 1, gameId: '1234' });

// gets play by play events for a particular game (based on NBA.com's unique ID) and date
const playByPlay = await getPlayByPlay({ year: 2018, month: 1, day: 1, gameId: '1234' });
```
