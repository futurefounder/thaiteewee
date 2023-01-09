import { useEffect, useState, useRef } from "react";
import sound from "./assets/tv-zapp.mp3";
import videoURLs from "./data/videos";
import "./App.css";
import YouTube, { YouTubeProps } from "react-youtube";
import Plyr from "react-plyr";
// import "plyr-react/plyr.css";
import useSimpleAudio from "use-simple-audio";

function App() {
  // set Plyr component video options
  const videoOptions = { muted: true, volume: 0 };

  const ref = useRef();

  // create a state variable to store the current video
  const [currentVideo, setCurrentVideo] = useState("");

  // select a random video from the list and set it as the current video
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * videoURLs.length);
    const randomVideo = videoURLs[randomIndex];
    setCurrentVideo(randomVideo);
    // console.log("internal plyr instance:", ref.current.plyr);
  }, []);

  const plyrProps = {
    options: autoplay : false, // https://github.com/sampotts/plyr#options
    // Direct props for inner video tag (mdn.io/video)
  }

  const preloadedPlyr = (
    <Plyr
      // ref={ref}
      type="youtube"
      videoId={currentVideo}
      preload="auto"
      autoplay="false"
      disableContextMenu="true"
      keyboard="true"
      resetOnEnd="true"
      options={{ muted: true, volume: 0 }}
    />
  );

  // const opts: YouTubeProps["opts"] = {
  //   height: "390",
  //   width: "640",
  //   playerVars: {
  //     // https://developers.google.com/youtube/player_parameters
  //     autoplay: 1,
  //   },
  // };
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
  function Control(type: string) {
    // Filter the videoURLs array to get only the videos with the specified type
    const filteredVideos = videoURLs.filter(
      (video: { type: any }) => video.type === type
    );
    // Select a random video from the filtered array
    const randomIndex = Math.floor(Math.random() * filteredVideos.length);
    const randomVideo = filteredVideos[randomIndex];
    // Set the random video as the current video
    setCurrentVideo(randomVideo.id);
    console.log(randomVideo.id);
    if (audio) {
      audioSwitchChannel.muted = false;
      audioSwitchChannel.volume = 0.1;
      audioSwitchChannel.play();
    }
    setSwitchChannel((prevChannel) => !prevChannel);
  }

  // console.log(window.localStorage.getItem("plyr"));
  window.localStorage.setItem("plyr", JSON.stringify(videoOptions));
  return (
    <div className="App">
      {" "}
      <div id="vidtop-content">
        <div className="vid-info">
          <h2>📺 Thai Tee Wee</h2>
          <button onClick={() => Control("beginner")}>👶 Beginner</button>&nbsp;
          <button onClick={() => Control("intermediate")}> 👩🏻‍🏫 Intermediate </button> &nbsp;
          <button onClick={() => Control("native")}>😄 Native</button>
          <br />
          <br />
          <button onClick={Control}>🎲 Random</button>&nbsp; <br />
          <br />
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
