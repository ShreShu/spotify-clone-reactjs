//once user clicks on login on login page , user will be thrown to this link
//what happens here is spotify will check the access and will log us in
export const authEndPoint = "https://accounts.spotify.com/authorize";

//once we logged in we will be back to this link
const redirectUri = "http://localhost:3000/";

//client id we got from spotify.developers
const clientId = your client_id;

//allows us to perform operation based on scopes
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];
export const loginUrl = `${authEndPoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};
