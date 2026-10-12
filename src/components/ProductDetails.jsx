
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { productId } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState("5");
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("/products.json")
      .then((response) => {
        if (!response.ok) throw new Error("Products unavailable");
        return response.json();
      })
      .then((data) => setProducts(data.products || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const product = products.find(
    (item) => String(item.id) === productId
  );

  useEffect(() => {
    setActiveImage(0);
    setReviews([]);
  }, [productId]);

  if (loading) {
    return <div className="product-detail-status">Loading product...</div>;
  }

  if (!product) {
    return (
      <section className="product-detail-status">
        <h2>Product not found</h2>
        <Link to="/#products">Back to products</Link>
      </section>
    );
  }

  const imagePath = (path) =>
    path ? `/${path.replace(/^\//, "")}` : "";

  const images = [
    product.image,
    ...(product.images || []),
  ]
    .filter(Boolean)
    .filter((image, index, array) => array.indexOf(image) === index)
    .slice(0, 5);

  const submitReview = (event) => {
    event.preventDefault();

    if (!reviewName.trim() || !reviewText.trim()) return;

    setReviews((current) => [
      {
        id: Date.now(),
        name: reviewName.trim(),
        rating: Number(reviewRating),
        text: reviewText.trim(),
      },
      ...current,
    ]);

    setReviewName("");
    setReviewRating("5");
    setReviewText("");
  };

  const quote = () => {
    const message = `Hi TechFusion Tools, please share your best price for ${product.model} (${product.title}).`;

    window.open(
      `https://wa.me/919667095547?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <main className="product-detail-page">
      <div className="product-detail-container">
        <nav className="product-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/#products">Products</Link>
          <span>/</span>
          <span>{product.model}</span>
        </nav>

        <section className="product-detail-layout">
          <div className="product-gallery">
            <div className="product-gallery-main">
              <img
                src={imagePath(images[activeImage])}
                alt={product.model}
                onError={(event) => {
                  event.currentTarget.style.visibility = "hidden";
                }}
              />
            </div>

            <div className="product-gallery-thumbnails">
              {images.map((image, index) => (
                <button
                  key={image}
                  className={
                    activeImage === index
                      ? "product-gallery-thumb active"
                      : "product-gallery-thumb"
                  }
                  onClick={() => setActiveImage(index)}
                  type="button"
                  aria-label={`View product image ${index + 1}`}
                >
                  <img src={imagePath(image)} alt="" />
                </button>
              ))}
            </div>
          </div>

          <div className="product-detail-info">
            <span className="product-detail-category">
              {product.category}
            </span>

            <h1>{product.model}</h1>
            <p className="product-detail-subtitle">{product.title}</p>

            <div className="product-detail-rating">
              <span>★★★★★</span>
              <small>Customer reviews</small>
            </div>

            <p className="product-detail-description">
              {product.description ||
                `${product.model} — ${product.title}. Contact our team for product specifications, compatibility, availability and purchasing assistance.`}
            </p>

            <h3>Specifications</h3>
            <ul className="product-detail-specs">
              {(product.specs || []).map((spec) => (
                <li key={spec}>{spec}</li>
              ))}
            </ul>

            <button
              type="button"
              className="product-detail-quote"
              onClick={quote}
            >
              Request Best Price ↗
            </button>

            <p className="product-detail-help">
              Need more information? Contact our team for assistance.
            </p>
          </div>
        </section>

        <section className="product-reviews">
          <div>
            <span className="section-eyebrow">CUSTOMER FEEDBACK</span>
            <h2>Reviews & Comments</h2>
            <p className="product-reviews-note">
              Share your experience with this product.
              Reviews submitted here are currently visible only in this session.
            </p>
          </div>

          <form className="product-review-form" onSubmit={submitReview}>
            <label>
              Your name
              <input
                value={reviewName}
                onChange={(event) => setReviewName(event.target.value)}
                placeholder="Enter your name"
                required
              />
            </label>

            <label>
              Rating
              <select
                value={reviewRating}
                onChange={(event) => setReviewRating(event.target.value)}
              >
                <option value="5">★★★★★ - Excellent</option>
                <option value="4">★★★★ - Good</option>
                <option value="3">★★★ - Average</option>
                <option value="2">★★ - Below average</option>
                <option value="1">★ - Poor</option>
              </select>
            </label>

            <label>
              Your review
              <textarea
                value={reviewText}
                onChange={(event) => setReviewText(event.target.value)}
                placeholder="Write your product feedback..."
                rows={4}
                required
              />
            </label>

            <button className="product-detail-quote" type="submit">
              Submit Review
            </button>
          </form>

          <div className="product-review-list">
            {reviews.length === 0 ? (
              <p>No reviews submitted in this session yet.</p>
            ) : (
              reviews.map((review) => (
                <article key={review.id} className="product-review-item">
                  <div className="product-review-heading">
                    <strong>{review.name}</strong>
                    <span>{"★".repeat(review.rating)}</span>
                  </div>
                  <p>{review.text}</p>
                </article>
              ))
            )}
          </div>
        </section>

        <Link className="product-back-link" to="/#products">
          ← Back to all products
        </Link>
      </div>
    </main>
  );
}
