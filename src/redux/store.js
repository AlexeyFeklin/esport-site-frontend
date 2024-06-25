import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth.js';
import newsFilter from './slices/newsFilter.js';
import { newsReducer } from './slices/news.js';
import clubFilter from './slices/clubFilter.js';
import { clubReducer } from './slices/club.js';
import { tournamentReducer } from './slices/tournament.js';
import { roleApplicationReducer } from './slices/roleApplication.js';
import comment from './slices/comment.js';
import tournamentFilter from './slices/tournamentFilter.js';
import { teamReducer } from './slices/team.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    teams: teamReducer,
    news: newsReducer,
    clubs: clubReducer,
    tournaments: tournamentReducer,
    roleApplication: roleApplicationReducer,
    comment,
    newsFilter,
    clubFilter,
    tournamentFilter,
  },
});
