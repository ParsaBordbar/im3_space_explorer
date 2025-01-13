import React from "react";
import toast from "react-hot-toast";

interface FileUploadProps {
  field: {
    value: FileList | null;
    onChange: (value: FileList | null) => void;
    onBlur: () => void;
  };
  label: string;
  error?: string;
}

const FileUpload = ({ field, label }: FileUploadProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files[0]) {
      const file = files[0];

      // Validate the file type explicitly
      if (file.type !== "image/svg+xml") {
        toast.error("Only SVG files are allowed.");
        return; // Reject the file
      }

      toast.success("File uploaded.");
      field.onChange(files);
    } else {
      field.onChange(null);
    }
  };

  return (
    <div className="flex flex-col md:col-span-1 col-span-full gap-1">
      <label className="text-white font-SpaceGrotesk"> {label} </label>
      <div className="relative bg-box-space rounded-lg py-3 px-2">
        <input
          type="file"
          accept=".svg"
          onChange={handleFileChange}
          onBlur={field.onBlur}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <div className="flex justify-center items-center text-gray-400">
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="font-Nunito">Upload SVG</span>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
