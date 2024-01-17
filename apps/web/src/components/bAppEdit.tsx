"use client";

import { Button } from "components";
import EditText from "./editBlock/editText";

interface BappEdit {
  onSave: () => void;
  bAppId: string;
  onChange: (value: string) => void;
}

function BappEdit({ onSave, bAppId, onChange }: BappEdit) {
  function handleSave() {
    console.log("saved to web3:");
    onSave();
  }

  function handleValueChange(value: string) {
    onChange(value);
  }

  function renderBappEdit() {
    if (bAppId) return <EditText onValueChange={handleValueChange} />;
    return <></>;
  }
  return (
    <div className="flex w-full flex-col justify-center">
      {renderBappEdit()}
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
}

export default BappEdit;
