import type { Distributor } from "@/types/distributor";

type DistributorCardProps = {
  distributor: Distributor;
  index: number;
};

function formatDistributorIndex(index: number, region: string) {
  return `${String(index).padStart(2, "0")} / ${region}`;
}

export default function DistributorCard({
  distributor,
  index,
}: DistributorCardProps) {
  return (
    <article className="distributor-card">
      <div className="distributor-card__header">
        <div className="distributor-card__index">
          {formatDistributorIndex(index, distributor.region)}
        </div>

        <div className="distributor-card__intro">
          <h2 className="distributor-card__name">{distributor.name}</h2>
        </div>

        {distributor.status && (
          <span className="distributor-card__status">{distributor.status}</span>
        )}
      </div>
    </article>
  );
}
