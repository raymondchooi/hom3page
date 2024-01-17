import { type ChangeEvent } from "react";

import { Field, Label } from "components/fieldset";
import { Input } from "components";

interface EditTextProps {
  onValueChange: (value: string) => void;
}

function EditText({ onValueChange }: EditTextProps) {
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    onValueChange(e.target.value);
  }
  return (
    <div className="my-4 flex w-full flex-col justify-center">
      <Field>
        <Label className="text-gray-400">Text</Label>
        <Input onChange={handleInputChange} name="Text" aria-label="Text" />
      </Field>
    </div>
  );
}

export default EditText;
