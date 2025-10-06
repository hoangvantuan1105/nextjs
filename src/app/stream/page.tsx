import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";

export default function Page() {
  return (
    <VideoPlayer
      title="Demo phim"
      poster="/poster.jpg"
      sources={[
        { src: "/assets/video/pham.mp4", label: "480p" },
        { src: "/assets/video/pham.mp4", label: "720p" },
        { src: "/assets/video/pham.mp4", label: "1080p" },
      ]}
    />
  );
}
