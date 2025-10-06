"use client";
import "./header.css";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <div className="container">
      <header>
        <div className="sticky_menu">
          <div className="left_menu">
            <div className="logo">
              <Image
                src="/assets/img/logo.png"
                alt="poster"
                width={30}
                height={30}
                className="poster"
              />
            </div>

            <ul>
              <li>
                <Link href="#">Trang chủ</Link>
              </li>

              <li className="has-megamenu">
                <Link href="#">Thể loại</Link>
                <div className="megamenu">
                  <div>
                    <h4>Hành động</h4>
                    <Link href="#">Võ thuật</Link>
                    <Link href="#">Siêu anh hùng</Link>
                    <Link href="#">Chiến tranh</Link>
                  </div>
                  <div>
                    <h4>Tình cảm</h4>
                    <Link href="#">Lãng mạn</Link>
                    <Link href="#">Gia đình</Link>
                    <Link href="#">Thanh xuân</Link>
                  </div>
                  <div>
                    <h4>Kinh dị</h4>
                    <Link href="#">Ma quái</Link>
                    <Link href="#">Tâm lý</Link>
                    <Link href="#">Trinh thám</Link>
                  </div>
                  <div>
                    <h4>Khác</h4>
                    <Link href="#">Hoạt hình</Link>
                    <Link href="#">Phiêu lưu</Link>
                    <Link href="#">Hài hước</Link>
                  </div>
                </div>
              </li>

              <li>
                <Link href="#">Phim lẻ</Link>
              </li>
              <li>
                <Link href="#">Phim tập</Link>
              </li>

              <li className="has-megamenu">
                <Link href="#">Quốc gia</Link>
                <div className="megamenu">
                  <div>
                    <h4>Châu Á</h4>
                    <Link href="#">Việt Nam</Link>
                    <Link href="#">Hàn Quốc</Link>
                    <Link href="#">Nhật Bản</Link>
                    <Link href="#">Trung Quốc</Link>
                  </div>
                  <div>
                    <h4>Châu Âu</h4>
                    <Link href="#">Anh</Link>
                    <Link href="#">Pháp</Link>
                    <Link href="#">Đức</Link>
                    <Link href="#">Nga</Link>
                  </div>
                  <div>
                    <h4>Châu Mỹ</h4>
                    <Link href="#">Mỹ</Link>
                    <Link href="#">Canada</Link>
                    <Link href="#">Brazil</Link>
                    <Link href="#">Mexico</Link>
                  </div>
                  <div>
                    <h4>Khác</h4>
                    <Link href="#">Ấn Độ</Link>
                    <Link href="#">Úc</Link>
                    <Link href="#">Thái Lan</Link>
                  </div>
                </div>
              </li>

              <li>
                <Link href="#">Hỗ trợ</Link>
              </li>
            </ul>
          </div>

          <div className="right_menu">
            <input type="checkbox" id="toggleSearch" hidden />
            <label htmlFor="toggleSearch" className="icon">
              <i className="fa-solid fa-magnifying-glass"></i>
            </label>
            <div className="search_box">
              <input type="text" placeholder="Tìm kiếm phim..." />
            </div>

            <i className="fa-solid fa-bell"></i>
            <Link href="/login">
              <i className="fa-solid fa-user"></i>
            </Link>

            <i className="fa-regular fa-sun"></i>
          </div>
        </div>
      </header>
    </div>
  );
}
