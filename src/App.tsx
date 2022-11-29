import { useEffect, useState } from "react";
import sound from "./assets/tv-zapp.mp3";

import "./App.css";
import YouTube, { YouTubeProps } from "react-youtube";
import Plyr from "react-plyr";
import useSimpleAudio from "use-simple-audio";

function App() {
  const opts: YouTubeProps["opts"] = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const [switchChannel, setSwitchChannel] = useState(false);
  const [audio, setAudio] = useState(true);
  const audioSwitchChannel = new Audio(sound);

  audioSwitchChannel.load();
  audioSwitchChannel.muted = true;

  function audioToggle() {
    console.log("audio toggle");
  }
  // console.log(audioToggle);
  function Control() {
    audioSwitchChannel.muted = false;
    audioSwitchChannel.volume = 0.3;
    audioSwitchChannel.play();
    setSwitchChannel((prevChannel) => !prevChannel);
  }

  return (
    <div className="App">
      {" "}
      <div id="vidtop-content">
        <div className="vid-info">
          <h2>🛺📺 Thai Twee Wee</h2>
          <button onClick={Control}>▶️ Play</button>
          <button onClick={audioToggle}>🔊 On/Off</button>
        </div>
      </div>{" "}
      {/* <YouTube videoId="Svgy6jrrcF4" opts={opts} onReady={onPlayerReady} /> */}
      {switchChannel ? (
        <div>
          <div className="video-background">
            <div className="video-foreground">
              {/* <iframe
                src="https://www.youtube.com/embed/2kAqQtLfjDI?start=100&controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=0"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              > */}
              <Plyr
                type="youtube" // or "vimeo"
                videoId="2kAqQtLfjDI"
                autoplay="true"
                hideControls="true"
                muted="false"
                volume="1"
                disableContextMenu="true"
                keyboard="true"
                seekTime={120}
              />
              {/* </iframe> */}
            </div>
          </div>
        </div>
      ) : (
        <div>
          {" "}
          {/* <Plyr
            type="youtube" // or "vimeo"
            videoId="2kAqQtLfjDI"
            autoplay="true"
            hideControls="true"
            muted="false"
            volume="1"
            disableContextMenu="true"
            keyboard="true"
          /> */}
        </div>
      )}
    </div>
  );
}

export default App;
