"use client";

import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

function FileUpload({ onFileUpload }: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e?.target?.files?.[0];

    if (file) {
      onFileUpload(file);
      setPreview(URL.createObjectURL(file));
    }
  }

  return (
    <label
      htmlFor="file-upload"
      className="group mt-2 flex cursor-pointer justify-center rounded-lg border border-dashed border-white/25 px-6 py-10"
    >
      <div className="text-center">
        {preview ? (
          <Image
            src={preview}
            alt="Preview image"
            height={48}
            width={48}
            className="mx-auto"
          />
        ) : (
          <PhotoIcon
            className="mx-auto h-12 w-12 text-gray-500"
            aria-hidden="true"
          />
        )}
        <div className="mt-4 flex text-sm leading-6 text-gray-400">
          <span className="group-hover:underline">Upload a file</span>
          <input
            onChange={handleFileUpload}
            id="file-upload"
            name="file-upload"
            type="file"
            accept=".jpg,.png,.gif"
            className="sr-only"
          />
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs leading-5 text-gray-400">
          PNG, JPG, GIF up to 10MB
        </p>
      </div>
    </label>
  );
}

export default FileUpload;
