import { CtfRichText } from "@/components/contentful/CtfRichText.component";
import { PageBlogPostFieldsFragment } from "@/lib/__generated/sdk";

interface ArticleContentProps {
  article: PageBlogPostFieldsFragment;
}
export const ArticleContent = ({ article }: ArticleContentProps) => {
  const { content } = article;

  return <CtfRichText json={content?.json} links={content?.links} />;
};
