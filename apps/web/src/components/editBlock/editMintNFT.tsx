"use client";

import { type ChangeEvent, useState } from "react";

import { Field, Label } from "components/fieldset";
import { Input, SaveButton } from "components";

interface EditMintNFTProps {
  onSave: (value: string) => void;
  onChange: (value: string) => void;
}

function EditMintNFT({ onSave, onChange }: EditMintNFTProps) {
  const [text, setText] = useState("");

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
    onChange && onChange(`nftCollectionID:${text}`);
  }

  function handleSave() {
    onSave(`nftCollectionID:${text}`);
  }

  return (
    <div className="my-4 flex w-full flex-col justify-center">
      <Field>
        <Label className="text-gray-400">NFT Collection ID</Label>
        <Input onChange={handleInputChange} name="Text" aria-label="Text" />
      </Field>
      <SaveButton onSaveClick={handleSave} />
    </div>
  );
}

export default EditMintNFT;