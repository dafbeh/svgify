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
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
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
      className={`w-full h-full rounded-md border-2 border-dashed flex flex-col justify-center items-center gap-2 cursor-pointer
        transition-all duration-100
        ${isDragging ? "border-green-500 bg-green-50" : "border-gray-300"}`}
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