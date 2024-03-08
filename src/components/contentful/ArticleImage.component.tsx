"use client";
import { twMerge } from "tailwind-merge";

import { CtfImage } from "@/components/contentful/CtfImage.component";
import { ComponentRichImage } from "@/lib/__generated/sdk";

interface ArticleImageProps {
  image: ComponentRichImage;
}

export const ArticleImage = ({ image }: ArticleImageProps) => {
  return image.image ? (
    <figure>
      <div className="flex justify-center">
        <CtfImage
          nextImageProps={{
            className: twMerge(
              "mt-0 mb-0 ",
              image.fullWidth
                ? "md:w-screen md:max-w-[calc(100vw-40px)] md:shrink-0"
                : "shadow-lg dark:shadow-white dark:shadow-sm-light"
            ),
          }}
          {...image.image}
        />
      </div>
      {image.caption && (
        <figcaption className="mt-4">{image.caption}</figcaption>
      )}
    </figure>
  ) : null;
};
