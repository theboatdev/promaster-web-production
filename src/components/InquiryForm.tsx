"use client";

import { useState, FormEvent } from "react";

const initialFormData = {
  name: "",
  company: "",
  phone: "",
  email: "",
  inquiryType: "Product Inquiry",
  message: "",
};

export default function InquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState(initialFormData);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        setFormData(initialFormData);
        setSubmitted(true);
        return;
      }

      setError(
        data?.message ??
          "Something went wrong. Please try again or contact us directly.",
      );
    } catch {
      setError(
        "Unable to send your message. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    if (error) {
      setError(null);
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  if (submitted) {
    return (
      <div
        className="inq-right"
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            className="di-cat"
            style={{ marginBottom: 12 }}
          >
            Message Sent
          </div>

          <p
            style={{
              fontSize: 14,
              color: "var(--black)",
              lineHeight: 1.8,
            }}
          >
            Thank you. Our team will respond within one business day.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="inq-right">
      <form onSubmit={handleSubmit}>
        <div className="form-section-label">
          Send a Message
        </div>

        <div className="form-row-2">
          <div className="form-group">
            <label className="form-field-label">Full Name</label>

            <input
              name="name"
              type="text"
              value={formData.name}
              placeholder="Eng. Ahmed Al Mansouri"
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label className="form-field-label">Company</label>

            <input
              name="company"
              type="text"
              value={formData.company}
              placeholder="Your Company LLC"
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="form-row-2">
          <div className="form-group">
            <label className="form-field-label">Phone / WhatsApp</label>

            <input
              name="phone"
              type="tel"
              value={formData.phone}
              placeholder="+971 5X XXX XXXX"
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label className="form-field-label">Email</label>

            <input
              name="email"
              type="email"
              value={formData.email}
              placeholder="you@company.com"
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-field-label">Inquiry Type</label>

          <select
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            disabled={isSubmitting}
          >
            <option>Product Inquiry</option>
            <option>Project Submittal</option>
            <option>Bulk Order</option>
            <option>Distributor Partnership</option>
            <option>Technical Support</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-field-label">Message</label>

          <textarea
            name="message"
            value={formData.message}
            placeholder="Tell us about your project..."
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="form-footer">
          <div className="form-note">
            By submitting, I agree with the data
            protection policy of Pro Master.
          </div>

          <button
            type="submit"
            className={`form-submit-btn${isSubmitting ? " form-submit-btn--loading" : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending…" : "→"}
          </button>
        </div>
      </form>
    </div>
  );
}