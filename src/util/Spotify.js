function Spotify() {
  const getAccessToken = () => {
    var client_id, redirect_uri;
    if (window.location.href.includes("ians-jamming-v2.surge.sh")) {
      console.log('Prod deployment on surge.sh');
      client_id = "ce555a4e30a2443e89ac46e0745ee0e6";
      redirect_uri = "https://ians-jammming-v2.surge.sh";
    } else if (window.location.href.includes("netlify")) {
      console.log('Prod deployment on netlify');
      client_id = "e03ecab651e04e908bcff4b2612a19c1";
      redirect_uri = "https://ians-jammming-v2.netlify.app";
    } else { // assume localhost dev environment
      console.log('Dev on localhost');
      client_id = "c5cd19279e8d4a92be83872515e6d9d7";
      redirect_uri = "http://localhost:3000"
    }

    var state = generateRandomString(16);
    localStorage.setItem("state", state);

    var scope =
      "user-read-private user-read-email playlist-modify-private playlist-modify-public";

    var url = "https://accounts.spotify.com/authorize";
    url += "?response_type=token";
    url += "&client_id=" + encodeURIComponent(client_id);
    url += "&scope=" + encodeURIComponent(scope);
    url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
    url += "&state=" + encodeURIComponent(state);
    window.location = url;
  };

  const parseAccessTokenFromUrl = () => {
    const hash = window.location.hash
      .substring(1)
      .split("&")
      .reduce(function (initial, item) {
        if (item) {
          var parts = item.split("=");
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
      }, {});
    window.location.hash = "";
    return {
      accessToken: hash.access_token,
      tokenType: hash.token_type,
      expiresIn: hash.expires_in,
      state: hash.state,
    };
  };

  return {
    getAccessToken,
    parseAccessTokenFromUrl,
  };
}

function generateRandomString(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export default Spotify();
