import store from "store";
/*
local data storage module
*/
const audioList_KEY = "audioList_key";
export default {
  /*
    Save user
    */
  saveAudioLists(audioLists) {
    store.set(audioList_KEY, audioLists);
  },
  /*
    read user
    */
  getAudioLists() {
    return store.get(audioList_KEY) || [];
  },
  /*
    delete user
    */
  removeAudioLists() {
    store.remove(audioList_KEY);
  },
};
