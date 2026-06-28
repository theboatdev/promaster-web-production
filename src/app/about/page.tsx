import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AUTHORIZED_DISTRIBUTOR_NAME } from "@/data/distributor";
import { getProductCategories } from "@/data/productCategories";
import { getSanityImageUrl } from "@/sanity/lib/image-url";

export const metadata: Metadata = {
  title: "About Us | Pro Master Construction Products",
  description:
    "Pro Master is a dedicated manufacturer of high-performance sealants and adhesives for construction, installation and maintenance across the UAE and GCC.",
};

const brandPromise = [
  {
    num: "01",
    title: "Premium performance",
    desc: "Suitable for professional use.",
  },
  {
    num: "02",
    title: "Durability",
    desc: "Engineered for tough construction environments.",
  },
  {
    num: "03",
    title: "Value-focused solutions",
    desc: "That support cost efficiency on every project.",
  },
];

const coreProductCategories = [
  {
    title: "Sealants",
    desc: "High-flexibility and long-lasting solutions designed for construction joints, façades, windows, doors, interiors and general maintenance applications.",
  },
  {
    title: "Adhesives",
    desc: "Strong bonding adhesives engineered for various substrates including metal, ceramic, PVC, wood, concrete and composite materials.",
  },
  {
    title: "Specialty Construction Essentials",
    desc: "Professional products designed for repair, installation and finishing work, supporting accuracy, speed and durability on-site.",
  },
];

const differentiators = [
  {
    title: "Engineered for UAE Climate Conditions",
    desc: "All products undergo rigorous testing to ensure performance under heat, humidity, dust and UV exposure common in Gulf environments.",
  },
  {
    title: "Professional-Grade Reliability",
    desc: "Trusted by contractors, technicians and project teams for strength, stability and predictable application performance.",
  },
  {
    title: "High Value for Large-Scale Use",
    desc: "Cost-effective for daily use, bulk purchasing and project-based consumption, without compromising on quality.",
  },
  {
    title: "Suitable for B2B and B2C",
    desc: "Designed for both professional construction environments and everyday repair needs in residential and commercial settings.",
  },
  {
    title: "Consistent Supply & Regional Availability",
    desc: "Pro Master ensures steady stock levels and dependable distribution to meet the fast-moving demands of UAE construction projects.",
  },
];

const industries = [
  "Contracting and civil works",
  "Fit-out and interior installation",
  "MEP and maintenance services",
  "Facility management",
  "Real estate and property development",
  "Industrial workshops",
];

const qualityCommitment = [
  "High adhesion strength",
  "Smooth application with clean finishing",
  "Long-lasting sealing performance",
  "Fast-curing properties for time-sensitive projects",
  "High resistance to heat, moisture and environmental stress",
];

const coreStrengths = [
  "Multi-surface bonding reliability",
  "UV and weather resistance",
  "Professional finish",
  "Durable performance indoors and outdoors",
  "Cost-efficient for high-volume use",
  "Designed for easy and clean application",
];

export default async function AboutPage() {
  const categories = await getProductCategories();
  const sortedCategories = [...categories].sort(
    (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0),
  );
  const categoriesWithImages = sortedCategories
    .map((category) => ({
      category,
      imageUrl: getSanityImageUrl(category.image, {
        width: 800,
        height: 600,
        fit: "crop",
      }),
    }))
    .filter(
      (entry): entry is { category: (typeof sortedCategories)[number]; imageUrl: string } =>
        Boolean(entry.imageUrl),
    );

  return (
    <>
      <Header />

      <main className="page-main page-main--bg page-main--category-listing about-page">
        <header className="category-listing-header">
          <p className="mb-3 font-[family-name:var(--font)] text-[11px] font-bold uppercase tracking-[0.13em] text-[var(--pm-red)]">
            About
          </p>
          <h1 className="mb-4 text-[clamp(28px,4vw,40px)] font-black uppercase leading-none tracking-[-0.04em] text-[var(--black)]">
            Company Profile
          </h1>
          <p className="text-sm leading-[1.7] text-[var(--black)]">
            Sealants, adhesives, and construction essentials engineered for the
            UAE and GCC.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block font-[family-name:var(--font)] text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--pm-red)] transition-opacity hover:opacity-75"
          >
            ← Back to home
          </Link>
        </header>

        <div className="about-page__content">
          {/* ── ABOUT US ── */}
          <section className="about-page__section">
            <h2 className="about-page__heading">About Us</h2>
            <div className="about-page__hero">
              <Image
                src="/promaster company building.png"
                alt="Pro Master construction team on site"
                width={1600}
                height={900}
                priority
                sizes="100vw"
                className="about-page__hero-img"
              />
            </div>
            <div className="about-page__text">
              <p>
                Pro Master is a dedicated manufacturer of high-performance
                sealants and adhesives engineered to support modern construction,
                installation and maintenance requirements across the UAE and GCC
                region. Designed with advanced formulations and proven
                durability, Pro Master products deliver the performance
                professionals rely on for demanding job sites and fast-paced
                project timelines.
              </p>
              <p>
                From large-scale developments to everyday installation work, Pro
                Master stands for reliability, strength and long-lasting results.
              </p>
              <p>
                In the UAE, Pro Master products are supplied by{" "}
                <strong>{AUTHORIZED_DISTRIBUTOR_NAME}</strong>, our authorized
                distributor.
              </p>
            </div>
          </section>

          {/* ── VISION & MISSION ── */}
          <section className="about-page__section">
            <div className="about-page__vm-grid">
              <div>
                <h2 className="about-page__heading">Vision</h2>
                <div className="about-page__text">
                  <p>
                    To establish Pro Master as a leading regional and international
                    brand recognized for delivering high-performance sealants and
                    adhesives that meet global construction standards and support the
                    needs of professionals worldwide.
                  </p>
                </div>
              </div>
              <div className="about-page__vm-divider" aria-hidden="true" />
              <div>
                <h2 className="about-page__heading">Mission</h2>
                <div className="about-page__text">
                  <p>
                    To deliver dependable, high-quality sealants and adhesives that
                    enhance construction performance and provide long-term value for
                    professionals and consumers worldwide.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── BRAND PROMISE ── */}
          <section className="about-page__section">
            <h2 className="about-page__heading">Our Brand Promise</h2>
            <p className="about-page__text about-page__text--intro">
              Pro Master brings together:
            </p>
            <ul className="about-page__promise-grid">
              {brandPromise.map(({ num, title, desc }) => (
                <li className="about-page__promise-card" key={num}>
                  <span className="about-page__promise-num">{num}</span>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </li>
              ))}
            </ul>
            <p className="about-page__text">
              This balance makes Pro Master a trusted brand among contractors,
              retailers and end-users across the UAE.
            </p>
          </section>

          {/* ── CORE PRODUCT CATEGORIES ── */}
          <section className="about-page__section">
            <h2 className="about-page__heading">Our Core Product Categories</h2>
            <div className="about-page__category-list">
              {coreProductCategories.map(({ title, desc }) => (
                <article className="about-page__category-item" key={title}>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </article>
              ))}
            </div>
            {categoriesWithImages.length > 0 && (
              <div className="about-page__category-grid">
                {categoriesWithImages.map(({ category, imageUrl }) => (
                  <figure className="about-page__category-tile" key={category._id}>
                    <img
                      src={imageUrl}
                      alt={category.image?.alt || category.title}
                      className="about-page__category-tile-photo"
                    />
                    <figcaption className="about-page__category-tile-label">
                      {category.shortTitle || category.title}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </section>

          {/* ── WHAT SETS PRO MASTER APART ── */}
          <section className="about-page__section">
            <h2 className="about-page__heading">What Sets Pro Master Apart</h2>
            <ul className="about-page__checklist">
              {differentiators.map(({ title, desc }) => (
                <li className="about-page__checklist-item" key={title}>
                  <span className="about-page__check" aria-hidden="true">
                    ✓
                  </span>
                  <div>
                    <strong>{title}</strong>
                    <p>{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* ── INDUSTRIES & QUALITY ── */}
          <section className="about-page__section">
            <div className="about-page__split-grid">
              <div>
                <h2 className="about-page__heading">Industries We Serve</h2>
                <p className="about-page__text about-page__text--intro">
                  Pro Master supports multiple construction and repair segments,
                  including:
                </p>
                <ul className="about-page__bullet-grid">
                  {industries.map((industry) => (
                    <li className="about-page__bullet-item" key={industry}>
                      {industry}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="about-page__heading">Quality Commitment</h2>
                <p className="about-page__text about-page__text--intro">
                  Every Pro Master product is manufactured to deliver:
                </p>
                <ul className="about-page__bullet-list">
                  {qualityCommitment.map((item) => (
                    <li className="about-page__bullet-item" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="about-page__text">
                  Our strict quality control processes ensure that products meet
                  regional requirements and industry expectations.
                </p>
              </div>
            </div>
          </section>

          {/* ── CORE STRENGTHS ── */}
          <section className="about-page__section about-page__section--last">
            <h2 className="about-page__heading">Core Strengths</h2>
            <ul className="about-page__bullet-grid">
              {coreStrengths.map((strength) => (
                <li className="about-page__bullet-item" key={strength}>
                  {strength}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
