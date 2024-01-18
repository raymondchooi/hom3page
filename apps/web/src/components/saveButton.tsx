import { Button } from "components";

interface SaveButtonProps {
  onSaveClick: () => void;
}

function SaveButton({ onSaveClick }: SaveButtonProps) {
  return (
    <div className="z-[10] mb-6 flex w-full">
      <Button onClick={onSaveClick} fancy="less" className="w-full">
        Save
      </Button>
    </div>
  );
}

export default SaveButton;
