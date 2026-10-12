
import "./Contact.css";

const PHONE_DISPLAY = "+91 96670 95547";
const PHONE_LINK = "+919667095547";

const WHATSAPP_LINK =
  "https://wa.me/919667095547?text=Hi%20TechFusion%20Tools%2C%20I%20would%20like%20product%20details%20and%20pricing.";

const EMAIL = "techfusiontools@gmail.com";

export default function Contact() {
  return (
    <section
      className="contact-section section-wrap"
      id="contact"
    >
      <div className="contact-heading">
        <span className="section-eyebrow">
          CONTACT TECHFUSION TOOLS
        </span>

        <h2>NEED A PRODUCT OR QUOTE?</h2>

        <p>
          Contact our team for product details, pricing,
          and help choosing the right tools for your work.
        </p>
      </div>

      <div className="contact-layout">
        <div className="contact-details">
          {/* Call */}
          <div className="contact-info-card">
            <span className="contact-icon">☎</span>

            <div>
              <h3>Call Us</h3>
              <p>Speak with us about products and pricing.</p>

              <a href={`tel:${PHONE_LINK}`}>
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="contact-info-card">
            <span className="contact-icon">☏</span>

            <div>
              <h3>WhatsApp Us</h3>
              <p>Message us for product details and quotes.</p>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
              >
                Chat on WhatsApp ↗
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="contact-info-card">
            <span className="contact-icon">✉</span>

            <div>
              <h3>Email Us</h3>
              <p>Send us your product enquiry.</p>

              <a href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
            </div>
          </div>

          {/* Address */}
          <div className="contact-info-card">
            <span className="contact-icon">⌖</span>

            <div>
              <h3>Our Address</h3>

              <p className="contact-address">
                Shop No. 25, 3rd Floor,
                <br />
                Sukh Shant Complex,
                <br />
                Mangal Pandey Nagar,
                <br />
                Meerut – 250004,
                <br />
                Uttar Pradesh, India
              </p>
            </div>
          </div>

          {/* GSTIN */}
          <div className="contact-gstin">
            <span>GSTIN</span>
            <strong>09AEEPT2190N1ZW</strong>
          </div>
        </div>

        {/* Enquiry panel */}
        <div className="contact-panel">
          <span className="section-eyebrow">
            LET'S FIND YOUR TOOL
          </span>

          <h2>NEED A PRICE OR PRODUCT SUGGESTION?</h2>

          <p>
            Tell us what you need and our team can help you
            explore suitable options.
          </p>

          <div className="contact-actions">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="contact-primary"
            >
              CHAT ON WHATSAPP <span>↗</span>
            </a>

            <a
              href={`mailto:${EMAIL}?subject=Product%20Quote%20Request`}
              className="contact-secondary"
            >
              GET A QUOTE <span>↗</span>
            </a>

            <a
              href="#products"
              className="contact-browse"
            >
              BROWSE PRODUCTS <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
