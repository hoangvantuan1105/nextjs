"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../../components/globals.css";
import Link from "next/link";
interface Movie {
  id: number;
  title: string;
  poster: string;
  rating: number;
  duration: string;
  quality: string;
  age: string;
  movieTrend: string;
}

export default function TopMoviesSlide() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://tuanhoang.io.vn/api/movies")
      .then((res) => res.json())
      .then((data) => {
        const trendMovies = data.filter(
          (movie: Movie) => movie.movieTrend === "Trend"
        );
        setMovies(trendMovies);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi tải phim:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Đang tải phim...</div>;

  if (movies.length === 0) return <div>Không có phim nào đang thịnh hành </div>;

  return (
    <div className="top-movies-slide section">
      <div className="container">
        <h2 className="section-header">Phim Thịnh Hành</h2>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          spaceBetween={20}
          slidesPerView={5}
          breakpoints={{
            320: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          className="movie-swiper"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <Link href={`/stream/${movie.id}`}>
                <div className="movie-item">
                  <img src={movie.poster} alt={movie.title} />
                  <div className="movie-item-content">
                    <div className="movie-item-title">{movie.title}</div>
                    <div className="movie-infos">
                      <div className="movie-info">
                        <i className="bx bxs-star"></i>
                        <span>{movie.rating}</span>
                      </div>
                      <div className="movie-info">
                        <i className="bx bxs-time"></i>
                        <span>{movie.duration}</span>
                      </div>
                      <div className="movie-info">
                        <span>{movie.quality}</span>
                      </div>
                      <div className="movie-info">
                        <span>{movie.age}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
