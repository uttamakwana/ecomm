import "./footer.css";
import { BiLogoPlayStore } from "react-icons/bi";
import { LiaAppStore } from "react-icons/lia";
import {
  AiFillInstagram,
  AiFillGithub,
  AiFillTwitterCircle,
} from "react-icons/ai";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <h2>Download our app</h2>
        <p>Download it for Android and iOS mobile phone</p>
        <div className="footer-logo-icons flex-center">
          <BiLogoPlayStore className="footer-links-icon" />
          <LiaAppStore className="footer-links-icon" />
        </div>
      </div>
      <div className="footer-content">
        <h2>TrendHaven</h2>
        <p>
          <strong>Quality</strong> is our first priority
        </p>
        <p>Copyright 2023 @Uttam Makwana</p>
      </div>
      <div className="footer-links">
        <h3>Follow Us</h3>
        <div className="links">
          <AiFillGithub className="footer-links-icon" />
          <AiFillInstagram className="footer-links-icon" />
          <AiFillTwitterCircle className="footer-links-icon" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
