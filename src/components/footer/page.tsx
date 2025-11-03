"use client";

import Image from "next/image";
import Link from "next/link";
import "./footer.css";
import { Play } from "lucide-react";
export default function Footer() {
  return (
    <footer className="section footer">
      <div className="container">
        <div className="row">
          <div className="col-4 col-md-6 col-sm-12">
            <div className="content">
              <Link href="/" className="logo">
                <Play className="main-color bx-tada" size={28} />
                ha<span className="main-color">v</span>en
              </Link>
              <p>
                haven là nền tảng xem phim trực tuyến với kho nội dung phong
                phú, chất lượng cao và nhiều gói xem phù hợp với mọi người.
              </p>
              <div className="social-list">
                <Link href="#" className="social-item">
                  <i className="bx bxl-facebook"></i>
                </Link>
                <Link href="#" className="social-item">
                  <i className="bx bxl-twitter"></i>
                </Link>
                <Link href="#" className="social-item">
                  <i className="bx bxl-instagram"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-8 col-md-6 col-sm-12">
            <div className="row">
              <div className="col-3 col-md-6 col-sm-6">
                <div className="content">
                  <p>
                    <b>haven</b>
                  </p>
                  <ul className="footer-menu">
                    <li>
                      <Link href="#">Về chúng tôi</Link>
                    </li>
                    <li>
                      <Link href="#">Hồ sơ của tôi</Link>
                    </li>
                    <li>
                      <Link href="#">Gói dịch vụ</Link>
                    </li>
                    <li>
                      <Link href="#">Liên hệ</Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-3 col-md-6 col-sm-6">
                <div className="content">
                  <p>
                    <b>Khám phá</b>
                  </p>
                  <ul className="footer-menu">
                    <li>
                      <Link href="#">Phim mới</Link>
                    </li>
                    <li>
                      <Link href="#">Phim lẻ</Link>
                    </li>
                    <li>
                      <Link href="#">Phim bộ</Link>
                    </li>
                    <li>
                      <Link href="#">Top thịnh hành</Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-3 col-md-6 col-sm-6">
                <div className="content">
                  <p>
                    <b>Hỗ trợ</b>
                  </p>
                  <ul className="footer-menu">
                    <li>
                      <Link href="#">Trung tâm trợ giúp</Link>
                    </li>
                    <li>
                      <Link href="#">Điều khoản sử dụng</Link>
                    </li>
                    <li>
                      <Link href="#">Chính sách bảo mật</Link>
                    </li>
                    <li>
                      <Link href="#">Câu hỏi thường gặp</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 haven. Tất cả các quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}
