'use strict';

/*
 * action types
 */

export const SONG_SEARCH = 'SONG_SEARCH';

/*
 * action creators
 */

export function songSearch(input) {
  return { type: SONG_SEARCH, input };
}
