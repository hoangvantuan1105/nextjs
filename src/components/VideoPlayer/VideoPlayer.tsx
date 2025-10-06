"use client";

import React, { useRef, useState } from "react";

type Source = {
  src: string;
  label: string;
};

export default function VideoPlayer({
  sources,
  poster,
  title,
}: {
  sources: Source[];
  poster?: string;
  title?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [current, setCurrent] = useState(sources[0].src);

  const handleChange = (src: string) => {
    if (!videoRef.current) return;
    const curTime = videoRef.current.currentTime;
    const wasPaused = videoRef.current.paused;

    videoRef.current.src = src;
    videoRef.current.load();

    videoRef.current.onloadedmetadata = () => {
      videoRef.current!.currentTime = curTime;
      if (!wasPaused) videoRef.current!.play();
    };

    setCurrent(src);
  };

  return (
    <div className="player-container">
      {title && <h3>{title}</h3>}

      <video
        ref={videoRef}
        controls
        poster={poster}
        className="video-frame"
        src={current}
      />

      <div className="control-bar">
        <label>Chọn chất lượng: </label>
        <select value={current} onChange={(e) => handleChange(e.target.value)}>
          {sources.map((s) => (
            <option key={s.src} value={s.src}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <style jsx>{`
        .player-container {
          width: 900px;
          height: 500px;
          margin: 20px auto;
          font-family: sans-serif;
          color: #fff;
        }
        h3 {
          margin-bottom: 10px;
        }
        .video-frame {
          width: 100%;
          height: 100%;
          background: #000;
          border-radius: 8px;
        }
        .control-bar {
          margin-top: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        select {
          background: #111;
          color: #fff;
          border: 1px solid #333;
          border-radius: 6px;
          padding: 5px 10px;
        }
      `}</style>
    </div>
  );
}
