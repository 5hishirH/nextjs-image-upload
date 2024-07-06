"use client";

import { useImageContext } from "@/hooks/useImageContext";
import { Button } from "./ui/button";
import Image from "next/image";
import { ImageProvider } from "@/providers/image-provider";
import { Reorder } from "framer-motion";

export const ImageInputMain = () => {
  const { images, setImages, addImageRef, addImages } = useImageContext();

  const handleConsoleImage = () => console.log(images);

  return (
    <main className="p-8 w-full">
      <h2>Reorder images by dragging</h2>

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
          accept="image/*"
          className="hidden"
        />
      </section>

      <section className="mt-8">
        <h3>Double click and hold to drag image horizontally</h3>
      </section>

      <section className="mt-8 max-w-[40vw] w-fit">
        {images.length ? (
          <Reorder.Group
            axis="x"
            values={images}
            onReorder={setImages}
            className="p-4 border rounded-lg overflow-x-auto flex gap-4"
          >
            {images.map((e) => (
              <Reorder.Item key={e.url} value={e} className="inline-block">
                <div className="w-40 h-40 rounded-lg overflow-hidden">
                  <Image
                    src={e.url}
                    alt="img"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        ) : (
          <h2 className="text-destructive">No images yet!</h2>
        )}
      </section>

      <section className="mt-8">
        <Button type="button" onClick={handleConsoleImage}>
          Console log
        </Button>
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
