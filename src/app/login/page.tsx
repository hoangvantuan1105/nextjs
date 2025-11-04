"use client";
import { useState } from "react";
import "./login.css";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const url =
      activeTab === "login"
        ? "https://tuanhoang.io.vn/api/login"
        : "https://tuanhoang.io.vn/api/register";

    const payload =
      activeTab === "login"
        ? { email: form.email, password: form.password }
        : {
            name: form.name,
            email: form.email,
            password: form.password,
            password_confirmation: form.password_confirmation,
          };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setMessage(data.message || "Thành công!");

        router.push("/dashboard");
      } else {
        if (res.status === 422 && data.errors) {
          const firstError = Object.values(data.errors)[0] as string[];
          setMessage(firstError[0]);
        } else {
          setMessage(data.message || "Có lỗi xảy ra");
        }
      }
    } catch (err) {
      setMessage("Không thể kết nối tới server");
      setLoading(false);
    }
  };

  const handleTabChange = (tab: "login" | "signup") => {
    setActiveTab(tab);
    setMessage("");
  };

  return (
    <div className="login_page">
      <video className="bg-video" autoPlay loop muted playsInline>
        <source src="/assets/video/login_movie.mp4" type="video/mp4" />
      </video>

      {/* ✅ Lớp phủ mờ */}
      <div className="overlay"></div>

      <i
        className="fa-solid fa-arrow-left cursor-pointer"
        onClick={() => router.back()}
      ></i>

      <div className="page">
        <div className="left">
          <h1 className="title">Chào mừng</h1>

          <div className="tabs">
            <button
              className={`tab ${activeTab === "login" ? "active" : ""}`}
              onClick={() => handleTabChange("login")}
            >
              Đăng nhập
            </button>
            <button
              className={`tab ${activeTab === "signup" ? "active" : ""}`}
              onClick={() => handleTabChange("signup")}
            >
              Đăng ký
            </button>
          </div>

          <div className="form-box">
            <form onSubmit={handleSubmit}>
              {activeTab === "signup" && (
                <input
                  type="text"
                  name="name"
                  placeholder="Họ và tên"
                  className="input"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              )}

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                className="input"
                value={form.password}
                onChange={handleChange}
                required
              />

              {activeTab === "signup" && (
                <input
                  type="password"
                  name="password_confirmation"
                  placeholder="Xác nhận mật khẩu"
                  className="input"
                  value={form.password_confirmation}
                  onChange={handleChange}
                  required
                />
              )}

              <button type="submit" className="btn_login" disabled={loading}>
                {loading
                  ? "Đang xử lý..."
                  : activeTab === "login"
                  ? "Đăng nhập"
                  : "Đăng ký"}
              </button>
            </form>

            {message && <p className="text-center mt-3">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
