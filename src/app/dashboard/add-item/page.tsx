"use client";
import { useState } from "react";
import "./add-item.css";

import { useRouter } from "next/navigation";
export default function AddItem() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    year: "",
    duration: "",
    quality: "FullHD",
    age: "",
    country: "",
    genre: "",
    link: "",
    status: "active",
    episode: "",
    movieTrend: "",
    category: "",
    is_banner: "",
    movie_banner: "",
  });

  const [poster, setPoster] = useState<File | null>(null);
  const [movieBanner, setMovieBanner] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePoster = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setPoster(e.target.files[0]);
  };

  const handleMovieBanner = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setMovieBanner(e.target.files[0]);
  };

  const handleVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setVideo(e.target.files[0]);
  };
  const router = useRouter();

  const handleAddEpisode = () => {
    router.push("/dashboard/episodes/");
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (poster) formData.append("poster", poster);
      if (movieBanner) formData.append("movie_banner", movieBanner);
      if (video) formData.append("video", video);

      const res = await fetch("http://127.0.0.1:8000/api/movies", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to create movie");

      const data = await res.json();
      console.log("Uploaded:", data);
      setMessage(" Thêm phim thành công!");

      setForm({
        title: "",
        description: "",
        year: "",
        duration: "",
        quality: "FullHD",
        age: "",
        country: "",
        genre: "",
        link: "",
        status: "active",
        episode: "",
        movieTrend: "",
        category: "",
        is_banner: "",
        movie_banner: "",
      });
      setPoster(null);
      setMovieBanner(null);
      setVideo(null);
    } catch (err) {
      console.error(err);
      setMessage("Lỗi khi thêm phim!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-page">
      <form onSubmit={handleSubmit}>
        <div className="header">
          <h1>New Movie</h1>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Đang lưu..." : "Publish"}
          </button>
        </div>

        {message && <p className="message">{message}</p>}
        <div className="">
          <h3> Quản lý tập phim</h3>
          <button
            type="button"
            className="btn-secondary"
            onClick={handleAddEpisode}
          >
            Thêm tập mới
          </button>
        </div>
        <div className="form-wrapper">
          <div className="upload-box">
            <label htmlFor="poster" className="upload-area small">
              {poster ? (
                <img
                  src={URL.createObjectURL(poster)}
                  alt="Poster Preview"
                  className="preview"
                />
              ) : (
                <span>
                  Upload Poster
                  <br />
                  (Optional)
                </span>
              )}
            </label>

            <input type="file" id="poster" onChange={handlePoster} hidden />
          </div>

          <div className="upload-box">
            <label htmlFor="movie_banner" className="upload-area small">
              {movieBanner ? (
                <img
                  src={URL.createObjectURL(movieBanner)}
                  alt="Banner Preview"
                  className="preview"
                />
              ) : (
                <span>
                  Upload Banner
                  <br />
                  (Nếu có)
                </span>
              )}
            </label>
            <input
              type="file"
              id="movie_banner"
              onChange={handleMovieBanner}
              hidden
            />
          </div>

          <div className="form-content">
            <div className="form-group">
              <label>Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter movie title..."
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter movie description..."
              />
            </div>

            <div className="grid-row">
              <div>
                <label>year</label>
                <input
                  type="number"
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>duration (min)</label>
                <input
                  type="number"
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>quality</label>
                <select
                  name="quality"
                  value={form.quality}
                  onChange={handleChange}
                >
                  <option>FullHD</option>
                  <option>HD</option>
                  <option>4K</option>
                </select>
              </div>
              <div>
                <label>age</label>
                <input
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="16+"
                />
              </div>
              <div>
                <label>episode</label>
                <input
                  name="episode"
                  value={form.episode}
                  onChange={handleChange}
                  placeholder="eps1, eps2..."
                />
              </div>
            </div>

            <div className="grid-row">
              <div>
                <label>country</label>
                <input
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="USA, UK..."
                />
              </div>
              <div>
                <label>genre</label>
                <input
                  name="genre"
                  value={form.genre}
                  onChange={handleChange}
                  placeholder="Action, Sci-fi..."
                />
              </div>
            </div>

            <div className="form-group">
              <label>Link</label>
              <input
                type="url"
                name="link"
                value={form.link}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>

            <div className="form-group">
              <label>Upload video</label>
              <input type="file" accept="video/*" onChange={handleVideo} />
              {video && (
                <video
                  src={URL.createObjectURL(video)}
                  controls
                  width="250"
                  style={{ marginTop: "10px", borderRadius: "8px" }}
                />
              )}
            </div>

            <div className="form-group">
              <label>Trend</label>
              <select
                name="movieTrend"
                value={form.movieTrend}
                onChange={handleChange}
              >
                <option value="Trend">Trend</option>
                <option value="NotTrend">NotTrend</option>
              </select>
            </div>
            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="series">series</option>
                <option value="featureFilm">feature film</option>
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="active">active</option>
                <option value="hidden">hidden</option>
              </select>
            </div>
            <div className="form-group">
              <label>Banner</label>
              <select
                name="is_banner"
                value={form.is_banner}
                onChange={handleChange}
              >
                <option value="notbanner">notbanner</option>
                <option value="banner">banner</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
