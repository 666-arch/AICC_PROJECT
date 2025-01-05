import React, { useRef, useEffect } from 'react';

const BackgroundVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play();
      video.loop = true;
      video.muted = true;
    }
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 1920,
        height: 1080,
        zIndex: -1,
      }}
    >
      <source src="/video/AICC_VIDEO.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default BackgroundVideo;