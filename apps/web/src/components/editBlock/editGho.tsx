"use client";

import { SaveButton } from "components";
import { useEffect } from "react";

interface GhoProps {
  onSave: (value: string) => void;
  onChange: (value: string) => void;
}

function Gho({ onSave, onChange }: GhoProps) {
  useEffect(() => {
    onChange(`toggle:on`);
  });

  function handleSave() {
    onChange(`toggle:on`);
    onSave(`toggle:on`);
  }

  return (
    <div className="my-4 flex w-full flex-col justify-center">
      <div className="mt-2">Save to add the Aave Lens/Burrow to your block</div>

      <SaveButton onSaveClick={handleSave} disabled />
    </div>
  );
}

export default Gho;
