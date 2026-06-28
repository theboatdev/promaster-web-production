import type { Career } from "@/types/career";

type CareerSeed = Omit<Career, "id">;

function createCareer(seed: CareerSeed): Career {
  return {
    ...seed,
    id: seed.slug,
  };
}

const careerSeeds: CareerSeed[] = [
  {
    slug: "technical-sales-engineer",
    title: "Technical Sales Engineer",
    department: "Sales & Technical",
    location: "Dubai, UAE",
    employmentType: "Full-time",
    tags: ["Waterproofing", "GCC Projects", "Client-facing"],
    summary:
      "Support contractors, consultants, and distributors across the UAE and GCC with product specification, submittals, and on-site technical guidance.",
    responsibilities: [
      "Manage key accounts among contractors, developers, and distributors",
      "Prepare project submittals, method statements, and technical presentations",
      "Conduct site visits and support applicators during product trials",
      "Coordinate with the QC lab on batch certificates and test reports",
    ],
    requirements: [
      "Bachelor's degree in Civil Engineering, Chemistry, or related field",
      "3+ years in construction chemicals or building materials sales",
      "Working knowledge of waterproofing, adhesives, or repair systems",
      "Valid UAE driving licence and willingness to travel across the Emirates",
    ],
    sortOrder: 1,
  },
  {
    slug: "quality-control-laboratory-technician",
    title: "Quality Control Laboratory Technician",
    department: "Quality & Operations",
    location: "Dubai, UAE",
    employmentType: "Full-time",
    tags: ["Batch Testing", "Laboratory", "Quality Control"],
    summary:
      "Run incoming and batch QC testing for construction chemical products, maintain lab records, and support certificate-of-analysis requests for project submittals.",
    responsibilities: [
      "Perform routine physical and chemical tests per internal SOPs",
      "Record batch results and flag non-conformances to the QA manager",
      "Maintain lab equipment calibration logs and consumable inventory",
      "Issue certificates of analysis for approved production batches",
    ],
    requirements: [
      "Diploma or degree in Chemistry, Materials Science, or equivalent",
      "1–3 years in a QC or materials testing laboratory",
      "Familiarity with ASTM, EN, or BS test methods is an advantage",
      "Strong attention to detail and accurate documentation habits",
    ],
    sortOrder: 2,
  },
];

const careers: Career[] = careerSeeds
  .map(createCareer)
  .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

export function getAllCareers(): Career[] {
  return careers;
}

export function getCareerApplyMailto(
  career: Career,
  fallbackEmail = "careers@promaster.ae",
): string {
  const email = career.applyEmail ?? fallbackEmail;
  return `mailto:${email}?subject=${encodeURIComponent(`Application — ${career.title}`)}`;
}
