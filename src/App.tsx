import { useEffect, useState } from "react";
import sound from "./assets/tv-zapp.mp3";
import videoURLs from "./data/videos";
import "./App.css";
import YouTube, { YouTubeProps } from "react-youtube";
import Plyr from "react-plyr";
import useSimpleAudio from "use-simple-audio";

function App() {
  // create a state variable to store the current video
  const [currentVideo, setCurrentVideo] = useState("");

  // select a random video from the list and set it as the current video
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * videoURLs.length);
    const randomVideo = videoURLs[randomIndex];
    setCurrentVideo(randomVideo);
  }, []);

  const preloadedPlyr = (
    <Plyr
      type="youtube" // or "vimeo"
      videoId={currentVideo}
      autoplay="true"
      hideControls="true"
      muted="false"
      volume="1"
      disableContextMenu="true"
      keyboard="true"
      resetOnEnd="true"
    />
  );

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
    audioSwitchChannel.volume = 0.1;
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
            <div className="video-foreground">{preloadedPlyr}</div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default App;
