import axios from "axios";
/*
    This function will encapsulate axios. The function
    will return a promise
    Encapsulate a new promise outside of axios, allow handle
    exception in 1 place.
*/

axios.defaults.baseURL = "https://warm-refuge-90006.herokuapp.com/";
export default function ajax(url, data = {}, type = "GET") {
  //executer
  return new Promise((resolve, reject) => {
    //Handle exception in one place
    let promise;
    if (type === "GET") {
      promise = axios.get(url, {
        //config params
        // withCredentials: true,
        params: data,
      });
    } else {
      //Post Request
      promise = axios.post(url, data);
    }
    promise
      .then((response) => {
        //request success
        resolve(response);
      })
      .catch((err) => {
        //request failure
        console.log(err);
      });
  });
}
