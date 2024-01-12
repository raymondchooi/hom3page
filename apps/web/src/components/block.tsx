import type { BlockData } from "models/BlockData";

interface BlockProps {
  onClick: (id: string) => void;
  blockData: BlockData;
}

export default function Block({ onClick, blockData }: BlockProps) {
  function renderBlock() {
    return (
      <div className="inline-flex items-center rounded bg-gray-100 px-4 py-2 font-bold text-gray-800 hover:bg-gray-200">
        {blockData.id}
      </div>
    );
  }

  return (
    <button
      key={blockData.id}
      className="inline-flex items-center rounded bg-gray-100 px-4 py-2 font-bold text-gray-800 hover:bg-gray-200"
      onClick={() => onClick(blockData.id)}
    >
      {renderBlock()}
    </button>
  );
}
