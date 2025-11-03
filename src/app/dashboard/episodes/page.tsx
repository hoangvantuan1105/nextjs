"use client";
import { useState, useEffect } from "react";
import StyleAddEpisode from "./episode.module.css";

export default function AddEpisode() {
  const [movies, setMovies] = useState<{ id: number; title: string }[]>([]);
  const [form, setForm] = useState({
    movie_id: "",
    episode_number: "",
    title: "",
    duration: "",
    video_url: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/movies");
        const data = await res.json();
        setMovies(data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách phim:", error);
      }
    };
    fetchMovies();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.movie_id) {
      setMessage(" Vui lòng chọn phim trước khi thêm tập!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("movie_id", form.movie_id);
      formData.append("episode_number", form.episode_number);
      formData.append("title", form.title);
      formData.append("duration", form.duration);
      formData.append("video_url", form.video_url);

      const res = await fetch("https://tuanhoang.io.vn/backend/api/episodes", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Lỗi khi thêm tập phim");
      const data = await res.json();

      setMessage(" Tập phim đã được thêm thành công!");
      console.log("Response:", data);

      setForm({
        movie_id: "",
        episode_number: "",
        title: "",
        duration: "",
        video_url: "",
      });
    } catch (err) {
      console.error(err);
      setMessage(" Có lỗi khi thêm tập phim!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={StyleAddEpisode.add_episode}>
      <form onSubmit={handleSubmit}>
        <div className={StyleAddEpisode.header}>
          <h1> Thêm Tập Phim</h1>
          <button type="submit" disabled={loading}>
            {loading ? "Đang lưu..." : "Lưu Tập Phim"}
          </button>
        </div>

        {message && <p className={StyleAddEpisode.message}>{message}</p>}

        <div className={StyleAddEpisode.form}>
          <div className={StyleAddEpisode.group}>
            <label>Chọn Phim</label>
            <select
              name="movie_id"
              value={form.movie_id}
              onChange={handleChange}
              required
            >
              <option value="">-- Chọn phim --</option>
              {movies.map((movie) => (
                <option key={movie.id} value={movie.id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>

          <div className={StyleAddEpisode.group}>
            <label>Số Tập</label>
            <input
              type="number"
              name="episode_number"
              value={form.episode_number}
              onChange={handleChange}
              required
              placeholder="VD: 1"
            />
          </div>

          <div className={StyleAddEpisode.group}>
            <label>Thời lượng (phút)</label>
            <input
              name="duration"
              value={form.duration}
              onChange={handleChange}
              placeholder="VD: 24"
            />
          </div>

          <div className={StyleAddEpisode.group}>
            <label>Video URL</label>
            <input
              name="video_url"
              value={form.video_url}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>
        </div>
      </form>
    </div>
  );
}
