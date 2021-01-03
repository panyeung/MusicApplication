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

export const checkMusicAvailable = (id) => ajax("/check/music", { id: id });

export const getAvailableSongsById = async (ids) => {
  let songs = await getSongDetailById(ids);
  songs = songs.data.songs;
  let available = await getSongURLbyID(ids);
  available = available.data.data;

  //merge 2 array based on id
  let result = [];
  for (let i = 0; i < songs.length; i++) {
    result.push({
      ...songs[i],
      ...available.find((itmInner) => itmInner.id === songs[i].id),
    });
  }
  return result;
};

export const getSongLyric = (id) => ajax("/lyric", { id: id });

export const searchByKeyWord = async (keywords, limit, offset) => {
  let result = await ajax("/search", {
    keywords: keywords,
    limit: limit,
    offset: offset,
  });
  console.log(result);
  let data = result.data.result.songs;
  console.log(data);
  let ids = data.map((item) => item.id);
  let query = ids.join(",");
  console.log(query);
  let response = await getAvailableSongsById(query);
  console.log(response);
  return [response, result.data.result.songCount];
};

export const getHighQualityPlayList = (limit, before = 0) =>
  ajax("/top/playlist/highquality", { limit: limit, before: before });
