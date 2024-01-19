"use client";

import EditText from "./editBlock/editText";
import EditImage from "./editBlock/editImage";

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
    if (bAppId === "text")
      return <EditText onSave={handleSave} onChange={handleValueChange} />;
    if (bAppId === "image")
      return <EditImage onSave={handleSave} onChange={handleValueChange} />;
    return <EditText onSave={handleSave} onChange={handleValueChange} />;
  }
  return (
    <div className="flex w-full flex-col justify-center">
      {renderBappEdit()}
    </div>
  );
}

export default BappEdit;
