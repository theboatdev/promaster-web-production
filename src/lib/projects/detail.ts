import { projects } from "@/data/projects";
import { getProjectBySlug as fetchSanityProjectDetail } from "@/sanity/lib/fetch-all";
import { sanityToProjectDetail } from "@/sanity/adapters/project";
import type {
  ProjectCertification,
  ProjectDetail,
  ProjectImage,
  ProjectListItem,
  ProjectProductUsed,
} from "@/types/project";

const GALLERY_LABELS = ["Overview", "Application", "Detail", "Completion"];

type ProjectDetailSeed = {
  description: string;
  productsUsed: ProjectProductUsed[];
  certifications: ProjectCertification[];
  clientRef: string;
};

const PROJECT_DETAIL_SEEDS: Record<string, ProjectDetailSeed> = {
  "dubai-marina-mixed-use-tower": {
    description:
      "Full below-grade waterproofing specification for a 42-storey mixed-use tower in Dubai Marina. Pro Master crystalline and membrane systems were applied across basement slabs, retaining walls, and lift pits under active hydrostatic pressure.",
    productsUsed: [
      { name: "PM-Crystal 300", slug: "pm-crystal-300", categorySlug: "waterproofing" },
      { name: "PM-Membrane 2K", slug: "pm-membrane-2k", categorySlug: "waterproofing" },
      { name: "PM-Neg Press", slug: "pm-neg-press", categorySlug: "waterproofing" },
    ],
    certifications: [
      { id: "en-1504-2", abbr: "EN 1504-2", name: "EN 1504-2 Protection of Concrete" },
      { id: "wras", abbr: "WRAS", name: "WRAS Approved" },
    ],
    clientRef: "AECOM — Lead Consultant",
  },
  "government-authority-headquarters": {
    description:
      "High-performance epoxy flooring across 4,500 m² of circulation, meeting rooms, and service areas. The system was specified for chemical resistance, ease of maintenance, and alignment with government facility standards.",
    productsUsed: [
      { name: "PM-Ind Epo", slug: "pm-ind-epo", categorySlug: "flooring" },
      { name: "PM-PU SL", slug: "pm-pu-sl", categorySlug: "flooring" },
    ],
    certifications: [],
    clientRef: "Government Authority — Direct Client",
  },
  "industrial-plant-structural-restoration": {
    description:
      "Structural concrete repair programme for a heavy industrial plant, including R3-rated repair mortars, fairing coats, and corrosion protection on exposed reinforcement in aggressive environments.",
    productsUsed: [
      { name: "PM-Repair R3", slug: "pm-repair-r3", categorySlug: "concrete-repair" },
      { name: "PM-Fair FN", slug: "pm-fair-fn", categorySlug: "concrete-repair" },
      { name: "PM-Corr Inh", slug: "pm-corr-inh", categorySlug: "concrete-repair" },
    ],
    certifications: [
      { id: "en-1504-3", abbr: "EN 1504-3", name: "EN 1504-3 Structural Repair R3" },
    ],
    clientRef: "Plant Operator — EPC Contractor",
  },
  "luxury-resort-pool-complex": {
    description:
      "Waterproofing and lining systems across eight pools and associated wet leisure areas. WRAS-approved products were specified for potable water contact zones and high-visibility finishes.",
    productsUsed: [
      { name: "PM-Pool Seal", slug: "pm-pool-seal", categorySlug: "waterproofing" },
      { name: "PM-Tank Liner", slug: "pm-tank-liner", categorySlug: "waterproofing" },
    ],
    certifications: [
      { id: "wras", abbr: "WRAS", name: "WRAS Approved" },
      { id: "en-14891", abbr: "EN 14891", name: "EN 14891 Liquid-Applied Waterproofing" },
    ],
    clientRef: "Resort Developer — Design Team",
  },
  "dubai-hills-residential-community": {
    description:
      "Podium and basement waterproofing for a large residential community, including trafficable deck coatings and crystalline systems across multiple building podiums.",
    productsUsed: [
      { name: "PM-Seal Flex", slug: "pm-seal-flex", categorySlug: "waterproofing" },
      { name: "PM-Deck WP", slug: "pm-deck-wp", categorySlug: "coatings" },
    ],
    certifications: [{ id: "en-1504-2", abbr: "EN 1504-2", name: "EN 1504-2 Protection of Concrete" }],
    clientRef: "Master Developer — Consultant",
  },
  "al-ain-hospital-expansion": {
    description:
      "Seamless epoxy flooring for clinical and circulation areas, specified for hygiene, chemical resistance, and low-maintenance finishes in a healthcare expansion.",
    productsUsed: [
      { name: "PM-PU SL", slug: "pm-pu-sl", categorySlug: "flooring" },
      { name: "PM-ESD FL", slug: "pm-esd-fl", categorySlug: "flooring" },
    ],
    certifications: [{ id: "en-13813", abbr: "EN 13813", name: "EN 13813 Screeds and Floors" }],
    clientRef: "Healthcare Authority — Main Contractor",
  },
  "jebel-ali-port-warehouse": {
    description:
      "Heavy-duty industrial flooring for high-traffic warehouse and logistics zones, designed for abrasion resistance and rapid return to service.",
    productsUsed: [
      { name: "PM-Ind Epo", slug: "pm-ind-epo", categorySlug: "flooring" },
      { name: "PM-Quartz HD", slug: "pm-quartz-hd", categorySlug: "flooring" },
    ],
    certifications: [],
    clientRef: "Logistics Operator — EPC",
  },
  "fujairah-desalination-plant": {
    description:
      "Chemical-resistant waterproofing and protective coatings for process areas exposed to aggressive environments and continuous moisture.",
    productsUsed: [
      { name: "PM-Tank Liner", slug: "pm-tank-liner", categorySlug: "waterproofing" },
      { name: "PM-Anti CB", slug: "pm-anti-cb", categorySlug: "coatings" },
    ],
    certifications: [
      { id: "wras", abbr: "WRAS", name: "WRAS Approved" },
      { id: "en-1504-2", abbr: "EN 1504-2", name: "EN 1504-2 Protection of Concrete" },
    ],
    clientRef: "Utility Operator — Design Consultant",
  },
  "yas-island-entertainment-district": {
    description:
      "Below-grade waterproofing for entertainment district structures, combining membrane and crystalline systems for retained basements and service corridors.",
    productsUsed: [
      { name: "PM-Membrane 2K", slug: "pm-membrane-2k", categorySlug: "waterproofing" },
      { name: "PM-Crystal 300", slug: "pm-crystal-300", categorySlug: "waterproofing" },
    ],
    certifications: [{ id: "en-14891", abbr: "EN 14891", name: "EN 14891 Liquid-Applied Waterproofing" }],
    clientRef: "Entertainment District — Project Manager",
  },
  "ajman-coastal-road-tunnel": {
    description:
      "Tunnel waterproofing and injection leak sealing programme for a coastal road tunnel, addressing groundwater ingress and long-term durability requirements.",
    productsUsed: [
      { name: "PM-Inject 500", slug: "pm-inject-500", categorySlug: "waterproofing" },
      { name: "PM-Joint Band", slug: "pm-joint-band", categorySlug: "waterproofing" },
    ],
    certifications: [{ id: "en-1504-5", abbr: "EN 1504-5", name: "EN 1504-5 Injection" }],
    clientRef: "Road Authority — Tunnel Contractor",
  },
  "business-bay-tower-podium": {
    description:
      "Trafficable podium deck waterproofing for a Business Bay tower, including flexible coatings for movement joints and exposed podium levels.",
    productsUsed: [
      { name: "PM-Deck WP", slug: "pm-deck-wp", categorySlug: "coatings" },
      { name: "PM-Seal Flex", slug: "pm-seal-flex", categorySlug: "waterproofing" },
    ],
    certifications: [{ id: "en-14891", abbr: "EN 14891", name: "EN 14891 Liquid-Applied Waterproofing" }],
    clientRef: "Tower Developer — Façade Consultant",
  },
  "metro-expansion-underground-station": {
    description:
      "Infrastructure waterproofing and leak sealing for an underground metro station box, combining crystalline slurry, injection resins, and joint waterstop systems under sustained groundwater pressure.",
    productsUsed: [
      { name: "PM-Crystal 300", slug: "pm-crystal-300", categorySlug: "waterproofing" },
      { name: "PM-Inject 500", slug: "pm-inject-500", categorySlug: "waterproofing" },
      { name: "PM-Joint Band", slug: "pm-joint-band", categorySlug: "waterproofing" },
    ],
    certifications: [
      { id: "en-1504-5", abbr: "EN 1504-5", name: "EN 1504-5 Injection" },
      { id: "en-1504-2", abbr: "EN 1504-2", name: "EN 1504-2 Protection of Concrete" },
    ],
    clientRef: "Infrastructure Authority — Main Contractor",
  },
};

const DEFAULT_DETAIL_SEED: ProjectDetailSeed = {
  description:
    "Pro Master construction products were specified and applied on this landmark project across the UAE and GCC, meeting rigorous performance and compliance requirements.",
  productsUsed: [],
  certifications: [],
  clientRef: "Available on request",
};

function buildImages(project: ProjectListItem): ProjectImage[] {
  return GALLERY_LABELS.map((label, index) => ({
    alt:
      index === 0
        ? project.image.alt || project.name
        : `${project.name} — ${label}`,
    url: project.image.url,
  }));
}

function buildDescription(project: ProjectListItem, seed: ProjectDetailSeed): string {
  if (seed.description) return seed.description;

  const location = project.location ? ` in ${project.location}` : "";
  const year = project.year > 0 ? ` (${project.year})` : "";
  const type = project.projectType ? `${project.projectType} ` : "";

  return `A ${type}project${location}${year} where Pro Master systems were specified for demanding performance requirements. Contact our team for full case study documentation.`;
}

export function enrichToProjectDetail(project: ProjectListItem): ProjectDetail {
  const seed = PROJECT_DETAIL_SEEDS[project.slug] ?? DEFAULT_DETAIL_SEED;

  return {
    ...project,
    description: buildDescription(project, seed),
    images: buildImages(project),
    productsUsed: seed.productsUsed,
    certifications: seed.certifications,
    clientRef: seed.clientRef,
  };
}

export async function getProjectDetailBySlug(
  projectSlug: string
): Promise<ProjectDetail | undefined> {
  try {
    const sanityProject = await fetchSanityProjectDetail(projectSlug);
    if (sanityProject) {
      const detail = sanityToProjectDetail(sanityProject);
      if (!detail.description) {
        return enrichToProjectDetail(detail);
      }
      return detail;
    }
  } catch (error) {
    console.warn(
      `Failed to fetch project detail "${projectSlug}" from Sanity, using mock data`,
      error
    );
  }

  const mock = projects.find((project) => project.slug === projectSlug);
  if (!mock) return undefined;
  return enrichToProjectDetail(mock);
}

export function getAllProjectParams(): { slug: string }[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export const WHATSAPP_NUMBER = "971505710805";

export function buildWhatsAppUrl(project: ProjectListItem): string {
  const message = `Hi, I'd like more details about the project "${project.name}". Could you share the case study and technical information?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildContactUrl(project: ProjectListItem): string {
  const params = new URLSearchParams({
    project: project.name,
    inquiryType: "Project Inquiry",
  });
  return `/?${params.toString()}#contact`;
}
