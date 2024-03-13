import { twMerge } from "tailwind-merge";

import { ArticleAuthor } from "@/components/contentful/ArticleAuthor";
import { CtfImage } from "@/components/contentful/CtfImage.component";
import { FormatDate } from "@/components/contentful/format-date/FormatDate";
import { PageBlogPostFieldsFragment } from "@/lib/__generated/sdk";

interface ArticleHeroProps {
  article: PageBlogPostFieldsFragment;
  isReversedLayout?: boolean;
  isHomePage?: boolean;
}
export const ArticleHero = ({
  article,
  isReversedLayout = false,
  isHomePage = false,
}: ArticleHeroProps) => {
  const { title, shortDescription, publishedDate } = article;

  return (
    <div
      className={twMerge(
        `flex flex-col mt-5 overflow-hidden shadow-lg dark:shadow-white dark:shadow-sm-light `,
        isReversedLayout ? "lg:flex-row-reverse" : "lg:flex-row"
      )}
    >
      <div className="flex-1 basis-1/2">
        {article.featuredImage && (
          <CtfImage
            nextImageProps={{
              className: "w-full",
              priority: true,
              sizes: undefined,
            }}
            {...article.featuredImage}
          />
        )}
      </div>

      <div className="relative flex flex-col justify-center flex-1 px-4 py-6 basis-1/2 lg:px-16 lg:py-12 xl:px-24">
        <div className="flex flex-wrap items-center mb-2">
          <ArticleAuthor article={article} />

          <div
            className={twMerge(
              "ml-auto hidden pl-2 text-md text-gray600",
              isReversedLayout ? "lg:block" : ""
            )}
          >
            <FormatDate date={publishedDate} />
          </div>
        </div>
        {isHomePage && <h2>{title}</h2>}
        {!isHomePage && <h1>{title}</h1>}
        {isHomePage && shortDescription && (
          <p className="mt-2">{shortDescription}</p>
        )}
        <div
          className={twMerge(
            "mt-2 text-md text-gray600",
            isReversedLayout ? "lg:hidden" : ""
          )}
        >
          <FormatDate date={publishedDate} />
        </div>
      </div>
    </div>
  );
};
