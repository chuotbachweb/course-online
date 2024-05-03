import { useState } from "react";
import ReactPlayer from "react-player";

function VideoPlayer({ data ,handleProgress}) {
  return (
    <ReactPlayer
      playing={false}
      volume={0.2}
      controls
      url={data}
      width={"70%"}
      height={"70%"}
      onProgress={handleProgress}
    />
  );
}

export default VideoPlayer;
