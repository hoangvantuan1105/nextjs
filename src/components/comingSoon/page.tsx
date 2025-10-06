"use client";

import { useState } from "react";
import Image from "next/image";
import "./comingSoon.css";

// Component nhỏ hiển thị thông tin phim
function MovieInfo({
  title,
  genre,
  duration,
  release,
  desc,
  onBook,
}: {
  title: string;
  genre: string;
  duration: string;
  release: string;
  desc: string;
  onBook?: () => void;
}) {
  return (
    <div className="movie-info">
      <h2>{title}</h2>
      <p>
        <strong>Thể loại:</strong> {genre}
      </p>
      <p>
        <strong>Thời lượng:</strong> {duration}
      </p>
      <p>
        <strong>Khởi chiếu:</strong> {release}
      </p>
      <p>{desc}</p>
      <div className="movie-buttons">
        <button onClick={onBook}>Đặt lịch</button>
      </div>
    </div>
  );
}

export default function MovieDetail() {
  // danh sách phim
  const movies = [
    {
      id: 1,
      title: "Tiên Nghịch",
      genre: "Fantasy, Action",
      duration: "45 phút",
      release: "2025",
      desc: "Một thiếu niên bình thường dấn thân vào con đường tu tiên, đối mặt với nghịch cảnh để thay đổi số phận.",
      video: "/assets/video/pham.mp4",
      img: "/assets/img/tien_nghich.jpg",
    },
    {
      id: 2,
      title: "Phàm Nhân Tu Tiên",
      genre: "Huyền Huyễn, Phiêu lưu",
      duration: "40 phút",
      release: "2024",
      desc: "Câu chuyện về Hàn Lập, một người phàm quyết tâm tu tiên và vượt qua mọi gian khó để trở thành cường giả.",
      video: "/assets/video/pham.mp4",
      img: "/assets/img/pham_nhan_tu_tien.jpg",
    },
    {
      id: 3,
      title: "Già Thiên",
      genre: "Tiên Hiệp, Hành động",
      duration: "50 phút",
      release: "2023",
      desc: "Một thiếu niên mang theo bí mật cổ xưa, bước vào thế giới tiên hiệp đầy huyền bí và nguy hiểm.",
      video: "/assets/video/pham.mp4",
      img: "/assets/img/gia_thien.jpg",
    },
  ];

  // state: phim đang chọn
  const [currentMovie, setCurrentMovie] = useState(movies[0]);

  return (
    <div className="movie-detail-page">
      <h1>Sắp chiếu</h1>

      <div className="movie-top">
        {/* Trailer */}
        <div className="movie-trailer">
          <video key={currentMovie.id} controls>
            <source src={currentMovie.video} type="video/mp4" />
          </video>
        </div>

        {/* Info */}
        <MovieInfo
          title={currentMovie.title}
          genre={currentMovie.genre}
          duration={currentMovie.duration}
          release={currentMovie.release}
          desc={currentMovie.desc}
          onBook={() => alert(`Đặt lịch: ${currentMovie.title}`)}
        />
      </div>

      {/* chọn phim */}
      <div className="movie-bottom">
        <h3>Chọn phim</h3>
        <div className="gallery">
          {movies.map((m) => (
            <Image
              key={m.id}
              src={m.img}
              alt={m.title}
              width={250}
              height={350}
              onClick={() => setCurrentMovie(m)}
              className={`clickable ${
                currentMovie.id === m.id ? "active-movie" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
