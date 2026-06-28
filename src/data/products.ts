import type { ProductListItem } from "@/types/product";
import {
  getAllProducts as fetchAllProductsFromSanity,
  getProductsByCategory as fetchProductsByCategoryFromSanity,
  getProductBySlug as fetchProductBySlugFromSanity,
} from "@/sanity/lib/fetch-all";
import { sanityToProductListItem } from "@/sanity/adapters/product";

type ProductSeed = Omit<ProductListItem, "id" | "createdAt">;

function createProduct(seed: ProductSeed, index: number): ProductListItem {
  return {
    ...seed,
    id: `${seed.categorySlug}-${seed.slug}`,
    createdAt: `2024-${String(Math.max(1, 12 - Math.floor(index / 2))).padStart(2, "0")}-15`,
  };
}

const waterproofingProducts: ProductSeed[] = [
  {
    sku: "PM-CRYSTAL-300",
    name: "PM-Crystal 300",
    slug: "pm-crystal-300",
    categorySlug: "waterproofing",
    shortDescription: "Penetrating crystalline slurry for concrete waterproofing and self-sealing.",
    applicationAreas: ["Basement Walls", "Water Tanks", "Foundations"],
    packaging: ["5 kg pail", "25 kg bag"],
    standards: ["EN 1504-2", "WRAS"],
    image: { alt: "PM-Crystal 300" },
  },
  {
    sku: "PM-CRYSTAL-100",
    name: "PM-Crystal 100",
    slug: "pm-crystal-100",
    categorySlug: "waterproofing",
    shortDescription: "Dry-shake crystalline hardener for fresh concrete slabs and toppings.",
    applicationAreas: ["Industrial Floors", "Foundations", "Basement Walls"],
    packaging: ["25 kg bag"],
    standards: ["EN 1504-2"],
    image: { alt: "PM-Crystal 100" },
  },
  {
    sku: "PM-MEMBRANE-2K",
    name: "PM-Membrane 2K",
    slug: "pm-membrane-2k",
    categorySlug: "waterproofing",
    shortDescription: "Two-component cementitious waterproof membrane for wet areas.",
    applicationAreas: ["Swimming Pools", "Bathrooms", "Balconies"],
    packaging: ["20 kg set"],
    standards: ["EN 14891", "ASTM C836"],
    image: { alt: "PM-Membrane 2K" },
  },
  {
    sku: "PM-INJECT-500",
    name: "PM-Inject 500",
    slug: "pm-inject-500",
    categorySlug: "waterproofing",
    shortDescription: "Low-viscosity polyurethane injection resin for active leak sealing.",
    applicationAreas: ["Tunnels", "Lift Pits", "Basement Walls"],
    packaging: ["10 kg kit"],
    standards: ["EN 1504-5"],
    image: { alt: "PM-Inject 500" },
  },
  {
    sku: "PM-BENTONITE-GR",
    name: "PM-Bentonite GR",
    slug: "pm-bentonite-gr",
    categorySlug: "waterproofing",
    shortDescription: "Granular bentonite waterproofing for pipe penetrations and joints.",
    applicationAreas: ["Foundations", "Tunnels", "Basement Walls"],
    packaging: ["25 kg bag"],
    standards: ["ASTM D5890"],
    image: { alt: "PM-Bentonite GR" },
  },
  {
    sku: "PM-SEAL-FLEX",
    name: "PM-Seal Flex",
    slug: "pm-seal-flex",
    categorySlug: "waterproofing",
    shortDescription: "Flexible cementitious coating for substrates with minor movement.",
    applicationAreas: ["Roof Decks", "Balconies", "Water Tanks"],
    packaging: ["20 kg pail"],
    standards: ["EN 1504-2"],
    image: { alt: "PM-Seal Flex" },
  },
  {
    sku: "PM-TANK-LINER",
    name: "PM-Tank Liner",
    slug: "pm-tank-liner",
    categorySlug: "waterproofing",
    shortDescription: "Potable water approved tank lining system for concrete reservoirs.",
    applicationAreas: ["Water Tanks", "Swimming Pools"],
    packaging: ["5 kg pail", "20 kg pail"],
    standards: ["WRAS", "EN 1504-2"],
    image: { alt: "PM-Tank Liner" },
  },
  {
    sku: "PM-NEG-PRESS",
    name: "PM-Neg Press",
    slug: "pm-neg-press",
    categorySlug: "waterproofing",
    shortDescription: "Negative-side crystalline repair mortar for retained structures.",
    applicationAreas: ["Basement Walls", "Lift Pits", "Tunnels"],
    packaging: ["25 kg bag"],
    standards: ["EN 1504-3", "EN 1504-2"],
    image: { alt: "PM-Neg Press" },
  },
  {
    sku: "PM-JOINT-BAND",
    name: "PM-Joint Band",
    slug: "pm-joint-band",
    categorySlug: "waterproofing",
    shortDescription: "Swelling waterstop tape for construction and movement joints.",
    applicationAreas: ["Foundations", "Tunnels", "Basement Walls"],
    packaging: ["Roll 10 m"],
    standards: ["DIN 18541"],
    image: { alt: "PM-Joint Band" },
  },
  {
    sku: "PM-PRIMER-WP",
    name: "PM-Primer WP",
    slug: "pm-primer-wp",
    categorySlug: "waterproofing",
    shortDescription: "Surface primer for cementitious membrane adhesion on porous substrates.",
    applicationAreas: ["Swimming Pools", "Balconies", "Bathrooms"],
    packaging: ["5 L pail", "20 L pail"],
    standards: ["EN 14891"],
    image: { alt: "PM-Primer WP" },
  },
  {
    sku: "PM-POOL-SEAL",
    name: "PM-Pool Seal",
    slug: "pm-pool-seal",
    categorySlug: "waterproofing",
    shortDescription: "Flexible waterproof coating for swimming pool shells and decks.",
    applicationAreas: ["Swimming Pools"],
    packaging: ["20 kg set"],
    standards: ["WRAS", "EN 14891"],
    image: { alt: "PM-Pool Seal" },
  },
  {
    sku: "PM-CRYSTAL-GEL",
    name: "PM-Crystal Gel",
    slug: "pm-crystal-gel",
    categorySlug: "waterproofing",
    shortDescription: "Thixotropic crystalline gel for overhead and vertical application.",
    applicationAreas: ["Basement Walls", "Water Tanks", "Tunnels"],
    packaging: ["5 kg pail"],
    standards: ["EN 1504-2"],
    image: { alt: "PM-Crystal Gel" },
  },
];

const tileAdhesiveProducts: ProductSeed[] = [
  {
    sku: "PM-TA-C1",
    name: "PM-Tile Fix C1",
    slug: "pm-tile-fix-c1",
    categorySlug: "tile-adhesives",
    shortDescription: "Standard cementitious tile adhesive for ceramic wall and floor tiles.",
    applicationAreas: ["Internal Walls", "Internal Floors"],
    packaging: ["25 kg bag"],
    standards: ["EN 12004 C1"],
    image: { alt: "PM-Tile Fix C1" },
  },
  {
    sku: "PM-TA-C2",
    name: "PM-Tile Fix C2",
    slug: "pm-tile-fix-c2",
    categorySlug: "tile-adhesives",
    shortDescription: "Improved deformable adhesive for large format porcelain tiles.",
    applicationAreas: ["External Facades", "Internal Floors"],
    packaging: ["25 kg bag"],
    standards: ["EN 12004 C2"],
    image: { alt: "PM-Tile Fix C2" },
  },
  {
    sku: "PM-TA-C2S1",
    name: "PM-Tile Fix C2S1",
    slug: "pm-tile-fix-c2s1",
    categorySlug: "tile-adhesives",
    shortDescription: "Fast-setting deformable adhesive for rapid installation programmes.",
    applicationAreas: ["Internal Floors", "Swimming Pools"],
    packaging: ["25 kg bag"],
    standards: ["EN 12004 C2S1"],
    image: { alt: "PM-Tile Fix C2S1" },
  },
  {
    sku: "PM-GROUT-FG",
    name: "PM-Grout FG",
    slug: "pm-grout-fg",
    categorySlug: "tile-adhesives",
    shortDescription: "Fine joint grout for ceramic and porcelain tile joints up to 5 mm.",
    applicationAreas: ["Internal Walls", "Internal Floors", "Bathrooms"],
    packaging: ["5 kg bag", "25 kg bag"],
    standards: ["EN 13888 CG2"],
    image: { alt: "PM-Grout FG" },
  },
  {
    sku: "PM-GROUT-WP",
    name: "PM-Grout WP",
    slug: "pm-grout-wp",
    categorySlug: "tile-adhesives",
    shortDescription: "Waterproof epoxy grout for wet areas and swimming pool joints.",
    applicationAreas: ["Swimming Pools", "Bathrooms"],
    packaging: ["5 kg kit"],
    standards: ["EN 13888 RG"],
    image: { alt: "PM-Grout WP" },
  },
  {
    sku: "PM-TA-EF",
    name: "PM-Tile Fix EF",
    slug: "pm-tile-fix-ef",
    categorySlug: "tile-adhesives",
    shortDescription: "Extended open time adhesive for hot climate external cladding.",
    applicationAreas: ["External Facades"],
    packaging: ["25 kg bag"],
    standards: ["EN 12004 C2E"],
    image: { alt: "PM-Tile Fix EF" },
  },
  {
    sku: "PM-LEVEL-SC",
    name: "PM-Level SC",
    slug: "pm-level-sc",
    categorySlug: "tile-adhesives",
    shortDescription: "Self-levelling compound for subfloor preparation before tiling.",
    applicationAreas: ["Internal Floors"],
    packaging: ["25 kg bag"],
    standards: ["EN 13813"],
    image: { alt: "PM-Level SC" },
  },
  {
    sku: "PM-PRIMER-TA",
    name: "PM-Primer TA",
    slug: "pm-primer-ta",
    categorySlug: "tile-adhesives",
    shortDescription: "Multipurpose primer for absorbent and non-absorbent substrates.",
    applicationAreas: ["Internal Walls", "Internal Floors", "External Facades"],
    packaging: ["5 L pail"],
    standards: ["EN 12004"],
    image: { alt: "PM-Primer TA" },
  },
  {
    sku: "PM-TA-C2S2",
    name: "PM-Tile Fix C2S2",
    slug: "pm-tile-fix-c2s2",
    categorySlug: "tile-adhesives",
    shortDescription: "Ultra-fast setting adhesive for commercial turnaround schedules.",
    applicationAreas: ["Internal Floors"],
    packaging: ["25 kg bag"],
    standards: ["EN 12004 C2S2"],
    image: { alt: "PM-Tile Fix C2S2" },
  },
  {
    sku: "PM-GROUT-CG",
    name: "PM-Grout CG",
    slug: "pm-grout-cg",
    categorySlug: "tile-adhesives",
    shortDescription: "Colour-stable grout for high-traffic commercial floor joints.",
    applicationAreas: ["Internal Floors"],
    packaging: ["25 kg bag"],
    standards: ["EN 13888 CG2A"],
    image: { alt: "PM-Grout CG" },
  },
];

const concreteRepairProducts: ProductSeed[] = [
  {
    sku: "PM-REP-R2",
    name: "PM-Repair R2",
    slug: "pm-repair-r2",
    categorySlug: "concrete-repair",
    shortDescription: "Non-structural repair mortar for cosmetic concrete restoration.",
    applicationAreas: ["Facades", "Balconies"],
    packaging: ["25 kg bag"],
    standards: ["EN 1504-3 R2"],
    image: { alt: "PM-Repair R2" },
  },
  {
    sku: "PM-REP-R3",
    name: "PM-Repair R3",
    slug: "pm-repair-r3",
    categorySlug: "concrete-repair",
    shortDescription: "Structural repair mortar for load-bearing concrete elements.",
    applicationAreas: ["Industrial Floors", "Foundations", "Tunnels"],
    packaging: ["25 kg bag"],
    standards: ["EN 1504-3 R3"],
    image: { alt: "PM-Repair R3" },
  },
  {
    sku: "PM-REP-R4",
    name: "PM-Repair R4",
    slug: "pm-repair-r4",
    categorySlug: "concrete-repair",
    shortDescription: "High-strength structural repair for bridges and infrastructure.",
    applicationAreas: ["Tunnels", "Foundations"],
    packaging: ["25 kg bag"],
    standards: ["EN 1504-3 R4"],
    image: { alt: "PM-Repair R4" },
  },
  {
    sku: "PM-BOND-SL",
    name: "PM-Bond SL",
    slug: "pm-bond-sl",
    categorySlug: "concrete-repair",
    shortDescription: "Epoxy bonding agent for fresh-to-hardened concrete connections.",
    applicationAreas: ["Industrial Floors", "Foundations"],
    packaging: ["5 kg kit", "20 kg kit"],
    standards: ["EN 1504-4"],
    image: { alt: "PM-Bond SL" },
  },
  {
    sku: "PM-FAIR-FN",
    name: "PM-Fair FN",
    slug: "pm-fair-fn",
    categorySlug: "concrete-repair",
    shortDescription: "Fairing coat for uniform surface finish on repaired concrete.",
    applicationAreas: ["Facades", "Balconies"],
    packaging: ["25 kg bag"],
    standards: ["EN 1504-3 R2"],
    image: { alt: "PM-Fair FN" },
  },
  {
    sku: "PM-CORR-INH",
    name: "PM-Corr Inh",
    slug: "pm-corr-inh",
    categorySlug: "concrete-repair",
    shortDescription: "Corrosion inhibitor for steel reinforcement in marine environments.",
    applicationAreas: ["Swimming Pools", "Foundations", "Tunnels"],
    packaging: ["20 kg pail"],
    standards: ["EN 1504-7"],
    image: { alt: "PM-Corr Inh" },
  },
  {
    sku: "PM-INJ-MR",
    name: "PM-Inj MR",
    slug: "pm-inj-mr",
    categorySlug: "concrete-repair",
    shortDescription: "Micro-concrete injection for void filling and crack repair.",
    applicationAreas: ["Tunnels", "Basement Walls"],
    packaging: ["25 kg bag"],
    standards: ["EN 1504-5"],
    image: { alt: "PM-Inj MR" },
  },
  {
    sku: "PM-ANCH-GR",
    name: "PM-Anch Gr",
    slug: "pm-anch-gr",
    categorySlug: "concrete-repair",
    shortDescription: "Precision anchoring grout for post-installed rebar and bolts.",
    applicationAreas: ["Industrial Floors", "Foundations"],
    packaging: ["25 kg bag"],
    standards: ["EN 1504-6"],
    image: { alt: "PM-Anch Gr" },
  },
  {
    sku: "PM-SURF-HD",
    name: "PM-Surf HD",
    slug: "pm-surf-hd",
    categorySlug: "concrete-repair",
    shortDescription: "Hardener densifier for worn industrial concrete floors.",
    applicationAreas: ["Industrial Floors"],
    packaging: ["20 L pail"],
    standards: ["ASTM C309"],
    image: { alt: "PM-Surf HD" },
  },
];

const sharedCategoryProducts: Record<string, ProductSeed[]> = {
  sealants: [
    {
      sku: "PM-PU-25",
      name: "PM-PU 25",
      slug: "pm-pu-25",
      categorySlug: "sealants",
      shortDescription: "Polyurethane sealant for movement joints in facades and floors.",
      applicationAreas: ["External Facades", "Industrial Floors"],
      packaging: ["600 ml sausage"],
      standards: ["EN 15651"],
      image: { alt: "PM-PU 25" },
    },
    {
      sku: "PM-SIL-NP",
      name: "PM-Sil NP",
      slug: "pm-sil-np",
      categorySlug: "sealants",
      shortDescription: "Neutral cure silicone for glazing and sanitary joints.",
      applicationAreas: ["Bathrooms", "External Facades"],
      packaging: ["310 ml cartridge"],
      standards: ["EN 15651"],
      image: { alt: "PM-Sil NP" },
    },
    {
      sku: "PM-HYB-40",
      name: "PM-Hyb 40",
      slug: "pm-hyb-40",
      categorySlug: "sealants",
      shortDescription: "Hybrid polymer sealant for high-movement construction joints.",
      applicationAreas: ["Balconies", "Roof Decks"],
      packaging: ["600 ml sausage"],
      standards: ["EN 15651"],
      image: { alt: "PM-Hyb 40" },
    },
    {
      sku: "PM-BACK-RO",
      name: "PM-Back RO",
      slug: "pm-back-ro",
      categorySlug: "sealants",
      shortDescription: "Closed-cell backing rod for joint sealant support.",
      applicationAreas: ["External Facades", "Balconies"],
      packaging: ["Roll 50 m"],
      standards: ["ASTM C1330"],
      image: { alt: "PM-Back RO" },
    },
    {
      sku: "PM-FIRE-SE",
      name: "PM-Fire SE",
      slug: "pm-fire-se",
      categorySlug: "sealants",
      shortDescription: "Fire-rated intumescent sealant for compartmentation joints.",
      applicationAreas: ["Internal Walls"],
      packaging: ["310 ml cartridge"],
      standards: ["EN 1366-4"],
      image: { alt: "PM-Fire SE" },
    },
    {
      sku: "PM-EXP-FOAM",
      name: "PM-Exp Foam",
      slug: "pm-exp-foam",
      categorySlug: "sealants",
      shortDescription: "Polyurethane expanding foam for gap filling and insulation.",
      applicationAreas: ["Internal Walls", "External Facades"],
      packaging: ["750 ml can"],
      standards: ["EN 17333"],
      image: { alt: "PM-Exp Foam" },
    },
  ],
  coatings: [
    {
      sku: "PM-EPO-FL",
      name: "PM-Epo FL",
      slug: "pm-epo-fl",
      categorySlug: "coatings",
      shortDescription: "Self-levelling epoxy floor coating for industrial environments.",
      applicationAreas: ["Industrial Floors"],
      packaging: ["20 kg set"],
      standards: ["EN 1542"],
      image: { alt: "PM-Epo FL" },
    },
    {
      sku: "PM-PU-TOP",
      name: "PM-PU Top",
      slug: "pm-pu-top",
      categorySlug: "coatings",
      shortDescription: "UV-stable polyurethane topcoat for external deck protection.",
      applicationAreas: ["Roof Decks", "Balconies"],
      packaging: ["20 L pail"],
      standards: ["EN 1062"],
      image: { alt: "PM-PU Top" },
    },
    {
      sku: "PM-ANTI-CB",
      name: "PM-Anti CB",
      slug: "pm-anti-cb",
      categorySlug: "coatings",
      shortDescription: "Anti-carbonation coating for reinforced concrete protection.",
      applicationAreas: ["Facades", "Bridges"],
      packaging: ["20 L pail"],
      standards: ["EN 1504-2"],
      image: { alt: "PM-Anti CB" },
    },
    {
      sku: "PM-DECK-WP",
      name: "PM-Deck WP",
      slug: "pm-deck-wp",
      categorySlug: "coatings",
      shortDescription: "Trafficable waterproof deck coating for podium and balcony areas.",
      applicationAreas: ["Balconies", "Roof Decks"],
      packaging: ["20 kg set"],
      standards: ["EN 14891"],
      image: { alt: "PM-Deck WP" },
    },
    {
      sku: "PM-PRIM-EP",
      name: "PM-Prim EP",
      slug: "pm-prim-ep",
      categorySlug: "coatings",
      shortDescription: "Epoxy primer for non-porous substrates before coating application.",
      applicationAreas: ["Industrial Floors"],
      packaging: ["5 L pail", "20 L pail"],
      standards: ["EN 1542"],
      image: { alt: "PM-Prim EP" },
    },
    {
      sku: "PM-TEXT-FX",
      name: "PM-Text FX",
      slug: "pm-text-fx",
      categorySlug: "coatings",
      shortDescription: "Decorative textured finish for exposed architectural concrete.",
      applicationAreas: ["Facades"],
      packaging: ["25 kg bag"],
      standards: ["EN 1062"],
      image: { alt: "PM-Text FX" },
    },
  ],
  admixtures: [
    {
      sku: "PM-PLAST-100",
      name: "PM-Plast 100",
      slug: "pm-plast-100",
      categorySlug: "admixtures",
      shortDescription: "Water-reducing plasticizer for improved workability and strength.",
      applicationAreas: ["Foundations", "Industrial Floors"],
      packaging: ["20 L pail", "200 L drum"],
      standards: ["ASTM C494 Type A"],
      image: { alt: "PM-Plast 100" },
    },
    {
      sku: "PM-ACC-50",
      name: "PM-Acc 50",
      slug: "pm-acc-50",
      categorySlug: "admixtures",
      shortDescription: "Set accelerator for cold weather and fast-track pours.",
      applicationAreas: ["Foundations", "Tunnels"],
      packaging: ["20 L pail"],
      standards: ["ASTM C494 Type C"],
      image: { alt: "PM-Acc 50" },
    },
    {
      sku: "PM-WP-ADM",
      name: "PM-WP Adm",
      slug: "pm-wp-adm",
      categorySlug: "admixtures",
      shortDescription: "Integral waterproofing admixture for concrete and screed.",
      applicationAreas: ["Basement Walls", "Water Tanks", "Foundations"],
      packaging: ["20 L pail"],
      standards: ["BS EN 934-2"],
      image: { alt: "PM-WP Adm" },
    },
    {
      sku: "PM-AIR-60",
      name: "PM-Air 60",
      slug: "pm-air-60",
      categorySlug: "admixtures",
      shortDescription: "Air-entraining admixture for freeze-thaw durability.",
      applicationAreas: ["External Facades"],
      packaging: ["20 L pail"],
      standards: ["ASTM C494 Type A"],
      image: { alt: "PM-Air 60" },
    },
    {
      sku: "PM-SUP-200",
      name: "PM-Sup 200",
      slug: "pm-sup-200",
      categorySlug: "admixtures",
      shortDescription: "High-range water reducer for high-strength concrete mixes.",
      applicationAreas: ["Foundations", "Tunnels"],
      packaging: ["20 L pail", "200 L drum"],
      standards: ["ASTM C494 Type F"],
      image: { alt: "PM-Sup 200" },
    },
    {
      sku: "PM-RET-30",
      name: "PM-Ret 30",
      slug: "pm-ret-30",
      categorySlug: "admixtures",
      shortDescription: "Set retarder for hot climate concrete placement control.",
      applicationAreas: ["Foundations", "Industrial Floors"],
      packaging: ["20 L pail"],
      standards: ["ASTM C494 Type B"],
      image: { alt: "PM-Ret 30" },
    },
  ],
  flooring: [
    {
      sku: "PM-IND-EPO",
      name: "PM-Ind Epo",
      slug: "pm-ind-epo",
      categorySlug: "flooring",
      shortDescription: "Heavy-duty epoxy flooring for warehouses and production areas.",
      applicationAreas: ["Industrial Floors"],
      packaging: ["20 kg set"],
      standards: ["EN 1542"],
      image: { alt: "PM-Ind Epo" },
    },
    {
      sku: "PM-PU-SL",
      name: "PM-PU SL",
      slug: "pm-pu-sl",
      categorySlug: "flooring",
      shortDescription: "Polyurethane self-levelling floor for cleanroom environments.",
      applicationAreas: ["Industrial Floors", "Internal Floors"],
      packaging: ["20 kg set"],
      standards: ["EN 13813"],
      image: { alt: "PM-PU SL" },
    },
    {
      sku: "PM-ESD-FL",
      name: "PM-ESD FL",
      slug: "pm-esd-fl",
      categorySlug: "flooring",
      shortDescription: "Electrostatic dissipative flooring for sensitive electronics areas.",
      applicationAreas: ["Industrial Floors"],
      packaging: ["20 kg set"],
      standards: ["IEC 61340"],
      image: { alt: "PM-ESD FL" },
    },
    {
      sku: "PM-SLIP-GR",
      name: "PM-Slip GR",
      slug: "pm-slip-gr",
      categorySlug: "flooring",
      shortDescription: "Anti-slip aggregate system for ramps and wet area floors.",
      applicationAreas: ["Industrial Floors", "Swimming Pools"],
      packaging: ["25 kg bag"],
      standards: ["DIN 51130"],
      image: { alt: "PM-Slip GR" },
    },
    {
      sku: "PM-DEC-CH",
      name: "PM-Dec CH",
      slug: "pm-dec-ch",
      categorySlug: "flooring",
      shortDescription: "Decorative chip flooring for showrooms and commercial spaces.",
      applicationAreas: ["Internal Floors"],
      packaging: ["20 kg set"],
      standards: ["EN 1542"],
      image: { alt: "PM-Dec CH" },
    },
    {
      sku: "PM-QUARTZ-HD",
      name: "PM-Quartz HD",
      slug: "pm-quartz-hd",
      categorySlug: "flooring",
      shortDescription: "Quartz-filled heavy duty screed for mechanical load zones.",
      applicationAreas: ["Industrial Floors"],
      packaging: ["25 kg bag"],
      standards: ["EN 13813"],
      image: { alt: "PM-Quartz HD" },
    },
  ],
  "bonding-grouting": [
    {
      sku: "PM-ANCH-EP",
      name: "PM-Anch EP",
      slug: "pm-anch-ep",
      categorySlug: "bonding-grouting",
      shortDescription: "Epoxy anchoring grout for structural fixings in concrete.",
      applicationAreas: ["Industrial Floors", "Foundations"],
      packaging: ["10 kg kit"],
      standards: ["EN 1504-6"],
      image: { alt: "PM-Anch EP" },
    },
    {
      sku: "PM-INJ-CEM",
      name: "PM-Inj Cem",
      slug: "pm-inj-cem",
      categorySlug: "bonding-grouting",
      shortDescription: "Cementitious injection grout for rock and soil stabilisation.",
      applicationAreas: ["Tunnels", "Foundations"],
      packaging: ["25 kg bag"],
      standards: ["EN 445"],
      image: { alt: "PM-Inj Cem" },
    },
    {
      sku: "PM-BOND-PASTE",
      name: "PM-Bond Paste",
      slug: "pm-bond-paste",
      categorySlug: "bonding-grouting",
      shortDescription: "Epoxy bonding paste for segmental and precast connections.",
      applicationAreas: ["Tunnels", "Industrial Floors"],
      packaging: ["5 kg kit"],
      standards: ["EN 1504-4"],
      image: { alt: "PM-Bond Paste" },
    },
    {
      sku: "PM-MICRO-GRT",
      name: "PM-Micro Grt",
      slug: "pm-micro-grt",
      categorySlug: "bonding-grouting",
      shortDescription: "Microfine cement grout for permeation grouting applications.",
      applicationAreas: ["Tunnels", "Basement Walls"],
      packaging: ["25 kg bag"],
      standards: ["EN 445"],
      image: { alt: "PM-Micro Grt" },
    },
    {
      sku: "PM-CABLE-GR",
      name: "PM-Cable GR",
      slug: "pm-cable-gr",
      categorySlug: "bonding-grouting",
      shortDescription: "Cable duct grouting compound for post-tensioning systems.",
      applicationAreas: ["Bridges", "Tunnels"],
      packaging: ["25 kg bag"],
      standards: ["EN 445"],
      image: { alt: "PM-Cable GR" },
    },
    {
      sku: "PM-RESIN-GR",
      name: "PM-Resin GR",
      slug: "pm-resin-gr",
      categorySlug: "bonding-grouting",
      shortDescription: "High-flow epoxy grout for precision machine base plates.",
      applicationAreas: ["Industrial Floors"],
      packaging: ["10 kg kit"],
      standards: ["EN 1504-6"],
      image: { alt: "PM-Resin GR" },
    },
  ],
};

const allSeeds: ProductSeed[] = [
  ...waterproofingProducts,
  ...tileAdhesiveProducts,
  ...concreteRepairProducts,
  ...Object.values(sharedCategoryProducts).flat(),
];

export const products: ProductListItem[] = allSeeds.map((seed, index) =>
  createProduct(seed, index)
);

/** Synchronous mock-only lookup used as a fallback inside async resolvers. */
export function findMockProductsByCategory(categorySlug: string): ProductListItem[] {
  return products
    .filter((product) => product.categorySlug === categorySlug)
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** Synchronous mock-only lookup used as a fallback inside async resolvers. */
export function findMockProductBySlug(
  categorySlug: string,
  productSlug: string
): ProductListItem | undefined {
  return products.find(
    (product) => product.categorySlug === categorySlug && product.slug === productSlug
  );
}

/**
 * Get all products across every category. Tries Sanity first, falls back to mock data.
 */
export async function getAllProducts(): Promise<ProductListItem[]> {
  try {
    const sanityProducts = await fetchAllProductsFromSanity();
    if (Array.isArray(sanityProducts) && sanityProducts.length > 0) {
      return sanityProducts.map((doc: any) => sanityToProductListItem(doc));
    }
  } catch (error) {
    console.warn("Failed to fetch all products from Sanity, using mock data", error);
  }

  return [...products].sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get all products in a category. Tries Sanity first, falls back to mock data.
 */
export async function getProductsByCategory(
  categorySlug: string
): Promise<ProductListItem[]> {
  try {
    const sanityProducts = await fetchProductsByCategoryFromSanity(categorySlug);
    if (Array.isArray(sanityProducts) && sanityProducts.length > 0) {
      return sanityProducts.map((doc: any) =>
        sanityToProductListItem(doc, categorySlug)
      );
    }
  } catch (error) {
    console.warn(
      `Failed to fetch products for category "${categorySlug}" from Sanity, using mock data`,
      error
    );
  }
  return findMockProductsByCategory(categorySlug);
}

/**
 * Get a single product by category + product slug.
 * Tries Sanity first, falls back to mock data.
 */
export async function getProductBySlug(
  categorySlug: string,
  productSlug: string
): Promise<ProductListItem | undefined> {
  try {
    const sanityProduct = await fetchProductBySlugFromSanity(productSlug);
    if (sanityProduct) {
      return sanityToProductListItem(sanityProduct, categorySlug);
    }
  } catch (error) {
    console.warn(
      `Failed to fetch product "${productSlug}" from Sanity, using mock data`,
      error
    );
  }
  return findMockProductBySlug(categorySlug, productSlug);
}

export function getProductHref(
  product: Pick<ProductListItem, "categorySlug" | "slug">,
): string {
  return `/products/${product.categorySlug}/${product.slug}`;
}
