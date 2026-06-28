import type { Distributor } from "@/types/distributor";

export const AUTHORIZED_DISTRIBUTOR_NAME =
  "Imperial Middle East Building Material Trading LLC";

type DistributorSeed = Omit<Distributor, "id">;

const distributorSeeds: DistributorSeed[] = [
  {
    slug: "imperial-middle-east",
    name: AUTHORIZED_DISTRIBUTOR_NAME,
    region: "UAE",
    status: "Authorized Distributor",
    sortOrder: 1,
  },
];

export function getAllDistributors(): Distributor[] {
  return distributorSeeds
    .map((seed) => ({
      ...seed,
      id: seed.slug,
    }))
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}
