import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AUTHORIZED_DISTRIBUTOR_NAME } from "@/data/distributor";
import InquiryForm from "@/components/InquiryForm";
import FeaturedProduct from "@/components/home/FeaturedProduct";
import { FaWhatsapp } from "react-icons/fa";
import { client } from "@/sanity/lib/client";
import { ALL_CATEGORIES_QUERY, ALL_PROJECTS_QUERY, ALL_CERTIFICATIONS_QUERY } from "@/sanity/lib/queries";
import { mentionsIso } from "@/lib/iso";
import { urlFor } from "@/sanity/lib/image-url";

export default async function Home() {
  // Fetch data from Sanity
  const categories = await client.fetch(ALL_CATEGORIES_QUERY);
  const projects = await client.fetch(ALL_PROJECTS_QUERY);
  const certifications = (await client.fetch(ALL_CERTIFICATIONS_QUERY)).filter(
    (cert: { abbr?: string; name?: string; description?: string; standard?: string }) =>
      cert.standard !== "iso" &&
      !mentionsIso(cert.abbr ?? "") &&
      !mentionsIso(cert.name ?? "") &&
      !mentionsIso(cert.description ?? ""),
  );
  return (
    <>
      {/* ── HEADER ── */}
      <Header />

      {/* ── HERO ── */}
      <section className="hero" id="home">
        <div className="hero-bg" aria-hidden="true">
          <Image
            src="/hero4.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-bg-img"
          />
        </div>

        <div className="hero-newsletter">
          <div className="hn-label">Newsletter</div>
          <div className="hn-input-row">
            <input
              className="hn-input"
              type="email"
              placeholder="your@email.com"
            />
            <button className="hn-arrow">&#8594;</button>
          </div>
          <div className="hn-note">
            By signing up, I agree with the data protection policy of Pro
            Master.
          </div>
        </div>

        <div className="hero-text">
          <div className="hero-eyebrow">Trusted Supplier — UAE &amp; GCC</div>
          <h1 className="hero-h1">
            Construction chemicals
            <br />
            built for the
            <br />
            Gulf climate.
          </h1>
          <p className="hero-sub">
            Waterproofing, adhesives, coatings, and repair systems. Distributed
            across the GCC.
          </p>
          <Link href="/products" className="hero-cta">
            Explore Products &nbsp;&#8594;
          </Link>
        </div>
      </section>

      {/* ── PRODUCT SHOWCASE ── */}
      <div className="showcase" id="products">
        {categories.slice(0, 3).map((cat: any) => (
          <div className="showcase-col" key={cat._id}>
            <div className="sc-name">{cat.shortTitle || cat.title}</div>
            <div className="sc-tag">{cat.description}</div>
            <div className="sc-image">
              {cat.image?.asset ? (
                <img
                  src={urlFor(cat.image.asset).width(800).height(600).url()}
                  alt={cat.image.alt || cat.title}
                  className="sc-image-photo"
                />
              ) : (
                <div
                  className="img-ph"
                  style={{ width: "100%", height: "100%", minHeight: 260 }}
                >
                  <div className="img-ph-label">Product Image</div>
                </div>
              )}
            </div>
            <Link className="sc-link" href={`/products/${cat.slug.current}`}>
              View range &nbsp;&#8594;
            </Link>
          </div>
        ))}
      </div>

      {/* ── BRAND TYPE ── */}
      <div className="brand-type">
        <span className="brand-word">PRO</span>
        <span className="brand-word outline">MASTER</span>
        <div className="brand-type-logo">
          <Image
            src="/promaster-logo.png"
            alt="Pro Master logo"
            width={320}
            height={320}
            className="brand-type-logo-img"
          />
        </div>
      </div>

      <FeaturedProduct />

      {/* ── ABOUT ── */}
      <div className="about-split" id="about">
        <div className="about-left">
          <div className="about-img-top">
            <Image
              src="/home promaster.jpg"
              alt="Pro Master company site"
              width={1200}
              height={800}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="about-img-top-photo"
            />
          </div>
          <div className="about-stats">
            {[
              { num: "15+", lbl: "Years GCC" },
              { num: "200+", lbl: "Products" },
              { num: "500+", lbl: "Projects" },
            ].map(({ num, lbl }) => (
              <div className="about-stat" key={lbl}>
                <div className="as-num">{num}</div>
                <div className="as-lbl">{lbl}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-right">
          <div className="eyebrow">About Pro Master</div>
          <h2>Engineered for the GCC&apos;s toughest conditions.</h2>
          <p>
            UAE-based supplier of premium construction chemicals and building
            materials — serving contractors, developers, and distributors across
            the GCC for over 15 years.
          </p>
          <p>
            Every product is engineered to perform in the extreme heat,
            humidity, and saline conditions of the Gulf.
          </p>
          <p>
            Supplied in the UAE by{" "}
            <strong>{AUTHORIZED_DISTRIBUTOR_NAME}</strong>, authorized
            distributor for Pro Master construction chemicals.
          </p>
          <div className="about-list">
            {[
              "In-house testing laboratory for batch QC",
              "Technical support team available UAE-wide",
              "Full TDS, SDS, and project submittal support",
            ].map((item) => (
              <div className="al-item" key={item}>
                {item}
              </div>
            ))}
          </div>
          <Link href="/about" className="about-cta">
            Company Profile &nbsp;&#8594;
          </Link>
        </div>
      </div>

      {/* ── CERTIFICATIONS ── */}
      <div className="certs-row">
        {certifications.slice(0, 5).map((cert: any) => (
          <div className="cert-col" key={cert._id}>
            <div className="cert-abbr">{cert.abbr}</div>
            <div className="cert-name">{cert.name}</div>
            <div className="cert-desc">{cert.description}</div>
          </div>
        ))}
      </div>

      {/* ── RESOURCES ── */}
      <div className="resources-section" id="resources">
        <div className="resources-header">
          <div className="rh-left">
            <h2>
              Data Sheets
              <br />
              &amp; Documentation.
            </h2>
          </div>
          <div className="rh-right">
            <p>
              Access the full technical document library. All documents are free
              to download — no sign-up required. Updated weekly.
            </p>
          </div>
        </div>
        <div className="res-grid">
          {[
            {
              num: "200+",
              type: "PDF Library",
              title: "Technical Data Sheets",
              desc: "Product composition, mechanical properties, application method, mixing ratios, and performance data.",
              link: "Browse TDS",
              href: "/technical-data-sheets",
            },
            {
              num: "200+",
              type: "PDF Library",
              title: "Safety Data Sheets",
              desc: "GHS/SDS/MSDS documents — hazard info, handling, storage, and first aid for every product.",
              link: "Browse SDS",
            },
            {
              num: "12",
              type: "Guides",
              title: "Application Guides",
              desc: "Illustrated installation manuals for waterproofing systems, floor coatings, and repair mortars.",
              link: "Browse Guides",
            },
            {
              num: "8",
              type: "Marketing",
              title: "Product Brochures",
              desc: "Category and system brochures for submittal, specification, and client presentations.",
              link: "Browse",
            },
            // {
            //   num: "50+",
            //   type: "Certificates",
            //   title: "Test Reports",
            //   desc: "Third-party laboratory certificates issued under ASTM, EN, and UAE standard references.",
            //   link: "Browse",
            // },
            {
              num: "30+",
              type: "Case Studies",
              title: "Project Documentation",
              desc: "Documented applications on landmark UAE projects with performance data and consultant references.",
              link: "Browse",
            },
          ].map(({ num, type, title, desc, link, href }) => (
            <div className="res-col" key={title}>
              <div className="rc-num">{num}</div>
              <div className="rc-type">{type}</div>
              <div className="rc-title">{title}</div>
              <div className="rc-desc">{desc}</div>
              {href ? (
                <Link href={href} className="rc-link">
                  {link} &#8594;
                </Link>
              ) : (
                <span className="rc-link">{link} &#8594;</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── PROJECTS ── */}
      <div className="projects-section" id="projects">
        <div className="projects-header">
          <div className="ph-left">
            <h2>Featured Projects.</h2>
            <p>
              Specified and applied on landmark construction projects across the
              UAE and GCC.
            </p>
          </div>
          <div className="ph-right">
            <Link href="/projects">All Projects &#8594;</Link>
          </div>
        </div>

        <div className="proj-list">
          {projects.slice(0, 5).map((project: any, index: number) => (
            <div className="proj-row" key={project._id}>
              <div>
                <div className="pr-index">
                  {String(index + 1).padStart(2, '0')} / {project.location?.split(',')[0] || 'UAE'}
                </div>
              </div>
              <div>
                <div className="pr-name">{project.name}</div>
                <div className="pr-tags">
                  {project.projectType && (
                    <span className="pr-tag">{project.projectType}</span>
                  )}
                  {project.products?.slice(0, 2).map((prod: any) => (
                    <span className="pr-tag" key={prod._id}>
                      {prod.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pr-meta">{project.year || 'N/A'}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── INQUIRY ── */}
      <div className="inquiry-section" id="contact">
        <div className="inq-left">
          <div className="eyebrow">Get In Touch</div>
          <h2>
            How can we
            <br />
            help you?
          </h2>
          <p>
            Our team responds within one business day. Choose the inquiry type
            that best describes your need.
          </p>
          <div className="inq-types">
            {[
              "Product Inquiry",
              "Project Submittal / Approval Support",
              "Bulk Order Request",
              "Become a Distributor",
              "Technical Support",
              "Lab Testing / Certificate of Analysis",
            ].map((item) => (
              <div className="inq-type-row" key={item}>
                <span className="it-name">{item}</span>
                <span className="it-arrow">&#8594;</span>
              </div>
            ))}
          </div>
        </div>

        <InquiryForm />
      </div>

      <Footer />

      {/* ── FLOATING WHATSAPP ── */}
      <div className="wa-float">
        <div className="wa-pill">WhatsApp</div>
        <div className="wa-circle">
          <FaWhatsapp color="white" size={24} />
        </div>
      </div>
    </>
  );
}
