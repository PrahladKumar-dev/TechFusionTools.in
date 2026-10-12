
import { useEffect, useState, useCallback } from "react";
import "./HeroSlider.css";

const heroSlides = [
  {
    image: "/assets/hero/hero-soldering-stations.webp",
    alt: "Professional digital soldering stations and electronics repair tools",
    eyebrow: "PRECISION FOR EVERY REPAIR",
    titleStart: "BETTER TOOLS.",
    titleAccent: "BETTER RESULTS.",
    description:
      "Explore professional soldering stations, temperature-controlled tools, and dependable equipment built for accurate electronics repair.",
  },
  {
    image: "/assets/hero/hero-precision-irons.webp",
    alt: "Precision soldering irons arranged on a brushed metal work surface",
    eyebrow: "CONTROL IN EVERY DETAIL",
    titleStart: "PRECISION",
    titleAccent: "THAT PERFORMS.",
    description:
      "Find precision soldering irons for detailed circuit work, component replacement, maintenance, and everyday workshop tasks.",
  },
  {
    image: "/assets/hero/hero-hot-air-rework.webp",
    alt: "Digital hot-air rework and soldering equipment on a professional workbench",
    eyebrow: "BUILT FOR TECHNICIANS",
    titleStart: "REPAIR SMARTER.",
    titleAccent: "WORK FASTER.",
    description:
      "Discover hot-air rework systems and versatile repair equipment designed to support efficient, consistent electronics servicing.",
  },
  {
    image: "/assets/hero/hero-inspection-microscopes.webp",
    alt: "Digital inspection microscopes used for electronics and circuit-board inspection",
    eyebrow: "SEE EVERY DETAIL",
    titleStart: "CLEARER VIEWS.",
    titleAccent: "BETTER WORK.",
    description:
      "Inspect circuit boards and tiny components with digital microscopes and visual inspection tools made for precision work.",
  },
  {
    image: "/assets/hero/hero-electronics-workbench.webp",
    alt: "Electronics repair workbench with soldering equipment, multimeter, tools, and circuit board",
    eyebrow: "YOUR WORKSHOP, EQUIPPED",
    titleStart: "EVERYDAY TOOLS.",
    titleAccent: "PRO RESULTS.",
    description:
      "From soldering and testing to component handling, explore practical tools and accessories for a well-equipped electronics bench.",
  },
];

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState("right");
  const [animationId, setAnimationId] = useState(0);

  const showSlide = useCallback(
    (index, preferredDirection) => {
      const nextIndex =
        (index + heroSlides.length) % heroSlides.length;

      if (nextIndex === active) return;

      const nextDirection =
        preferredDirection ||
        (nextIndex > active ? "right" : "left");

      setDirection(nextDirection);
      setAnimationId((id) => id + 1);
      setActive(nextIndex);
    },
    [active]
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDirection("right");
      setAnimationId((id) => id + 1);
      setActive((current) => (current + 1) % heroSlides.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, []);

  const slide = heroSlides[active];
  const animationClass =
    direction === "right"
      ? "slide-from-right"
      : "slide-from-left";

  return (
    <section
      className="hero-section"
      id="home"
      aria-label="Featured tools"
    >
      <div className="hero-shell">
        {/* TEXT: animates on every slide change */}
        <div
          className={`hero-copy ${animationClass}`}
          key={`copy-${animationId}`}
        >
          <span className="eyebrow">{slide.eyebrow}</span>

          <h1>
            {slide.titleStart}
            <br />
            <em>{slide.titleAccent}</em>
          </h1>

          <p>{slide.description}</p>

          <div className="hero-actions">
            <a className="button button-primary" href="#contact">
              <span aria-hidden="true">🛒</span>
              GET BEST PRICE
              <span aria-hidden="true">→</span>
            </a>

            <a className="button button-outline" href="#products">
              VIEW PRODUCTS
              <span aria-hidden="true">●</span>
            </a>
          </div>

          <div className="trust-points">
            <div>
              <b aria-hidden="true">◇</b>
              <span>
                PROFESSIONAL
                <br />
                GRADE TOOLS
              </span>
            </div>

            <div>
              <b aria-hidden="true">♧</b>
              <span>
                RELIABLE
                <br />
                PERFORMANCE
              </span>
            </div>

            <div>
              <b aria-hidden="true">⚙</b>
              <span>
                WIDE RANGE
                <br />
                OF CATEGORIES
              </span>
            </div>
          </div>
        </div>

        {/* IMAGE AND SLIDER CONTROLS */}
        <div className="hero-visual">
          <div className="hero-halo" aria-hidden="true" />

          <div
            className={`hero-main-image ${animationClass}`}
            key={`image-${animationId}`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              fetchPriority={active === 0 ? "high" : "auto"}
            />
          </div>

          <button
            className="hero-arrow hero-prev"
            type="button"
            onClick={() => showSlide(active - 1, "left")}
            aria-label="Previous featured image"
          >
            ‹
          </button>

          <button
            className="hero-arrow hero-next"
            type="button"
            onClick={() => showSlide(active + 1, "right")}
            aria-label="Next featured image"
          >
            ›
          </button>

          <div
            className="hero-thumbnails"
            aria-label="Choose featured image"
          >
            {heroSlides.map((item, index) => (
              <button
                key={item.image}
                type="button"
                className={index === active ? "thumb active" : "thumb"}
                onClick={() =>
                  showSlide(index, index > active ? "right" : "left")
                }
                aria-label={`Show ${item.eyebrow.toLowerCase()}`}
                aria-pressed={index === active}
              >
                <img src={item.image} alt="" loading="lazy" />
              </button>
            ))}
          </div>

          <div
            className="hero-dots"
            aria-label="Featured image pagination"
          >
            {heroSlides.map((item, index) => (
              <button
                key={item.image}
                type="button"
                onClick={() =>
                  showSlide(index, index > active ? "right" : "left")
                }
                className={index === active ? "dot active" : "dot"}
                aria-label={`Go to image ${index + 1}`}
                aria-current={index === active ? "true" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
