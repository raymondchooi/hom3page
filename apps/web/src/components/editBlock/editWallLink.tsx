"use client";

import { type ChangeEvent, useState } from "react";

import { Field, Label } from "components/fieldset";
import { Input, SaveButton } from "components";

interface WallLinkProps {
  onSave: (value: string) => void;
  onChange: (value: string) => void;
}

function WallLink({ onSave, onChange }: WallLinkProps) {
  const [text, setText] = useState("");

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
    onChange && onChange(`id:${text}`);
  }

  function handleSave() {
    onSave(`id:${text}`);
  }

  return (
    <div className="my-4 flex w-full flex-col justify-center">
      <Field>
        <Label className="text-gray-400">Wall ID</Label>
        <Input onChange={handleInputChange} name="wallId" aria-label="Wall ID" />
      </Field>
      <SaveButton onSaveClick={handleSave} />
    </div>
  );
}

export default WallLink;
