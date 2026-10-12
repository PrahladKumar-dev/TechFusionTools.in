
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <a className="footer-brand" href="#home" aria-label="TechFusion Tools Home">
          <img
            src="/assets/logo-emblem.svg"
            alt=""
            className="footer-logo-emblem"
          />

          <img
            src="/assets/logo-wordmark-continuous.svg"
            alt="TechFusion"
            className="footer-logo-wordmark"
          />

          <img
            src="/assets/logo-tools-fixed.svg"
            alt="Tools"
            className="footer-logo-tools"
          />
        </a>

        <p>
          Professional electronics tools for soldering, rework,
          inspection and repair.
        </p>

        <div className="footer-social">
          <a
            href="https://www.instagram.com/techfusiontools?mdxt=OGlnNzhsOHlmdTBu"
            target="_blank"
            rel="noreferrer"
          >
            Instagram ↗
          </a>

          <a
            href="https://www.facebook.com/share/1DztwoaH87/"
            target="_blank"
            rel="noreferrer"
          >
            Facebook ↗
          </a>

          <a
            href="https://share.google/dViZtXDCpfFBzqkbI"
            target="_blank"
            rel="noreferrer"
          >
            Google ↗
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} TechFusion Tools. All rights reserved.
        </span>

        <div>
          <a href="#home">Back to top ↑</a>
          <a href="/admin.html">Admin</a>
        </div>
      </div>
    </footer>
  );
}
