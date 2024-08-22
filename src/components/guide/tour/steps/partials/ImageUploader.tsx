import { FC, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

interface IFile extends File {
  preview?: string;
}

interface IImageUploadProps {
  onUpload: (files: IFile[]) => void;
}

const ImageUploader: FC<IImageUploadProps> = ({ onUpload }) => {
  const [files, setFiles] = useState<IFile[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    multiple: true,
    maxFiles: 10,
    onDrop: (acceptedFiles: IFile[]) => {

      const prevCount = files.length;
      if (prevCount + acceptedFiles.length > 10) {
        toast.error("You can only upload 10 images");
        return;
      }
      
      let newFiles = acceptedFiles.map((file: IFile) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles((state) => [...state, ...newFiles]);
    },
  });

  const thumbs = files.map((file: IFile, index) => (
    <div
      className="inline-flex w-36 h-36 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg relative"
      key={index}
    >
      <span
        className="absolute right-2 top-2 bg-red-500 hover:bg-red-600 text-white w-4 h-4 flex justify-center items-center rounded-full cursor-pointer"
        onClick={() => {
          let newFiles = files
            .filter((newFile) => newFile.preview !== file.preview)
            .map((file: IFile) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            );
          setFiles(newFiles);
        }}
      >
        <XMarkIcon className="w-3 h-3" />
      </span>
      <div className="flex w-full overflow-hidden">
        <img
          src={file.preview}
          className="block w-full h-full object-cover"
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview ?? "");
          }}
        />
      </div>
    </div>
  ));

   useEffect(() => {
    onUpload(files);
   }, [files]);

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      files.forEach((file: IFile) => URL.revokeObjectURL(file.preview ?? ""));
  }, []);
  return (
    <section className="mb-5">
      {files.length <= 9 && (
        <div
          {...getRootProps({ className: "dropzone" })}
          className="border-2 border-dashed border-neutral-200 dark:border-neutral-700 h-64 flex items-center justify-center cursor-pointer"
        >
          <input {...getInputProps()} />
          <p>
            <b>Drag & drop</b> some files here, or <b>click</b> to select files
          </p>
        </div>
      )}
      <aside className="flex flex-wrap flex-row justify-start gap-3 mt-5">
        {thumbs}
      </aside>
    </section>
  );
};

export default ImageUploader;
