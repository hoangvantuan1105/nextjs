"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "../../../components/header/page";
import StreamPageStyle from "../stream.module.css";

interface Movie {
  id: number;
  title: string;
  poster: string | null;
  rating: number;
  duration: string;
  quality: string;
  age: string;
  genre: string;
  video: string | null;
  link?: string | null;
}

interface Episode {
  id: number;
  movie_id: number;
  episode_number: number;
  title: string;
  duration: string;
  video_url: string;
}

const getEmbedUrl = (url: string) => {
  if (!url) return "";
  if (url.includes("dailymotion")) {
    const match = url.match(/video\/([a-zA-Z0-9]+)/);
    if (match)
      return `https://www.dailymotion.com/embed/video/${match[1]}?autoplay=1&mute=0`;
  }
  if (url.includes("youtube") || url.includes("youtu.be")) {
    let videoId = "";
    if (url.includes("youtu.be")) {
      videoId = url.split("/").pop() || "";
    } else {
      const urlObj = new URL(url);
      videoId = urlObj.searchParams.get("v") || "";
    }
    if (videoId)
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`;
  }
  if (url.includes("facebook.com")) {
    const encodedUrl = encodeURIComponent(url);
    return `https://www.facebook.com/plugins/video.php?href=${encodedUrl}&show_text=false&autoplay=1`;
  }
  return url;
};

export default function StreamPage() {
  const params = useParams();
  const id = params.id as string | undefined;

  const [movie, setMovie] = useState<Movie | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`https://tuanhoang.io.vn/api/movies/${id}/views`, {
      method: "POST",
    }).catch((err) => console.error("Lỗi tăng lượt xem:", err));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const resMovie = await fetch(
          `https://tuanhoang.io.vn/api/movies/${id}`
        );
        if (!resMovie.ok) throw new Error("Không tìm thấy phim");
        const movieData = await resMovie.json();
        setMovie(movieData);

        const resEp = await fetch(
          `https://tuanhoang.io.vn/api/episodes/movie/${id}`
        );
        const episodesData = await resEp.json();
        setEpisodes(episodesData);

        if (episodesData.length > 0 && !selectedEpisode) {
          setSelectedEpisode(episodesData[0]);
        }
      } catch (err) {
        console.error("Lỗi tải phim:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading)
    return (
      <div className={StreamPageStyle.loading_message}>Đang tải phim...</div>
    );

  if (!movie)
    return (
      <div className={StreamPageStyle.error_message}>
        ⚠️ Không tìm thấy phim
      </div>
    );

  const currentVideo = selectedEpisode
    ? selectedEpisode.video_url
    : movie.link || movie.video || "";

  const isExternalLink =
    currentVideo.includes("dailymotion") ||
    currentVideo.includes("youtube") ||
    currentVideo.includes("youtu.be") ||
    currentVideo.includes("facebook.com");

  const videoSource = isExternalLink ? getEmbedUrl(currentVideo) : currentVideo;

  return (
    <>
      <Header />
      <div className={StreamPageStyle.container}>
        <div className={StreamPageStyle.box_stream_video}>
          <h1>{movie.title}</h1>

          <div className={StreamPageStyle.video_wrapper}>
            {isExternalLink ? (
              <iframe
                src={videoSource}
                allowFullScreen
                loading="lazy"
                allow="autoplay; fullscreen; picture-in-picture"
              ></iframe>
            ) : (
              <video
                key={selectedEpisode?.id || movie.id}
                src={videoSource}
                controls
                autoPlay
              ></video>
            )}
          </div>
        </div>

        <div className={StreamPageStyle.movie_details}>
          <p>
            <strong>Thời lượng:</strong> {movie.duration} phút
          </p>
          <p>
            <strong>Đánh giá:</strong> {movie.rating}/10
          </p>
          <p>
            <strong>Chất lượng:</strong> {movie.quality}
          </p>
          <p>
            <strong>Giới hạn tuổi:</strong> {movie.age}
          </p>
        </div>
        {episodes.length > 0 && (
          <div className={StreamPageStyle.episode_section}>
            <h2>Danh sách tập phim</h2>
            <div className={StreamPageStyle.episode_list}>
              {episodes.map((ep) => (
                <button
                  key={ep.id}
                  className={`${StreamPageStyle.episode_btn} ${
                    selectedEpisode?.id === ep.id ? StreamPageStyle.active : ""
                  }`}
                  onClick={() => setSelectedEpisode(ep)}
                >
                  Tập {ep.episode_number}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
