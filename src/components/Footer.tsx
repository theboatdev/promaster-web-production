import Link from "next/link";
import BackToTop from "@/components/BackToTop";
import { getCategoryHref, getProductCategories } from "@/data/productCategories";

export default async function Footer() {
  const categories = await getProductCategories();
  const sortedCategories = [...categories].sort(
    (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0),
  );

  return (
    <>
      <div className="pre-footer">
        <div className="pre-footer-brand">PRO MASTER</div>

        <div className="pf-newsletter">
          <div className="pf-nl-title">
            Subscribe to the
            <br />
            Pro Master Newsletter
          </div>
          <div className="pf-nl-sub">
            Latest product launches, technical updates, and project news direct
            to your inbox.
          </div>
          <div className="pf-input-row">
            <input
              className="pf-input"
              type="email"
              placeholder="your@email.com"
            />
            <button className="pf-arrow">&#8594;</button>
          </div>
          <div className="pf-nl-note">
            By signing up, I agree with the data protection policy of Pro
            Master.
          </div>
        </div>

        <div className="pf-col">
          <h4>Products</h4>
          <nav className="pf-links" aria-label="Product categories">
            <Link href="/products">All Products</Link>
            {sortedCategories.map((category) => (
              <Link href={getCategoryHref(category)} key={category._id}>
                {category.shortTitle ?? category.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="pf-col">
          <h4>Company</h4>
          <div className="pf-links">
            <Link href="/about">About</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/distributors">Distributors</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/#contact">Contact</Link>
          </div>
        </div>

        <div className="pf-col">
          <h4>Resources</h4>
          <div className="pf-links">
            <Link href="/technical-data-sheets">Technical Data Sheets</Link>
            {[
              "Safety Data Sheets",
              "Application Guides",
              "Downloads",
              "Newsletter",
            ].map((label) => (
              <a href="#" key={label}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bar">
        <div className="footer-bar__legal">
          <span>Pro Master Construction Products LLC</span>
        </div>
        <span>© {new Date().getFullYear()} All rights reserved.</span>
        <BackToTop />
      </div>
    </>
  );
}
