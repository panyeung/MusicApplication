const { getSongURLbyID } = require("../api");

export const findMatch = (songUrl, track) => {
  let infoId = track.musicId;
  let SongSrc;
  let i = 0;
  while (i < songUrl.length) {
    if (songUrl[i].id === infoId) {
      SongSrc = songUrl[i].url;
      return SongSrc;
    }
    i++;
  }
  return null;
};

export const getAudioListsFromIds = async (ids, tracksInfo) => {
  let query = ids.join(",");
  const response = await getSongURLbyID(query);
  const result = response.data;
  console.log("PlayALL", result);
  console.log("songTracksInfo", tracksInfo);

  let audioList = [];
  tracksInfo.map((Info, index) => {
    let SongUrl = findMatch(result.data, Info);
    //console.log(SongUrl);
    //console.log(Info);
    if (SongUrl != null) {
      let audio = {
        name: Info.name,
        singer: Info.singer,
        cover: Info.cover,
        musicSrc: SongUrl,
        musicId: Info.musicId,
      };
      audioList.push(audio);
      return null;
    }
  });

  return audioList;
};
