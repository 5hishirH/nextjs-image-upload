"use client";

import { useImageContext } from "@/hooks/useImageContext";
import { useRef } from "react";
import { Button } from "./ui/button";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";
import { ImageProvider } from "@/providers/image-provider";

export const ImageInputMain = () => {
  const { images, addImages } = useImageContext();
  const addImageRef = useRef<HTMLInputElement | null>(null);
  return (
    <main className="m-8">
      <h2>Image input</h2>

      <section className="mt-8">
        <Button
          type="button"
          onClick={() => {
            if (addImageRef.current) addImageRef.current.click();
          }}
        >
          Add images
        </Button>
        <input
          ref={addImageRef}
          type="file"
          onChange={addImages}
          multiple
          className="hidden"
        />
      </section>

      <section className="w-1/4 mt-8">
        {images.length ? (
          <div className="grid grid-cols-4 gap-2">
            {images.map(({ url }, i) => (
              <AspectRatio
                key={i}
                ratio={1 / 1}
                className="rounded-lg overflow-hidden"
              >
                <Image
                  src={url}
                  alt="img"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
            ))}
          </div>
        ) : (
          <h2>No images yet!</h2>
        )}
      </section>
    </main>
  );
};

const ImageInput = () => {
  return (
    <ImageProvider>
      <ImageInputMain />
    </ImageProvider>
  );
};

export default ImageInput;
