"use client";

import { useId, useState } from "react";
import type { Career } from "@/types/career";
import { getCareerApplyMailto } from "@/data/careers";

type CareerCardProps = {
  career: Career;
  index: number;
};

function formatCareerIndex(index: number, location: string) {
  return `${String(index).padStart(2, "0")} / ${location}`;
}

export default function CareerCard({ career, index }: CareerCardProps) {
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();

  return (
    <article
      className={`career-card${expanded ? " career-card--expanded" : ""}`}
    >
      <div className="career-card__header">
        <div className="career-card__index">
          {formatCareerIndex(index, career.location)}
        </div>

        <div className="career-card__intro">
          <h2 className="career-card__title">{career.title}</h2>
          <p className="career-card__summary">{career.summary}</p>
        </div>

        <ul className="career-card__tags" aria-label="Role details">
          <li>
            <span className="career-card__tag">{career.department}</span>
          </li>
          <li>
            <span className="career-card__tag">{career.employmentType}</span>
          </li>
          {career.tags.map((tag) => (
            <li key={tag}>
              <span className="career-card__tag">{tag}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="career-card__actions">
        <button
          type="button"
          className="career-card__toggle"
          aria-expanded={expanded}
          aria-controls={detailsId}
          onClick={() => setExpanded((open) => !open)}
        >
          {expanded ? "Hide role details" : "View role details"}
          <span className="career-card__toggle-arrow" aria-hidden="true">
            &#8594;
          </span>
        </button>

        <a
          href={getCareerApplyMailto(career)}
          className="career-card__apply"
        >
          Apply now &nbsp;&#8594;
        </a>
      </div>

      <div
        id={detailsId}
        className="career-card__details"
        hidden={!expanded}
      >
        <div className="career-card__columns">
          <div>
            <h3 className="career-card__label">Responsibilities</h3>
            <ul className="career-card__list">
              {career.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="career-card__label">Requirements</h3>
            <ul className="career-card__list">
              {career.requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
