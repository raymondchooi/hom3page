"use client";

import { SaveButton } from "components";
import { useEffect } from "react";

interface AaveFaucetProps {
  onSave: (value: string) => void;
  onChange: (value: string) => void;
}

function AaveFaucet({ onSave, onChange }: AaveFaucetProps) {
  useEffect(() => {
    onChange(`toggle:on`);
  });

  function handleSave() {
    onChange(`toggle:on`);
    onSave(`toggle:on`);
  }

  return (
    <div className="my-4 flex w-full flex-col justify-center">
      <div className="mt-2">Save to add the Aave Faucet to your block</div>
      <SaveButton onSaveClick={handleSave} />
    </div>
  );
}

export default AaveFaucet;
