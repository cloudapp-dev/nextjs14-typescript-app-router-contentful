"use client";
import Link from "next/link";
import { HTMLProps } from "react";
import { twMerge } from "tailwind-merge";

import { ArticleAuthor } from "@/components/contentful/ArticleAuthor";
import { CtfImage } from "@/components/contentful/CtfImage.component";
import { FormatDate } from "@/components/contentful/format-date/FormatDate";
import { PageBlogPostFieldsFragment } from "@/lib/__generated/sdk";

interface ArticleTileProps extends HTMLProps<HTMLDivElement> {
  article: PageBlogPostFieldsFragment;
}

export const ArticleTile = ({ article, className }: ArticleTileProps) => {
  const { title, publishedDate } = article;

  return (
    <Link className="flex flex-col" href={`${article.slug}`}>
      <div
        className={twMerge(
          "flex flex-1 flex-col overflow-hidden shadow-lg",
          className
        )}
      >
        {article.featuredImage && (
          <CtfImage
            nextImageProps={{ className: "object-cover aspect-[16/10] w-full" }}
            {...article.featuredImage}
          />
        )}
        <div className="flex flex-col flex-1 px-4 py-3 bg-gray100 dark:bg-gray800 md:px-5 md:py-4 lg:px-7 lg:py-5">
          {title && (
            <p className="mb-2 h3 text-gray800 dark:text-[#AEC1CC] md:mb-3">
              {title}
            </p>
          )}

          <div className="flex items-center mt-auto">
            <ArticleAuthor article={article} />
            <div className={twMerge("ml-auto pl-2 text-xs text-gray600")}>
              <FormatDate date={publishedDate} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
