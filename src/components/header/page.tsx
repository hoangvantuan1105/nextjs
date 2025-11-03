"use client";
import { useState } from "react";
import Link from "next/link";
import { Play } from "lucide-react";
import headerStyle from "./header.module.css";

const Navbar = () => {
  const [active, setActive] = useState(false);

  return (
    <div className={headerStyle.nav_wrapper}>
      <div className={headerStyle.container}>
        <div className={headerStyle.nav}>
          <Link href="/" className={headerStyle.logo}>
            <Play className={headerStyle.main_color} size={28} />
            ha<span className={headerStyle.main_color}>v</span>en
          </Link>

          <ul
            className={`${headerStyle.nav_menu} ${
              active ? headerStyle.active : ""
            }`}
            id="nav_menu"
          >
            <li>
              <Link href="#">Home</Link>
            </li>
            <li>
              <Link href="#">Genre</Link>
            </li>
            <li>
              <Link href="#">Movies</Link>
            </li>
            <li>
              <Link href="/route_menu/series">Series</Link>
            </li>
            <li>
              <Link href="#">About</Link>
            </li>
            <li>
              <Link
                href="/login"
                className={`${headerStyle.btn} ${headerStyle.btn_hover}`}
              >
                <span>Sign in</span>
              </Link>
            </li>
          </ul>

          <div
            className={`${headerStyle.hamburger_menu} ${
              active ? headerStyle.active : ""
            }`}
            id="hamburger_menu"
            onClick={() => setActive(!active)}
          >
            <div className={headerStyle.hamburger}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
