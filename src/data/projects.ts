import type { ProjectListItem } from "@/types/project";
import { getAllProjects as fetchAllProjectsFromSanity } from "@/sanity/lib/fetch-all";
import { sanityToProjectListItem } from "@/sanity/adapters/project";

type ProjectSeed = Omit<ProjectListItem, "id">;

function createProject(seed: ProjectSeed): ProjectListItem {
  return {
    ...seed,
    id: seed.slug,
  };
}

const projectSeeds: ProjectSeed[] = [
  {
    name: "Dubai Marina Mixed-Use Tower",
    slug: "dubai-marina-mixed-use-tower",
    location: "Dubai Marina, UAE",
    year: 2024,
    projectType: "Waterproofing",
    tags: ["Waterproofing", "Below-grade", "AECOM"],
    image: { alt: "Dubai Marina Mixed-Use Tower" },
  },
  {
    name: "Government Authority Headquarters",
    slug: "government-authority-headquarters",
    location: "Abu Dhabi, UAE",
    year: 2023,
    projectType: "Flooring",
    tags: ["Epoxy Flooring", "4,500 m²"],
    image: { alt: "Government Authority Headquarters" },
  },
  {
    name: "Industrial Plant Structural Restoration",
    slug: "industrial-plant-structural-restoration",
    location: "Sharjah, UAE",
    year: 2024,
    projectType: "Concrete Repair",
    tags: ["Concrete Repair", "EN 1504-3 R3"],
    image: { alt: "Industrial Plant Structural Restoration" },
  },
  {
    name: "Luxury Resort Pool Complex",
    slug: "luxury-resort-pool-complex",
    location: "Ras Al Khaimah, UAE",
    year: 2023,
    projectType: "Waterproofing",
    tags: ["Waterproofing", "WRAS Certified", "8 Pools"],
    image: { alt: "Luxury Resort Pool Complex" },
  },
  {
    name: "Metro Expansion Underground Station",
    slug: "metro-expansion-underground-station",
    location: "Dubai, UAE",
    year: 2022,
    projectType: "Infrastructure",
    tags: ["Crystalline", "Injection", "Infrastructure"],
    image: { alt: "Metro Expansion Underground Station" },
  },
  {
    name: "Dubai Hills Residential Community",
    slug: "dubai-hills-residential-community",
    location: "Dubai, UAE",
    year: 2024,
    projectType: "Waterproofing",
    tags: ["Waterproofing", "Podium Decks"],
    image: { alt: "Dubai Hills Residential Community" },
  },
  {
    name: "Al Ain Hospital Expansion",
    slug: "al-ain-hospital-expansion",
    location: "Al Ain, UAE",
    year: 2021,
    projectType: "Flooring",
    tags: ["Epoxy Flooring", "Healthcare"],
    image: { alt: "Al Ain Hospital Expansion" },
  },
  {
    name: "Jebel Ali Port Warehouse",
    slug: "jebel-ali-port-warehouse",
    location: "Dubai, UAE",
    year: 2022,
    projectType: "Flooring",
    tags: ["Industrial Flooring", "Heavy Duty"],
    image: { alt: "Jebel Ali Port Warehouse" },
  },
  {
    name: "Fujairah Desalination Plant",
    slug: "fujairah-desalination-plant",
    location: "Fujairah, UAE",
    year: 2023,
    projectType: "Infrastructure",
    tags: ["Waterproofing", "Chemical Resistance"],
    image: { alt: "Fujairah Desalination Plant" },
  },
  {
    name: "Yas Island Entertainment District",
    slug: "yas-island-entertainment-district",
    location: "Abu Dhabi, UAE",
    year: 2022,
    projectType: "Waterproofing",
    tags: ["Below-grade", "Membrane Systems"],
    image: { alt: "Yas Island Entertainment District" },
  },
  {
    name: "Ajman Coastal Road Tunnel",
    slug: "ajman-coastal-road-tunnel",
    location: "Ajman, UAE",
    year: 2021,
    projectType: "Infrastructure",
    tags: ["Injection", "Tunnel Lining"],
    image: { alt: "Ajman Coastal Road Tunnel" },
  },
  {
    name: "Business Bay Tower Podium",
    slug: "business-bay-tower-podium",
    location: "Dubai, UAE",
    year: 2023,
    projectType: "Waterproofing",
    tags: ["Podium", "Trafficable Coating"],
    image: { alt: "Business Bay Tower Podium" },
  },
];

export const projects: ProjectListItem[] = projectSeeds.map(createProject);

export function findMockProjectBySlug(slug: string): ProjectListItem | undefined {
  return projects.find((project) => project.slug === slug);
}

export async function getProjectBySlug(slug: string): Promise<ProjectListItem | undefined> {
  const all = await getAllProjects();
  return all.find((project) => project.slug === slug);
}

export async function getAllProjects(): Promise<ProjectListItem[]> {
  try {
    const sanityProjects = await fetchAllProjectsFromSanity();
    if (Array.isArray(sanityProjects) && sanityProjects.length > 0) {
      return sanityProjects.map((doc: unknown) => sanityToProjectListItem(doc));
    }
  } catch (error) {
    console.warn("Failed to fetch projects from Sanity, using mock data", error);
  }
  return [...projects].sort((a, b) => b.year - a.year || a.name.localeCompare(b.name));
}
