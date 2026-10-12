
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css";

const filters = [
  "All",
  "Soldering Solutions",
  "SMD Rework Solutions",
  "2-in-1 Stations",
  "Electronics Repair Tools",
  "Industrial Tools & Equipment",
];

const labelFor = (s) =>
  s === "All"
    ? "ALL"
    : s.replace(" Solutions", "").replace(" Tools & Equipment", "").replace(" Stations", "");

export default function Products({
  selectedCategory,
  onCategoryConsumed,
}) {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch("/products.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load products");
        }
        return response.json();
      })
      .then((data) => {
        if (!cancelled) {
          setProducts(Array.isArray(data.products) ? data.products : []);
        }
      })
      .catch((error) => {
        console.error("Products loading error:", error);
        if (!cancelled) setProducts([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;

    setFilter(filters.includes(selectedCategory) ? selectedCategory : "All");
    onCategoryConsumed?.();
  }, [selectedCategory, onCategoryConsumed]);

  const visible = useMemo(() => {
    const searchText = query.trim().toLowerCase();

    return products.filter((product) => {
      const categoryMatches =
        filter === "All" || product.category === filter;

      const searchableText = [
        product.id,
        product.model,
        product.title,
        product.category,
        product.description || "",
        ...(product.specs || []),
      ]
        .join(" ")
        .toLowerCase();

      return categoryMatches && searchableText.includes(searchText);
    });
  }, [products, filter, query]);

  const quote = (product) => {
    const message = product
      ? `Hi TechFusion Tools, please share your best price for ${product.model} (${product.title}).`
      : "Hi TechFusion Tools, I would like to request the best price for your products.";

    window.open(
      `https://wa.me/919667095547?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const imagePath = (image) =>
    image ? `/${image.replace(/^\//, "")}` : "/assets/products/p05.jpg";

  const openDetails = (product) => {
    navigate(`/product/${encodeURIComponent(product.id)}`);
  };

  if (loading) {
    return (
      <section className="products-section section-wrap" id="products">
        <p className="product-count">Loading products...</p>
      </section>
    );
  }

  return (
    <section className="products-section section-wrap" id="products">
      <div className="products-top">
        <div className="section-title">
          <span className="section-eyebrow">
            {products.length} PRODUCTS AVAILABLE
          </span>
          <h2>
            FIND YOUR <em>RIGHT TOOL.</em>
          </h2>
        </div>

        <label className="product-search">
          <span>⌕</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search product, model or specification..."
            aria-label="Search products"
          />
        </label>

        <div className="filter-pills">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              className={filter === item ? "filter-pill active" : "filter-pill"}
              onClick={() => setFilter(item)}
            >
              {labelFor(item)}
            </button>
          ))}
        </div>
      </div>

      <div className="product-count">
        {visible.length} product{visible.length === 1 ? "" : "s"} found
      </div>

      {visible.length > 0 && (
        <div className="product-grid">
          {visible.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-media">
                <img
                  src={imagePath(product.image)}
                  alt={product.model}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = "/assets/products/p05.jpg";
                  }}
                />
              </div>

              <div className="product-body">
                <span className="product-category">
                  <i />
                  {product.category}
                </span>

                <h3>{product.model}</h3>
                <p>{product.title}</p>

                <div className="spec-chips">
                  {(product.specs || []).slice(0, 2).map((spec) => (
                    <span key={spec}>{spec}</span>
                  ))}
                </div>

                <button
                  type="button"
                  className="quote-button"
                  onClick={() => quote(product)}
                >
                  🛒 &nbsp; GET BEST PRICE
                </button>

                <button
                  type="button"
                  className="details-button"
                  onClick={() => openDetails(product)}
                >
                  VIEW DETAILS <b>↗</b>
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {visible.length === 0 && (
        <div className="empty-products">
          <h3>No products found</h3>
          <p>Try another search term or category.</p>
          <button
            type="button"
            onClick={() => {
              setFilter("All");
              setQuery("");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}
