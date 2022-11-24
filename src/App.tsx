// import React from "react";
// import YouTube, { YouTubeProps } from "react-youtube";
import { useEffect, useState } from "react";
import "./App.css";
import YouTube, { YouTubeProps } from "react-youtube";

function App() {
  // const onPlayerReady: YouTubeProps["onReady"] = (event) => {
  //   // access to player in all event handlers via event.target
  //   event.target.pauseVideo();
  // };

  // const opts: YouTubeProps["opts"] = {
  //   height: "390",
  //   width: "640",
  //   playerVars: {
  //     // https://developers.google.com/youtube/player_parameters
  //     autoplay: 1,
  //     controls: 0,
  //     rel: 0,
  //     modestbranding: 1,
  //   },
  // };
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

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
  const audioSwitchChannel = new Audio("assets\tv-zapp.mp3");
  audioSwitchChannel.load();
  audioSwitchChannel.muted = true;
  function randomVideoStart() {
    return Math.floor(Math.random() * 300) + 10;
  }
  const [videoStart, setVideoStart] = useState(randomVideoStart);

  console.log(videoStart);
  function audioToggle() {
    setAudio((prevAudio) => !prevAudio);
    audio ? "1" : "0";
  }
  // console.log(audioToggle);
  function Control() {
    audioSwitchChannel.muted = false;
    audioSwitchChannel.play();
    setSwitchChannel((prevChannel) => !prevChannel);
  }

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      e = e || window.event;
      if (e === 38) {
        console.log("up arrow pressed");
      } else if (e === 40) {
        console.log("down arrow pressed");
      } else if (e === 37) {
        console.log("left arrow pressed");
      } else if (e === 39) {
        console.log("right arrow pressed");
      }
    });
  }, []);

  return (
    <div className="App">
      {" "}
      <div id="vidtop-content">
        <div className="vid-info">
          {/* <h1>Thai Twee Wee</h1> */}
          <button onClick={Control}>▶️ Play</button>
          <button onClick={audioToggle}>🔊 On/Off</button>
        </div>
      </div>{" "}
      {/* <YouTube videoId="Svgy6jrrcF4" opts={opts} onReady={onPlayerReady} /> */}
      {switchChannel ? (
        <div>
          <div className="video-background">
            <div className="video-foreground">
              <iframe
                src="https://www.youtube.com/embed/2kAqQtLfjDI?start=120&controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=0"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default App;
