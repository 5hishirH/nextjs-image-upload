"use client";

import { createContext, useState, ReactNode, ChangeEvent } from "react";

// Define the shape of the context data
interface ImageContextType {
  images: { url: string; file: File }[];
  addImages: (e: ChangeEvent<HTMLInputElement>) => void;
}

// Create the context with a default value
export const ImageContext = createContext<ImageContextType | undefined>(
  undefined
);

interface ImageProviderProps {
  children: ReactNode;
}

export const ImageProvider = ({ children }: ImageProviderProps) => {
  const [images, setImages] = useState<{ url: string; file: File }[]>([]);

  const addImages = (e: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;
    if (!files) return;

    const newImages = Array.from(files).map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));

    setImages((prevImgs) => [...prevImgs, ...newImages]);
  };

  const providerValue = {
    images,
    addImages,
  };

  return (
    <ImageContext.Provider value={providerValue}>
      {children}
    </ImageContext.Provider>
  );
};
