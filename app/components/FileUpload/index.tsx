import { useState } from "react";

export default function FileUpload(props: { register?: any }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "image/svg+xml") {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      alert("Please upload a valid SVG file.");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "image/svg+xml") {
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
    } else {
      alert("Please upload a valid SVG file.");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="w-full flex flex-col gap-1   "
      >
        <label htmlFor="" className="font-SpaceGrotesk text-white">
          Logo file
        </label>
        <section className="w-full bg-box-space flex rounded-lg px-2 py-3 items-center justify-between">
          <p className="font-Nunito text-white text-sm opacity-50">
            Drag and drop your SVG file here
          </p>
          <input
            {...props}
            type="file"
            accept=".svg"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="inline-block px-2 cursor-pointer  rounded-lg text-white bg-glass font-Nunito transition"
          >
            Choose File
          </label>
        </section>
      </div>
    </>
  );
}
