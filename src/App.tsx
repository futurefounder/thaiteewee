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
      preload="auto"
      autoplay="true"
      hideControls="true"
      muted="true"
      volume="0"
      disableContextMenu="true"
      keyboard="true"
      resetOnEnd="true"
      setVolume="0"
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
  const [audio, setAudio] = useState();
  const audioSwitchChannel = new Audio(sound);

  audioSwitchChannel.load();
  audioSwitchChannel.muted = false;

  function audioToggle() {
    setAudio((prevAudio) => {
      if (!prevAudio) {
        audioSwitchChannel.pause();
      }
      return !prevAudio;
    });
  }
  // console.log(audioToggle);
  function Control() {
    // Set the random video as the current video
    const randomIndex = Math.floor(Math.random() * videoURLs.length);
    const randomVideo = videoURLs[randomIndex];
    setCurrentVideo(randomVideo);
    if (audio) {
      audioSwitchChannel.muted = false;
      audioSwitchChannel.volume = 0.1;
      audioSwitchChannel.play();
    }
    setSwitchChannel((prevChannel) => !prevChannel);
  }

  return (
    <div className="App">
      {" "}
      <div id="vidtop-content">
        <div className="vid-info">
          <h2>🛺📺 Thai Tee Wee</h2>
          <button onClick={Control}>▶️ Switch</button>
          <button onClick={audioToggle}>🔊 {audio ? "🟢 On" : "🔴 Off"}</button>
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
