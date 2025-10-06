import "./footer.css";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTelegram,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="#">Get the Omni App</a>
        <a href="#">Help</a>
        <a href="#">Site Index</a>
        <a href="#">Omni Pro</a>
        <a href="#">Advertising</a>
        <a href="#">Omni Developer</a>
        <a href="#">Jobs</a>
        <a href="#">Privacy Policy</a>
      </div>
      <div className="footer-socials">
        <a href="#">
          <FaFacebook />
        </a>
        <a href="#">
          <FaInstagram />
        </a>
        <a href="#">
          <FaLinkedin />
        </a>
        <a href="#">
          <FaYoutube />
        </a>
        <a href="#">
          <FaTelegram />
        </a>
      </div>
    </footer>
  );
}
