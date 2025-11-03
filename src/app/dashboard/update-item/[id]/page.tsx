"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import "../update-item.css";

export default function UpdateItem() {
  const { id } = useParams();

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
    status: "",
    movieTrend: "",
    category: "",
    is_banner: "",
  });

  const [poster, setPoster] = useState(null);
  const [cover, setCover] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/movies/${id}`);
        if (!res.ok) throw new Error("Không lấy được dữ liệu phim");
        const data = await res.json();

        setForm({
          title: data.title || "",
          description: data.description || "",
          year: data.year || "",
          duration: data.duration || "",
          quality: data.quality || "FullHD",
          age: data.age || "",
          country: data.country || "",
          genre: data.genre || "",
          link: data.link || "",
          status: data.status === "hidden" ? "hidden" : "active",
          movieTrend: data.movieTrend || "",
          category: data.category || "",
          is_banner: data.is_banner || "",
        });

        if (data.poster)
          setPoster(
            data.poster.startsWith("http")
              ? data.poster
              : `http://127.0.0.1:8000/storage/${data.poster}`
          );
        if (data.cover)
          setCover(
            data.cover.startsWith("http")
              ? data.cover
              : `http://127.0.0.1:8000/storage/${data.cover}`
          );
      } catch (err) {
        console.error(err);
        setMessage("Lỗi khi tải dữ liệu phim!");
      }
    }
    if (id) fetchMovie();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePoster = (e) => setPoster(e.target.files[0]);
  const handleCover = (e) => setCover(e.target.files[0]);
  const handleVideo = (e) => setVideo(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value)
      );

      formData.append("_method", "PUT");
      if (poster instanceof File) formData.append("poster", poster);
      if (cover instanceof File) formData.append("cover", cover);
      if (video instanceof File) formData.append("video", video);

      const res = await fetch(`http://127.0.0.1:8000/api/movies/${id}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Cập nhật thất bại");
      const data = await res.json();
      setMessage(" Cập nhật thành công!");
      console.log("Updated:", data);
    } catch (err) {
      console.error(err);
      setMessage(" Lỗi khi cập nhật phim!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-page">
      <form onSubmit={handleSubmit}>
        <div className="header">
          <h1> Update Movie</h1>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>

        {message && <p className="message">{message}</p>}

        <div className="form-wrapper">
          {/* Poster */}
          <div className="upload-box">
            <label htmlFor="poster" className="upload-area small">
              {poster ? (
                <img
                  src={
                    typeof poster === "string"
                      ? poster
                      : URL.createObjectURL(poster)
                  }
                  alt="Poster"
                  className="preview"
                />
              ) : (
                <span>Tải poster</span>
              )}
            </label>
            <input type="file" id="poster" onChange={handlePoster} hidden />
          </div>

          <div className="form-content">
            <div className="form-group">
              <label>Tiêu đề</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Nhập tiêu đề"
              />
            </div>

            <div className="form-group">
              <label>Mô tả</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Mô tả ngắn"
              />
            </div>

            <div className="grid-row">
              <div>
                <label>Năm</label>
                <input
                  type="number"
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Thời lượng (phút)</label>
                <input
                  type="number"
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Chất lượng</label>
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
                <label>Độ tuổi</label>
                <input
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="16+"
                />
              </div>
            </div>

            <div className="grid-row">
              <div>
                <label>Nước</label>
                <input
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="USA"
                />
              </div>
              <div>
                <label>Thể loại</label>
                <input
                  name="genre"
                  value={form.genre}
                  onChange={handleChange}
                  placeholder="Action, Drama..."
                />
              </div>
            </div>

            <div className="grid-row">
              <div>
                <label>Upload Video</label>
                <input type="file" accept="video/*" onChange={handleVideo} />
              </div>
              <div>
                <label>Hoặc Link</label>
                <input
                  name="link"
                  value={form.link}
                  onChange={handleChange}
                  placeholder="https://example.com/video.mp4"
                />
              </div>
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
              <label>banner</label>
              <select
                name="is_banner"
                value={form.is_banner}
                onChange={handleChange}
              >
                <option value="banner">banner</option>
                <option value="notbanner">notbanner</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
