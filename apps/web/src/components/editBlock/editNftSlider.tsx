"use client";

import { type ChangeEvent, useState } from "react";

import { Field, Label } from "components/fieldset";
import { Input, SaveButton } from "components";

interface NftSliderProps {
  onSave: (value: string) => void;
  onChange: (value: string) => void;
}

function NftSlider({ onSave, onChange }: NftSliderProps) {
  const [address, setAddress] = useState("");

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setAddress(e.target.value);
    onChange && onChange(`address:${address}`);
  }

  function handleSave() {
    onSave(`address:${address}`);
  }

  return (
    <div className="my-4 flex w-full flex-col justify-center">
      <Field>
        <Label className="text-gray-400">NFT holder Address</Label>
        <Input onChange={handleInputChange} name="nftHolderAddress" aria-label="NFT holder Address" />
      </Field>
      <SaveButton onSaveClick={handleSave} />
    </div>
  );
}

export default NftSlider;
