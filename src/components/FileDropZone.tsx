import React, { useRef, useState } from "react";

interface FileDropZoneProps {
  onFileSelect: (file: File) => void;
  children: React.ReactNode; // you can pass in any existing card content
  accept?: string;
}

export default function FileDropZone({
  onFileSelect,
  children,
  accept = ".svg",
}: FileDropZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

    const handleFiles = (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const file = files[0];

      if (
        file.type !== "image/svg+xml" && 
        !file.name.toLowerCase().endsWith(".svg")
      ) {
        alert("Only SVG files are allowed!");
        return;
      }

      onFileSelect(file);
    };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={`w-full h-full rounded-md flex flex-col justify-center 
            items-center gap-2 cursor-pointer transition-all duration-100
            ${isDragging && "border-green-500"}`}
      onClick={() => fileInputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      {children}
    </div>
  );
}