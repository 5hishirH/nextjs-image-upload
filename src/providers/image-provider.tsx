"use client";

import {
  createContext,
  useState,
  ReactNode,
  ChangeEvent,
  useRef,
  RefObject,
} from "react";

// Define the shape of the context data
interface ImageContextType {
  images: { url: string; file: File }[];
  setImages: React.Dispatch<
    React.SetStateAction<{ url: string; file: File }[]>
  >;
  addImageRef: RefObject<HTMLInputElement>;
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
  const addImageRef = useRef<HTMLInputElement>(null);

  const addImages = (e: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;
    if (!files) return;

    const newImages = Array.from(files).map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));

    setImages((prevImgs) => [...prevImgs, ...newImages]);

    if (addImageRef.current) addImageRef.current.value = "";
  };

  const providerValue = {
    images,
    setImages,
    addImageRef,
    addImages,
  };

  return (
    <ImageContext.Provider value={providerValue}>
      {children}
    </ImageContext.Provider>
  );
};
