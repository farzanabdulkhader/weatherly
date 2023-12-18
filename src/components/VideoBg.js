import videoBg from "../assets/cloud-video-bg2.mp4";
import { useRef } from "react";

export default function VideoBg() {
  const videoRef = useRef();
  const setPlayBack = () => {
    videoRef.current.playbackRate = 0.4;
  };
  return (
    <>
      <video autoPlay loop muted ref={videoRef} onCanPlay={() => setPlayBack()}>
        <source src={videoBg} type="video/mp4" />
      </video>
    </>
  );
}
