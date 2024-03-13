import { CtfImage } from "@/components/contentful/CtfImage.component";
import { PageBlogPostFieldsFragment } from "@/lib/__generated/sdk";

interface ArticleAuthorProps {
  article: PageBlogPostFieldsFragment;
}

export const ArticleAuthor = ({ article }: ArticleAuthorProps) => {
  const { author } = article;

  return (
    <div className="flex items-center">
      <div className="mr-2 overflow-hidden border rounded-full border-blue500">
        {author?.avatar && (
          <CtfImage
            nextImageProps={{
              width: 28,
              height: 28,
              sizes: undefined,
              placeholder: undefined,
            }}
            {...author.avatar}
          />
        )}
      </div>
      <span className="text-xs leading-none text-gray600">{author?.name}</span>
    </div>
  );
};
