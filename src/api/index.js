/*
Include application all the request functions
return: promise
*/
import ajax from "./ajax";

export const getSongsInfoByKeyWord = (keywords) =>
  ajax("/search", { keywords: keywords });

export const getSongURLbyID = (id) => ajax("/song/url", { id: id });

export const getTopPlaylist = (limit, offset) =>
  ajax("/top/playlist", { limit: limit, offset: offset });

export const getPlayListSongs = (id) => ajax("/playlist/detail", { id: id });

export const getSongDetailById = (ids) => ajax("/song/detail", { ids: ids });

export const getSongLyric = (id) => ajax("/lyric", { id: id });

export const searchByKeyWord = (keywords, limit, offset) =>
  ajax("/search", { keywords: keywords, limit: limit, offset: offset });

export const getHighQualityPlayList = (limit, before = 0) =>
  ajax("/playlist/highquality/tags", { limit: limit, before: before });
