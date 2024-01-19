import BAppSummary, { type BAppSummaryProps } from "./bAppSummary";

interface BAppGridProps {
  bApps: BAppSummaryProps[];
}

function BAppGrid({ bApps }: BAppGridProps) {
  return (
    <ul className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {bApps.map((bApp) => (
        <li key={bApp.title}>
          <BAppSummary {...bApp} />
        </li>
      ))}
    </ul>
  );
}

export default BAppGrid;
