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
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url =
      activeTab === "login"
        ? "http://127.0.0.1:8000/api/login"
        : "http://127.0.0.1:8000/api/register";
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
      setMessage(data.message);

      if (res.ok && activeTab === "login") {
        // ví dụ: lưu user hoặc chuyển trang
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/dashboard"); // ví dụ
      }
    } catch (err) {
      setMessage("Lỗi kết nối server");
    }
  };

  return (
    <div className="login_page">
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
              onClick={() => setActiveTab("login")}
            >
              Đăng nhập
            </button>
            <button
              className={`tab ${activeTab === "signup" ? "active" : ""}`}
              onClick={() => setActiveTab("signup")}
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
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input"
                value={form.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                className="input"
                value={form.password}
                onChange={handleChange}
              />
              <button type="submit" className="btn">
                {activeTab === "login" ? "Login" : "Sign Up"}
              </button>
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
