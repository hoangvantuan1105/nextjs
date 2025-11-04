"use client";

import { useEffect, useState } from "react";
import { FaLock, FaEye, FaEdit, FaTrashAlt, FaStar } from "react-icons/fa";
import "./movies.css";
import Link from "next/link";
import axios from "axios";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      const res = await fetch("https://tuanhoang.io.vn/api/movies");
      const data = await res.json();
      setMovies(data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);
  const handleDelete = async (id, title) => {
    if (!confirm(`Bạn có chắc muốn xóa phim "${title}" không?`)) return;

    try {
      await axios.delete(`https://tuanhoang.io.vn/movies/${id}`);
      alert("Xóa phim thành công!");
      setMovies((prev) => prev.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa phim:", error);
      alert("Xóa thất bại!");
    }
  };

  return (
    <div className="movie-page">
      <div className="top_title">
        <h1>Movie management</h1>
        <Link href="/dashboard/add-item">
          <button className="btn-add">+ Add Movie</button>
        </Link>
      </div>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <table className="movie-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên phim</th>
              <th>Điểm</th>
              <th>Thể loại</th>
              <th>Lượt xem</th>
              <th>Trạng thái</th>
              <th>Ngày tạo</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {movies.length > 0 ? (
              movies.map((m) => (
                <tr key={m.id}>
                  <td>{m.id}</td>
                  <td>{m.title}</td>
                  <td>
                    <FaStar className="icon-star" /> {m.rating || "N/A"}
                  </td>
                  <td>{m.genre || "Không rõ"}</td>
                  <td>{m.views || 0}</td>
                  <td style={{ color: m.status === "active" ? "#0f9" : "red" }}>
                    {m.status === "active" ? "Active" : "Hidden"}
                  </td>

                  <td>{m.created_at ? m.created_at.slice(0, 10) : "--"}</td>
                  <td className="actions">
                    <FaLock className="icon lock" title="Lock" />
                    <Link href={`/dashboard/read-item/${m.id}`}>
                      {" "}
                      <FaEye className="icon eye" title="View" />
                    </Link>
                    <Link href={`/dashboard/update-item/${m.id}`}>
                      <FaEdit className="icon edit" title="Edit" />
                    </Link>

                    <FaTrashAlt
                      className="icon delete"
                      title="Delete"
                      onClick={() => handleDelete(m.id, m.title)}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={{ textAlign: "center" }}>
                  Không có phim nào để hiển thị.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
