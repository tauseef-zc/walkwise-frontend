/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { FC, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { getImage } from "@/lib/assets";
import { TourImages } from "@/data/tours";

interface IFile extends File {
  preview?: string;
}

interface IImageUploadProps {
  onUpload: (files: IFile[]) => void;
  onChange?: (files: TourImages[]) => void;
  defaultImages?: TourImages[];
}

const ImageUploader: FC<IImageUploadProps> = ({
  onUpload,
  onChange,
  defaultImages = [],
}) => {
  const [files, setFiles] = useState<IFile[]>([]);
  const [images, setImages] = useState<TourImages[]>(defaultImages);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    multiple: true,
    maxFiles: 10 - images.length,
    onDrop: (acceptedFiles: IFile[]) => {
      const prevCount = files.length + images.length;
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

  const existingFiles =
    defaultImages &&
    defaultImages.length > 0 &&
    defaultImages.map((image) => (
      <div
        className="inline-flex w-36 h-36 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg relative"
        key={image.id}
      >
        <span
          onClick={() => {
            if (onChange) {
              setImages(images.filter((i) => i.id !== image.id));
            }
          }}
          className="absolute right-2 top-2 bg-red-500 hover:bg-red-600 text-white w-4 h-4 flex justify-center items-center rounded-full cursor-pointer"
        >
          <XMarkIcon className="w-3 h-3" />
        </span>
        <img
          src={getImage("/" + image.image)}
          className="block w-full h-full object-cover"
        />
      </div>
    ));

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
          onLoad={() => {
            URL.revokeObjectURL(file.preview ?? "");
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    onUpload(files);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      files.forEach((file: IFile) => URL.revokeObjectURL(file.preview ?? ""));
  }, []);
  return (
    <section className="mb-5">
      {images.length + files.length <= 9 && (
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
        {existingFiles}
        {thumbs}
      </aside>
    </section>
  );
};

export default ImageUploader;
