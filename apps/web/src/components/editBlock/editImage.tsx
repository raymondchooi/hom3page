"use client";

import { type ChangeEvent, useState } from "react";

import { Field, Label, FieldGroup } from "components/fieldset";
import { Input, FileUpload, SaveButton } from "components";
import { fileToBase64 } from "utils/file";

interface EditTextProps {
  onSave: (value: string) => void;
  onChange: (value: string) => void;
}

function EditText({ onSave, onChange }: EditTextProps) {
  const [uploadedImage, setUploadedImage] = useState("");
  const [altText, setAltText] = useState("");

  async function handleImageUpload(file: File) {
    if (file) {
      const base64Image = await fileToBase64(file);

      setUploadedImage(base64Image);
      onChange && onChange(`img:${base64Image}|alt:${altText}`);
    }
  }

  function handleAltInputChange(e: ChangeEvent<HTMLInputElement>) {
    setAltText(e.target.value);
    onChange && onChange(`img:${uploadedImage}|alt:${altText}`);
  }

  function handleSave() {
    onSave(`img:${uploadedImage}|alt:${altText}`);
  }

  return (
    <div className="mt-4 flex w-full flex-col justify-center">
      <FieldGroup>
        <Field>
          <Label className="text-gray-400">Image</Label>
          <FileUpload onFileUpload={handleImageUpload} />
        </Field>
        <Field className="mt-2">
          <Label className="text-gray-400">Image alt text</Label>
          <Input
            onChange={handleAltInputChange}
            name="Alt"
            aria-label="Image alt text"
          />
        </Field>
      </FieldGroup>
      <SaveButton onSaveClick={handleSave} />
    </div>
  );
}

export default EditText;
