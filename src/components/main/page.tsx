"use client";
import { useState, useRef } from "react";
import Tab_choose_geren from "./tab_choose_geren";
import "./main.css";
import Image from "next/image";
import Link from "next/link";
// ================= MovieCard Component =================
function MovieCard({
  poster,
  video,
  title,
  geren,
}: {
  poster: string;
  video: string;
  title: string;
  geren: string;
}) {
  const [hover, setHover] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleEnter = () => {
    setHover(true);
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.currentTime = 0;
      setTimeout(() => videoRef.current?.play(), 50);
    }
  };

  const handleLeave = () => {
    setHover(false);
    videoRef.current?.pause();
    if (videoRef.current) videoRef.current.currentTime = 0;
  };

  return (
    <div className="grid">
      <div
        className="movie"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <Image
          className="poster"
          src={poster}
          alt={title}
          width={300}
          height={200}
          sizes="100vw"
          unoptimized
        />

        {hover && (
          <div className="popup-card">
            <video
              ref={videoRef}
              className="popup-video"
              src={video}
              muted
              loop
              playsInline
              autoPlay
            />
            <div className="popup-info">
              <h3>{title}</h3>
              <p>{geren}</p>
              <div className="btns">
                <Link href="/stream">
                  {" "}
                  <button className="btn">▶ Play</button>
                </Link>
                <button className="btn secondary">＋ My List</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ================= Main Page =================
export default function Main() {
  const genres = [
    { className: "Huyền huyễn" },
    { className: "Tiên hiệp" },
    { className: "Hiện đại" },
    { className: "Xuyên không" },
  ];

  const movieTrend = [
    {
      poster: "/assets/img/gia_thien.jpg",
      video: "/assets/video/pham.mp4",
      title: "Gia Thiên",
      geren: "Huyền huyễn",
    },
    {
      poster: "/assets/img/gia_thien.jpg",
      video: "/assets/video/pham.mp4",
      title: "Phim ",
      geren: "Huyền huyễn",
    },
    {
      poster: "/assets/img/gia_thien.jpg",
      video: "/assets/video/pham.mp4",
      title: "Phim 3",
      geren: "Huyền huyễn",
    },
    {
      poster: "/assets/img/gia_thien.jpg",
      video: "/assets/video/pham.mp4",
      title: "Phim 3",
      geren: "Huyền huyễn",
    },
    {
      poster: "/assets/img/gia_thien.jpg",
      video: "/assets/video/pham.mp4",
      title: "Phim 3",
      geren: "Huyền huyễn",
    },
  ];

  const banners = [
    {
      id: 1,
      img: "/assets/img/home_bn1.png",
      title: "The Dark Knight",
      description:
        "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham",
    },
    {
      id: 2,
      img: "/assets/img/home_bn2.png",
      title: "John Wick ",
      description:
        "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom..",
    },
    {
      id: 3,
      img: "/assets/img/home_bn3.png",
      title: "Spider-man",
      description:
        "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong...",
    },
  ];

  const [selectedMovie, setSelectedMovie] = useState(banners[0]);

  return (
    <div className="container">
      {/* Banner */}
      <section>
        <div
          className="background_banner"
          style={{ backgroundImage: `url(${selectedMovie.img})` }}
        >
          <div className="content_bn">
            <div className="main_content">
              <h1>{selectedMovie.title}</h1>
              <p>{selectedMovie.description}</p>
            </div>
            <div className="btn_hero_bn">
              <Link href="/stream" className="watch_movie_btn">
                <i className="fa-solid fa-play"></i>
                <span>Xem ngay</span>
              </Link>
              <Link href="/infoMovie" className="more_info">
                <span>Xem thông tin</span>
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>

        <div className="movie_gallery">
          {banners.map((movie) => (
            <div
              key={movie.id}
              className="movie_item"
              onClick={() => setSelectedMovie(movie)}
            >
              <Image
                src={movie.img}
                alt={movie.title}
                width={200}
                height={120}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Thịnh hành */}
      <section>
        <div className="box_film_trend">
          <div className="title_home">
            <h2>Thịnh hành</h2>
            <Link href="/detail" className="see_more">
              Xem thêm →
            </Link>
          </div>
        </div>
        <div className="movies_wrapper">
          {movieTrend.map((m, i) => (
            <MovieCard
              key={i}
              poster={m.poster}
              video={m.video}
              title={m.title}
              geren={m.geren}
            />
          ))}
        </div>
      </section>

      {/* Phim lẻ */}
      <section>
        <div className="box_movies">
          <div className="title_home">
            <h2>Phim lẻ</h2>
            <Link href="/detail" className="see_more">
              Xem thêm →
            </Link>
          </div>
          <div className="genres" id="genres">
            {genres.map((g, index) => (
              <Tab_choose_geren
                key={index}
                className="btn_geren"
                onSelectGeren={() => console.log("Bạn chọn:", g.className)}
              >
                {g.className}
              </Tab_choose_geren>
            ))}
          </div>
          <div className="movies_wrapper">
            {movieTrend.map((m, i) => (
              <MovieCard
                key={i}
                poster={m.poster}
                video={m.video}
                title={m.title}
                geren={m.geren}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Golden Globe */}
      <section>
        <div className="golden_globe">
          <Image
            src="/assets/img/Golden_Globe.png"
            alt="Golden Globe"
            width={1440}
            height={576}
          />
        </div>
      </section>

      {/* Phim bộ */}
      <section>
        <div className="box_movies">
          <div className="title_home">
            <h2>Phim bộ</h2>
            <Link className="see_more" href="/detail">
              Xem thêm →
            </Link>
          </div>
          <div className="genres" id="genres">
            {genres.map((g, index) => (
              <Tab_choose_geren
                key={index}
                className="btn_geren"
                onSelectGeren={() => console.log("Bạn chọn:", g.className)}
              >
                {g.className}
              </Tab_choose_geren>
            ))}
          </div>
          <div className="movies_wrapper">
            {movieTrend.map((m, i) => (
              <MovieCard
                key={i}
                poster={m.poster}
                video={m.video}
                title={m.title}
                geren={m.geren}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Gói cước */}
      <section className="plans_section">
        <div className="plan_card">
          <h3>Di động</h3>
          <p className="price">74.000đ / tháng</p>
          <ul>
            <li>480p</li>
            <li>Điện thoại, máy tính bảng</li>
            <li>1 thiết bị xem cùng lúc</li>
            <li>1 thiết bị tải xuống</li>
          </ul>
          <button className="btn_plan">Đăng ký</button>
        </div>

        <div className="plan_card">
          <h3>Cơ bản</h3>
          <p className="price">114.000đ / tháng</p>
          <ul>
            <li>720p (HD)</li>
            <li>TV, máy tính, điện thoại</li>
            <li>1 thiết bị xem cùng lúc</li>
            <li>1 thiết bị tải xuống</li>
          </ul>
          <button className="btn_plan">Đăng ký</button>
        </div>

        <div className="plan_card popular">
          <div className="tag">Phổ biến nhất</div>
          <h3>Cao cấp</h3>
          <p className="price">273.000đ / tháng</p>
          <ul>
            <li>4K + HDR</li>
            <li>Âm thanh không gian</li>
            <li>4 thiết bị xem cùng lúc</li>
            <li>6 thiết bị tải xuống</li>
          </ul>
          <button className="btn_plan">Đăng ký</button>
        </div>
      </section>

      {/* Collection */}
      <section>
        <div className="box_collection">
          <h2>Sưu tập</h2>
          <div className="box_img_coll">
            {[1, 2, 3, 4].map((_, i) => (
              <div className="stack" key={i}>
                <div className="photo">
                  <Image
                    className="photo-img"
                    src="/assets/img/pham_nhan_tu_tien.jpg"
                    alt="Ảnh 1"
                    width={150}
                    height={200}
                  />
                </div>
                <div className="photo">
                  <Image
                    className="photo-img"
                    src="/assets/img/gia_thien.jpg"
                    alt="Ảnh 2"
                    width={150}
                    height={200}
                  />
                </div>
                <div className="photo">
                  <Image
                    className="photo-img"
                    src="/assets/img/the_gioi_hoan_my.jpg"
                    alt="Ảnh 3"
                    width={150}
                    height={200}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
