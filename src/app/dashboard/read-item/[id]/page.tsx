"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaStar, FaPlay } from "react-icons/fa";
import "../read-item.css";

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/movies/${id}`);
        if (!res.ok) throw new Error("Không tìm thấy phim");
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error("Lỗi khi tải phim:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <p className="loading">Đang tải dữ liệu...</p>;
  if (!movie) return <p className="error">Không tìm thấy phim!</p>;

  return (
    <div className="movie-detail-page">
      <div className="top_title">
        <h1>Chi tiết phim</h1>
      </div>

      <div className="movie-detail-card">
        <div className="poster-section">
          {movie.poster ? (
            <img src={movie.poster} alt={movie.title} className="poster-img" />
          ) : (
            <div className="poster-placeholder">Không có ảnh</div>
          )}
        </div>

        <div className="info-section">
          <h2>{movie.title}</h2>
          <p className="desc">{movie.description}</p>

          <div className="info-grid">
            <div>
              <strong>Năm:</strong> {movie.year || "Không rõ"}
            </div>
            <div>
              <strong>Thời lượng:</strong> {movie.duration} phút
            </div>
            <div>
              <strong>Chất lượng:</strong> {movie.quality}
            </div>
            <div>
              <strong>Độ tuổi:</strong> {movie.age}
            </div>
            <div>
              <strong>Quốc gia:</strong> {movie.country}
            </div>
            <div>
              <strong>Thể loại:</strong> {movie.genre}
            </div>
            <div>
              <strong>Link:</strong>{" "}
              <a
                href={movie.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#334155" }}
              >
                🔗 Xem
              </a>
            </div>
          </div>

          <div className="rating">
            <FaStar className="star" /> <span>{movie.rating || "Chưa có"}</span>
          </div>

          {movie.video ? (
            <video controls className="movie-video">
              <source src={movie.video} type="video/mp4" />
              Trình duyệt không hỗ trợ video.
            </video>
          ) : (
            <p className="no-video">Không có video để xem.</p>
          )}
        </div>
      </div>
    </div>
  );
}
