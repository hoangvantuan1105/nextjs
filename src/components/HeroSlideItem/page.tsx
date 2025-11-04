"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "../../components/globals.css";
import { useEffect, useState } from "react";

interface Movie {
  id: number;
  title: string;
  movie_banner: string;
  rating: string;
  duration: string;
  quality: string;
  age: string;
  description: string;
  movieTrend: string;
  is_banner: string;
}

export default function HeroSlide() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://tuanhoang.io.vn/api/movies")
      .then((res) => res.json())
      .then((data) => {
        const bannerMovies = data.filter(
          (movie: Movie) => movie.is_banner === "banner"
        );
        setMovies(bannerMovies);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi tải phim:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Đang tải banner...</div>;
  if (movies.length === 0) return <div>Không có banner nào</div>;

  return (
    <section className="section" id="hero">
      <Swiper
        modules={[Autoplay, Navigation]}
        slidesPerView={1}
        navigation
        loop
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        className="hero-carousel owl-theme"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="hero-slide-item">
              <div className="hero-slide-item-bg">
                <Image
                  src={movie.movie_banner}
                  alt={movie.title}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>

              <div className="overlay"></div>
              <div className="hero-slide-item-content">
                <div className="item-content-wraper">
                  <div className="item-content-title">{movie.title}</div>

                  <div className="movie-infos">
                    <div className="movie-info">
                      <i className="bx bxs-star"></i>
                      <span>{movie.rating || "N/A"}</span>
                    </div>
                    <div className="movie-info">
                      <i className="bx bxs-time"></i>
                      <span>{movie.duration || "?"}</span>
                    </div>
                    <div className="movie-info">
                      <span>{movie.quality || "?"}</span>
                    </div>
                    <div className="movie-info">
                      <span>{movie.age || "?"}</span>
                    </div>
                  </div>

                  <div className="item-content-description">
                    {movie.description}
                  </div>

                  <div className="item-action">
                    <Link
                      href={`/stream/${movie.id}`}
                      className="btn btn-hover"
                    >
                      <i className="bx bxs-right-arrow"></i>
                      <span>Xem ngay</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
