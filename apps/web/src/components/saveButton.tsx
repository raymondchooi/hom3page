import { Button } from "components";

interface SaveButtonProps {
  disabled?: boolean;
  onSaveClick: () => void;
}

function SaveButton({ disabled }: SaveButtonProps) {
  return (
    <div className="z-[10] mt-6 flex w-full">
      <Button
        onClick={onSaveClick}
        fancy="less"
        className="w-full"
        disabled={disabled}
      >
        Save
      </Button>
    </div>
  );
}

export default SaveButton;
